namespace MartinyArcadeApi.Dtos.Profile;

public class ProfileDto
{
    public string Username { get; set; } = string.Empty;
    public long TotalXP { get; set; }
    public long Level { get; set; }
    public int Rank { get; set; }

    public string? MostPlayedGame { get; set; }

    public List<ProfileXpEventDto> RecentEvents { get; set; } = new();
}

public class ProfileXpEventDto
{
    public int Amount { get; set; }
    public string Reason { get; set; } = string.Empty;
    public string Source { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
}
