namespace MartinyArcadeApi.Dtos.Forum;

public class ForumThreadListItemDto
{
    public Guid ForumThreadId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string BodyPreview { get; set; } = string.Empty;
    public string AuthorUsername { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
    public DateTime LastActivityAt { get; set; }
    public int ReplyCount { get; set; }
}
