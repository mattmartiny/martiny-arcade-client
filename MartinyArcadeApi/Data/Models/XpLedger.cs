namespace MartinyArcadeApi.Models;

public class XpLedger
{
    public long Id { get; set; }
    public Guid UserId { get; set; }
    public string GameId { get; set; } = string.Empty;
    public long Amount { get; set; }
    public string? Reason { get; set; }
    public DateTime OccurredAt { get; set; }

    public User User { get; set; } = null!;
}