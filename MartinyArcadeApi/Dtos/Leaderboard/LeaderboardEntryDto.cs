namespace MartinyArcadeApi.Dtos.Leaderboard;


public class LeaderboardEntryDto
{
    public string Username { get; set; } = string.Empty;
    public long TotalXP { get; set; }
    public long Level { get; set; }
}