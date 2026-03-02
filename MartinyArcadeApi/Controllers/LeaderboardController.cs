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
public async Task<IActionResult> GetGameLeaderboard(string gameKey)
{
    var leaderboard = await _db.GameLeaderboard
        .Where(g => g.GameKey == gameKey)
        .OrderBy(g => g.Rank)
        .Take(50)
        .Join(_db.Users,
            g => g.UserId,
            u => u.UserId,
            (g, u) => new
            {
                rank = g.Rank,
                username = u.Username,
                totalXP = g.TotalXP,
                bestScore = g.BestScore,
                totalPlays = g.TotalPlays
            })
        .ToListAsync();

    return Ok(leaderboard);
}
}