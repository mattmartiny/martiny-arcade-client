using System.ComponentModel.DataAnnotations;

namespace MartinyArcadeApi.Models;

public class ForumReply
{
    [Key]
    public Guid ForumReplyId { get; set; }

    public Guid ForumThreadId { get; set; }
    public Guid AuthorId { get; set; }

    [Required]
    [MaxLength(8000)]
    public string Body { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public ForumThread Thread { get; set; } = null!;
    public User Author { get; set; } = null!;
}
