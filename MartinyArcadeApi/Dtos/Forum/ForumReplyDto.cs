namespace MartinyArcadeApi.Dtos.Forum;

public class ForumReplyDto
{
    public Guid ForumReplyId { get; set; }
    public string Body { get; set; } = string.Empty;
    public string AuthorUsername { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
}
