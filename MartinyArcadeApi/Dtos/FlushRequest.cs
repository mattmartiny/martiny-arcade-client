namespace MartinyArcadeApi.Dtos;

public class FlushRequest
{
    // Optional: client-calculated totals (server will recompute anyway)
    public int Total { get; set; }

    // Per-game totals (server can recompute, but useful for sanity checks)
    public Dictionary<string, int> PerGame { get; set; } = new();

    // Raw events from the session buffer (source of truth)
    public List<XpEventDto> Events { get; set; } = new();
}

public class XpEventDto
{
    public string GameId { get; set; } = string.Empty;
    public int Amount { get; set; }          // already rounded int on client
    public string? Reason { get; set; }
    public long Timestamp { get; set; }      // ms since epoch
}