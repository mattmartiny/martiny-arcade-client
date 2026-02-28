namespace MartinyArcadeApi.Dtos.Leaderboard;


public class LeaderboardEntryDto
{
    public string Username { get; set; } = string.Empty;
    public int TotalXP { get; set; }
    public int Level { get; set; }
}