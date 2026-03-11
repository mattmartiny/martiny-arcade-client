namespace MartinyArcadeApi.Models;
using System.ComponentModel.DataAnnotations;

public class UserProfile
{
    [Key]
    public Guid UserId { get; set; }
    public long TotalXP { get; set; }
    public DateTime LastUpdated { get; set; }

    public User User {get; set; } = null!;
}