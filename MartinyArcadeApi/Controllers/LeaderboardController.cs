using MartinyArcadeApi.Data;
using MartinyArcadeApi.Dtos.Leaderboard;
using MartinyArcadeApi.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/leaderboard")]
public class LeaderboardController : ControllerBase
{
    private readonly ArcadeDbContext _db;
    private readonly XpService _xpService;

    public LeaderboardController(ArcadeDbContext db, XpService xpService)
    {
        _db = db;
        _xpService = xpService;
    }

    [HttpGet]
    public async Task<IActionResult> Get([FromQuery] int take = 25)
    {
        take = Math.Clamp(take, 1, 100);

        var users = await _db.Users
            .Join(_db.UserProfiles,
                  u => u.UserId,
                  p => p.UserId,
                  (u, p) => new { u.Username, p.TotalXP })
            .OrderByDescending(x => x.TotalXP)
            .Take(take)
            .ToListAsync();

        var result = users.Select(u =>
        {
            var progress = _xpService.GetProgress(u.TotalXP);

            return new LeaderboardEntryDto
            {
                Username = u.Username,
                TotalXP = u.TotalXP,
                Level = progress.level
            };
        });

        return Ok(result);
    }


    [HttpGet("game/{gameKey}")]
public async Task<IActionResult> GetGameXpLeaderboard(
    string gameKey,
    [FromQuery] int take = 50)
{
    take = Math.Clamp(take, 1, 100);

    var leaderboard = await _db.XpEvents
        .Where(e => e.Source == gameKey)
        .GroupBy(e => e.UserId)
        .Select(g => new
        {
            UserId = g.Key,
            TotalXp = g.Sum(x => x.Amount)
        })
        .OrderByDescending(x => x.TotalXp)
        .Take(take)
        .ToListAsync();

    // join usernames after query (safe translation)
    var userIds = leaderboard.Select(x => x.UserId).ToList();

    var users = await _db.Users
        .Where(u => userIds.Contains(u.UserId))
        .ToDictionaryAsync(u => u.UserId, u => u.Username);

    var result = leaderboard
        .Select((entry, index) => new
        {
            Rank = index + 1,
            Username = users.ContainsKey(entry.UserId)
                ? users[entry.UserId]
                : "Unknown",
            TotalXP = entry.TotalXp
        });

    return Ok(result);
}
}