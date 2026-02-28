namespace MartinyArcadeApi.Models;

public class GameSession
{
    public Guid GameSessionId { get; set; }
    public Guid UserId { get; set; }

    public string GameKey { get; set; } = string.Empty;

    public int Score { get; set; }
    public int XpEarned { get; set; }

    public DateTime PlayedAt { get; set; } = DateTime.UtcNow;

    public User User { get; set; } = null!;
}