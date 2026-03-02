public class GameLeaderboardEntry
{
    public string GameKey { get; set; } = null!;
    public Guid UserId { get; set; }

    public long TotalXP { get; set; }
    public long TotalPlays { get; set; }
    public int BestScore { get; set; }
    public long Rank { get; set; }
}