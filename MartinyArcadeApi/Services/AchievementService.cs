using MartinyArcadeApi.Data;
using MartinyArcadeApi.Models;
using Microsoft.EntityFrameworkCore;

namespace MartinyArcadeApi.Services;

public class AchievementService
{
    private readonly ArcadeDbContext _db;

    public AchievementService(ArcadeDbContext db)
    {
        _db = db;
    }

    public async Task<List<Achievement>> CheckAchievements(Guid userId, string? gameKey = null)
    {
        var unlocked = new List<Achievement>();

        var profile = await _db.UserProfiles.FindAsync(userId);
        if (profile == null) return unlocked;

        var totalWins = await _db.GameSessions
            .Where(g => g.UserId == userId && g.XpEarned > 0)
            .CountAsync();

        var achievements = await _db.Achievements
            .Where(a => a.GameKey == null || a.GameKey == gameKey)
            .ToListAsync();

        foreach (var achievement in achievements)
        {
            bool alreadyUnlocked = await _db.UserAchievements
                .AnyAsync(u => u.UserId == userId && u.AchievementId == achievement.AchievementId);

            if (alreadyUnlocked) continue;

            bool qualifies = achievement.RequirementType switch
            {
                "total_wins" => totalWins >= achievement.RequirementValue,
                "total_xp" => profile.TotalXP >= achievement.RequirementValue,
                "best_score" => await _db.GameSessions
                    .Where(g => g.UserId == userId && g.GameKey == achievement.GameKey)
                    .MaxAsync(g => (int?)g.Score) >= achievement.RequirementValue,
                _ => false
            };

            if (!qualifies) continue;

            _db.UserAchievements.Add(new UserAchievement
            {
                UserId = userId,
                AchievementId = achievement.AchievementId,
                UnlockedAt = DateTime.UtcNow
            });

            profile.TotalXP += achievement.XpReward;

            unlocked.Add(achievement);
        }

        await _db.SaveChangesAsync();
        return unlocked;
    }
}