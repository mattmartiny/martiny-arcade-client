namespace MartinyArcadeApi.Models;

public class Achievement
{
    public int AchievementId { get; set; }
    public string AchievementKey { get; set; } = null!;
    public string Title { get; set; } = null!;
    public string Description { get; set; } = null!;
    public string? Icon { get; set; }
    public long XpReward { get; set; }
    public string? GameKey { get; set; }
    public string RequirementType { get; set; } = null!;
    public int RequirementValue { get; set; }

    public ICollection<UserAchievement> UserAchievements { get; set; } = new List<UserAchievement>();
}