namespace MartinyArcadeApi.Dtos.Xp;

public class FlushXpBatchDto
{
    public List<XpEventDto> Events { get; set; } = new();
}

public class XpEventDto
{
    public Guid ClientEventId { get; set; }
    public int Amount { get; set; }
    public string? Reason { get; set; }
    public string Source { get; set; } = string.Empty;
}