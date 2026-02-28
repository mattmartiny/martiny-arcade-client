namespace MartinyArcadeApi.Dtos.Xp;

public class FlushXpDto
{
    public int XpEarned { get; set; }
     public string? Reason { get; set; } // optional
    public string? Source { get; set; } // optional
}