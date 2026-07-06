namespace MartinyArcadeApi.Dtos.Forum;

public class ForumCategoryDto
{
    public string Name { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public int ThreadCount { get; set; }
    public DateTime? LastActivityAt { get; set; }
}
