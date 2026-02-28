using System.ComponentModel.DataAnnotations;
namespace MartinyArcadeApi.Models;

public class User
{
    public Guid UserId { get; set; }
    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;

    [Required]
    public string PasswordHash { get; set; } = string.Empty;

    [Required]
    [MaxLength(20)]
    public string Username { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public ICollection<XpEvent> XpEvents { get; set; } = new List<XpEvent>();
    public UserProfile? Profile { get; set; }
}