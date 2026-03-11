namespace MartinyArcadeApi.Models;

public class UserAchievement
{
    public int UserAchievementId { get; set; }

    public Guid UserId { get; set; }
    public int AchievementId { get; set; }

    public DateTime UnlockedAt { get; set; }

    public Achievement Achievement { get; set; } = null!;
}