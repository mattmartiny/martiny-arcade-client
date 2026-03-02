using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using MartinyArcadeApi.Data;
using MartinyArcadeApi.Services;
using Microsoft.EntityFrameworkCore;

namespace MartinyArcadeApi.Controllers;

[ApiController]
[Route("api/profile")]
[Authorize]
public class ProfileController : ControllerBase
{
    private readonly ArcadeDbContext _db;
    private readonly XpService _xpService;

    public ProfileController(ArcadeDbContext db, XpService xpService)
    {
        _db = db;
        _xpService = xpService;
    }

    [HttpGet]
    public async Task<IActionResult> GetProfile()
    {
        var userIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userIdStr == null)
            return Unauthorized();

        var userId = Guid.Parse(userIdStr);

        var user = await _db.Users.FindAsync(userId);
        var profile = await _db.UserProfiles.FindAsync(userId);

        if (user == null || profile == null)
            return NotFound();

        var progress = _xpService.GetProgress(profile.TotalXP);
        var levelMultiplier = _xpService.GetLevelXpMultiplier(progress.level);


        // 🔹 Global Rank
        var rank = await _db.UserProfiles
            .CountAsync(p => p.TotalXP > profile.TotalXP) + 1;

        // 🔹 Most Played Game (by Source)
        var mostPlayedGame = await _db.XpEvents
            .Where(e => e.UserId == userId)
            .GroupBy(e => e.Source)
            .OrderByDescending(g => g.Count())
            .Select(g => g.Key)
            .FirstOrDefaultAsync();

        // 🔹 Recent XP Activity
        var recentEvents = await _db.XpEvents
            .Where(e => e.UserId == userId)
            .OrderByDescending(e => e.CreatedAt)
            .Take(10)
            .Select(e => new
            {
                e.Amount,
                e.Reason,
                e.Source,
                e.CreatedAt
            })
            .ToListAsync();

        return Ok(new
        {
            username = user.Username,
            totalXP = profile.TotalXP,
            level = progress.level,
            xpIntoLevel = progress.xpIntoLevel,
            xpForNextLevel = progress.xpForNextLevel,
            multiplier = levelMultiplier,
            rank,
            mostPlayedGame,
            recentEvents
        });
    }

   [AllowAnonymous]
[HttpGet("{username}")]
public async Task<IActionResult> GetPublicProfile(string username)
{
    var user = await _db.Users
        .FirstOrDefaultAsync(u => u.Username == username);

    if (user == null)
        return NotFound();

    var profile = await _db.UserProfiles
        .FirstOrDefaultAsync(p => p.UserId == user.UserId);

    if (profile == null)
        return NotFound();

    var progress = _xpService.GetProgress(profile.TotalXP);
    var levelMultiplier = _xpService.GetLevelXpMultiplier(progress.level);

 var rank = await _db.UserRankings
    .Where(r => r.UserId == profile.UserId)
    .Select(r => r.Rank)
    .FirstOrDefaultAsync();

    var mostPlayedGame = await _db.XpEvents
        .Where(e => e.UserId == user.UserId)
        .GroupBy(e => e.Source)
        .OrderByDescending(g => g.Count())
        .Select(g => g.Key)
        .FirstOrDefaultAsync();

    var recentEvents = await _db.XpEvents
        .Where(e => e.UserId == user.UserId)
        .OrderByDescending(e => e.CreatedAt)
        .Take(10)
        .Select(e => new
        {
            e.Amount,
            e.Reason,
            e.Source,
            e.CreatedAt
        })
        .ToListAsync();

    return Ok(new
    {
        username = user.Username,
        totalXP = profile.TotalXP,
        level = progress.level,
        xpIntoLevel = progress.xpIntoLevel,
        xpForNextLevel = progress.xpForNextLevel,
        multiplier = levelMultiplier,
        rank,
        mostPlayedGame,
        recentEvents
    });
}



}