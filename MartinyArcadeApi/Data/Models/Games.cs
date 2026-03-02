


using System.ComponentModel.DataAnnotations;

public class Game
{
    [Key]
    public string GameKey { get; set; } = null!;
    public string Title { get; set; } = null!;
    public string ScoreDirection { get; set; } = "desc"; 
    // "asc" = lower better
    // "desc" = higher better
}