using System.ComponentModel.DataAnnotations;

namespace MartinyArcadeApi.Models;

public class ForumCategory
{
    [Key]
    public Guid ForumCategoryId { get; set; }

    [Required]
    [MaxLength(80)]
    public string Name { get; set; } = string.Empty;

    [Required]
    [MaxLength(100)]
    public string Slug { get; set; } = string.Empty;

    [Required]
    [MaxLength(240)]
    public string Description { get; set; } = string.Empty;

    public int SortOrder { get; set; }

    public ICollection<ForumThread> Threads { get; set; } = new List<ForumThread>();
}
