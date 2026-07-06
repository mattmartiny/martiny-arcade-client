using MartinyArcadeApi.Data;
using MartinyArcadeApi.Dtos.Forum;
using MartinyArcadeApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

[ApiController]
[Route("forum")]
public class ForumController : ControllerBase
{
    private const int DefaultPageSize = 12;
    private readonly ArcadeDbContext _db;

    public ForumController(ArcadeDbContext db)
    {
        _db = db;
    }

    [AllowAnonymous]
    [HttpGet("categories")]
    public async Task<IActionResult> GetCategories()
    {
        var categories = await _db.ForumCategories
            .OrderBy(c => c.SortOrder)
            .Select(c => new ForumCategoryDto
            {
                Name = c.Name,
                Slug = c.Slug,
                Description = c.Description,
                ThreadCount = c.Threads.Count,
                LastActivityAt = c.Threads.Max(t => (DateTime?)t.LastActivityAt)
            })
            .ToListAsync();

        return Ok(categories);
    }

    [AllowAnonymous]
    [HttpGet("categories/{slug}")]
    public async Task<IActionResult> GetCategory(string slug)
    {
        var category = await _db.ForumCategories
            .Where(c => c.Slug == slug)
            .Select(c => new ForumCategoryDto
            {
                Name = c.Name,
                Slug = c.Slug,
                Description = c.Description,
                ThreadCount = c.Threads.Count,
                LastActivityAt = c.Threads.Max(t => (DateTime?)t.LastActivityAt)
            })
            .FirstOrDefaultAsync();

        return category == null ? NotFound() : Ok(category);
    }

    [AllowAnonymous]
    [HttpGet("categories/{slug}/threads")]
    public async Task<IActionResult> GetThreads(string slug, [FromQuery] int page = 1, [FromQuery] int pageSize = DefaultPageSize)
    {
        page = Math.Max(page, 1);
        pageSize = Math.Clamp(pageSize, 1, 50);

        var category = await _db.ForumCategories
            .FirstOrDefaultAsync(c => c.Slug == slug);

        if (category == null)
            return NotFound();

        var query = _db.ForumThreads
            .Where(t => t.ForumCategoryId == category.ForumCategoryId);

        var totalCount = await query.CountAsync();

        var threads = await query
            .OrderByDescending(t => t.LastActivityAt)
            .ThenByDescending(t => t.CreatedAt)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(t => new ForumThreadListItemDto
            {
                ForumThreadId = t.ForumThreadId,
                Title = t.Title,
                BodyPreview = t.Body.Length > 220 ? t.Body.Substring(0, 220) + "..." : t.Body,
                AuthorUsername = t.Author.Username,
                CreatedAt = t.CreatedAt,
                LastActivityAt = t.LastActivityAt,
                ReplyCount = t.ReplyCount
            })
            .ToListAsync();

        return Ok(new
        {
            category = new ForumCategoryDto
            {
                Name = category.Name,
                Slug = category.Slug,
                Description = category.Description,
                ThreadCount = totalCount,
                LastActivityAt = await _db.ForumThreads
                    .Where(t => t.ForumCategoryId == category.ForumCategoryId)
                    .MaxAsync(t => (DateTime?)t.LastActivityAt)
            },
            page,
            pageSize,
            totalCount,
            totalPages = (int)Math.Ceiling(totalCount / (double)pageSize),
            threads
        });
    }

    [AllowAnonymous]
    [HttpGet("threads/{threadId:guid}")]
    public async Task<IActionResult> GetThread(Guid threadId)
    {
        var thread = await _db.ForumThreads
            .Include(t => t.Category)
            .Include(t => t.Author)
            .FirstOrDefaultAsync(t => t.ForumThreadId == threadId);

        if (thread == null)
            return NotFound();

        var replies = await _db.ForumReplies
            .Where(r => r.ForumThreadId == threadId)
            .Include(r => r.Author)
            .OrderBy(r => r.CreatedAt)
            .Select(r => new ForumReplyDto
            {
                ForumReplyId = r.ForumReplyId,
                Body = r.Body,
                AuthorUsername = r.Author.Username,
                CreatedAt = r.CreatedAt
            })
            .ToListAsync();

        return Ok(new ForumThreadDetailDto
        {
            ForumThreadId = thread.ForumThreadId,
            CategoryName = thread.Category.Name,
            CategorySlug = thread.Category.Slug,
            Title = thread.Title,
            Body = thread.Body,
            AuthorUsername = thread.Author.Username,
            CreatedAt = thread.CreatedAt,
            LastActivityAt = thread.LastActivityAt,
            ReplyCount = thread.ReplyCount,
            Replies = replies
        });
    }

    [Authorize]
    [HttpPost("categories/{slug}/threads")]
    public async Task<IActionResult> CreateThread(string slug, CreateForumThreadDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var userId = GetUserId();
        if (userId == null)
            return Unauthorized();

        var category = await _db.ForumCategories.FirstOrDefaultAsync(c => c.Slug == slug);
        if (category == null)
            return NotFound();

        var thread = new ForumThread
        {
            ForumThreadId = Guid.NewGuid(),
            ForumCategoryId = category.ForumCategoryId,
            AuthorId = userId.Value,
            Title = dto.Title.Trim(),
            Body = dto.Body.Trim(),
            CreatedAt = DateTime.UtcNow,
            LastActivityAt = DateTime.UtcNow,
            ReplyCount = 0
        };

        _db.ForumThreads.Add(thread);
        await _db.SaveChangesAsync();

        return Ok(new { threadId = thread.ForumThreadId });
    }

    [Authorize]
    [HttpPost("threads/{threadId:guid}/replies")]
    public async Task<IActionResult> ReplyToThread(Guid threadId, CreateForumReplyDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var userId = GetUserId();
        if (userId == null)
            return Unauthorized();

        var thread = await _db.ForumThreads.FirstOrDefaultAsync(t => t.ForumThreadId == threadId);
        if (thread == null)
            return NotFound();

        var reply = new ForumReply
        {
            ForumReplyId = Guid.NewGuid(),
            ForumThreadId = threadId,
            AuthorId = userId.Value,
            Body = dto.Body.Trim(),
            CreatedAt = DateTime.UtcNow
        };

        thread.ReplyCount += 1;
        thread.LastActivityAt = DateTime.UtcNow;

        _db.ForumReplies.Add(reply);
        await _db.SaveChangesAsync();

        return Ok(new { replyId = reply.ForumReplyId });
    }

    private Guid? GetUserId()
    {
        var userIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier);
        return Guid.TryParse(userIdStr, out var userId) ? userId : null;
    }
}
