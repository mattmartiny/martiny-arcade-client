namespace MartinyArcadeApi.Dtos;

public class RecordGameSessionDto
{
    public string GameKey { get; set; } = string.Empty;
    public int Score { get; set; }
    public long XpEarned { get; set; }
}