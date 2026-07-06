using System.ComponentModel.DataAnnotations;

namespace MartinyArcadeApi.Models;

public class ForumThread
{
    [Key]
    public Guid ForumThreadId { get; set; }

    public Guid ForumCategoryId { get; set; }
    public Guid AuthorId { get; set; }

    [Required]
    [MaxLength(140)]
    public string Title { get; set; } = string.Empty;

    [Required]
    [MaxLength(8000)]
    public string Body { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime LastActivityAt { get; set; } = DateTime.UtcNow;
    public int ReplyCount { get; set; }

    public ForumCategory Category { get; set; } = null!;
    public User Author { get; set; } = null!;
    public ICollection<ForumReply> Replies { get; set; } = new List<ForumReply>();
}
