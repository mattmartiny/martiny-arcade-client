namespace MartinyArcadeApi.Models;

public class UserGameStats
{
    public Guid UserId { get; set; }
    public string GameId { get; set; } = string.Empty;

    public int TotalXP { get; set; }
    public int TotalPlays { get; set; }
    public DateTime LastPlayed { get; set; }

    public User User { get; set; } = null!;
}