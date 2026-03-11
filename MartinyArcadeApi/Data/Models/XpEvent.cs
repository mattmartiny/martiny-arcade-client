using System.ComponentModel.DataAnnotations;

namespace MartinyArcadeApi.Models;

public class XpEvent
{
    [Key]
    public long XpEventId { get; set; }

    public Guid UserId { get; set; }

    public Guid ClientEventId { get; set; } // idempotency key

    public long Amount { get; set; }

    public string Reason { get; set; } = "action";

    public string Source { get; set; } = "client";

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public User User { get; set; } = null!;
}