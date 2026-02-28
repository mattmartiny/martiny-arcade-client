using System.ComponentModel.DataAnnotations;

namespace MartinyArcadeApi.Dtos.Auth;

public class RegisterDto
{
    [Required]
    [EmailAddress]
    public string Email { get; set; } = null!;

    [Required]
    [MinLength(6)]
    public string Password { get; set; } = null!;


    [Required]
    [MinLength(3)]
    [MaxLength(20)]
    public string Username { get; set; } = string.Empty;
}