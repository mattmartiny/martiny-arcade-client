namespace MartinyArcadeApi.Dtos.Forum;

public class ForumThreadDetailDto
{
    public Guid ForumThreadId { get; set; }
    public string CategoryName { get; set; } = string.Empty;
    public string CategorySlug { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Body { get; set; } = string.Empty;
    public string AuthorUsername { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
    public DateTime LastActivityAt { get; set; }
    public int ReplyCount { get; set; }
    public List<ForumReplyDto> Replies { get; set; } = new();
}
