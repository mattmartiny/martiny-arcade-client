using System.ComponentModel.DataAnnotations;

namespace MartinyArcadeApi.Dtos.Forum;

public class CreateForumThreadDto
{
    [Required]
    [MaxLength(140)]
    public string Title { get; set; } = string.Empty;

    [Required]
    [MaxLength(8000)]
    public string Body { get; set; } = string.Empty;
}
