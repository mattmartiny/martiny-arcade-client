using System.ComponentModel.DataAnnotations;

namespace MartinyArcadeApi.Dtos.Forum;

public class CreateForumReplyDto
{
    [Required]
    [MaxLength(8000)]
    public string Body { get; set; } = string.Empty;
}
