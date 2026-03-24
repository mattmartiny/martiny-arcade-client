using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MartinyArcadeApi.Models;

public class HomelessHeroSave
{
    [Key]
    public Guid SaveId { get; set; }

    [Required]
    public Guid UserId { get; set; }

    [Required]
    public string GameKey { get; set; } = "homeless-hero";

    [Required]
    public string SaveData { get; set; } = string.Empty;

    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    // navigation
    [ForeignKey("UserId")]
    public User? User { get; set; }
}