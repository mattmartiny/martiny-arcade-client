using MartinyArcadeApi.Data;
using MartinyArcadeApi.Dtos.Xp;
using MartinyArcadeApi.Models;
using MartinyArcadeApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;


namespace MartinyArcadeApi.Controllers;

[ApiController]
[Route("api/xp")]
[Authorize]
public class XpController : ControllerBase
{
    private readonly ArcadeDbContext _db;
    private readonly XpService _xpService;

    public XpController(ArcadeDbContext db, XpService xpService)
    {
        _db = db;
        _xpService = xpService;
    }

    [HttpPost("flush")]
    public async Task<IActionResult> Flush(FlushXpBatchDto dto)
    {
        try
        {
            if (dto.Events == null || dto.Events.Count == 0)
                return BadRequest("No events provided");

            var userIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userIdStr == null)
                return Unauthorized();

            var userId = Guid.Parse(userIdStr);

            var profile = await _db.UserProfiles.FindAsync(userId);
            if (profile == null)
                return NotFound("Profile not found");

            await using var tx = await _db.Database.BeginTransactionAsync();

            int totalNewXp = 0;

          foreach (var ev in dto.Events)
{
    if (ev.Amount <= 0) continue;

    var newEvent = new XpEvent
    {
        UserId = userId,
        ClientEventId = ev.ClientEventId,
        Amount = ev.Amount,
        Reason = ev.Reason ?? "action",
        Source = ev.Source,
        CreatedAt = DateTime.UtcNow
    };

    _db.XpEvents.Add(newEvent);

    try
    {
        await _db.SaveChangesAsync();
        totalNewXp += ev.Amount;
    }
    catch (DbUpdateException ex)
    {
        if (ex.InnerException is SqlException sqlEx &&
            (sqlEx.Number == 2601 || sqlEx.Number == 2627))
        {
            // Duplicate key — ignore
            _db.Entry(newEvent).State = EntityState.Detached;
        }
        else
        {
            throw;
        }
    }
}

            if (totalNewXp > 0)
            {
                profile.TotalXP += totalNewXp;
                profile.LastUpdated = DateTime.UtcNow;
            }

            await _db.SaveChangesAsync();
            await tx.CommitAsync();

            var progress = _xpService.GetProgress(profile.TotalXP);

            return Ok(new
            {
                totalXP = profile.TotalXP,
                level = progress.level,
                xpIntoLevel = progress.xpIntoLevel,
                xpForNextLevel = progress.xpForNextLevel,
                xpAdded = totalNewXp
            });
        }
        catch (Exception ex)
        {
            Console.WriteLine("XP Flush Error:");
            Console.WriteLine(ex.Message);
            Console.WriteLine(ex.StackTrace);
            return StatusCode(500, ex.Message);
        }
    }

    [HttpGet("history")]
    public async Task<IActionResult> History([FromQuery] int take = 25)
    {
        take = Math.Clamp(take, 1, 200);

        var userIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userIdStr is null) return Unauthorized();
        var userId = Guid.Parse(userIdStr);

        var events = await _db.XpEvents
            .Where(e => e.UserId == userId)
            .OrderByDescending(e => e.CreatedAt)
            .Take(take)
            .Select(e => new { e.XpEventId, e.Amount, e.Reason, e.Source, e.CreatedAt })
            .ToListAsync();

        return Ok(events);
    }

}