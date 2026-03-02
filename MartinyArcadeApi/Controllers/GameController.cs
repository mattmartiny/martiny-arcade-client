using MartinyArcadeApi.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using MartinyArcadeApi.Dtos;
using MartinyArcadeApi.Models;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;


[ApiController]
[Route("api/game")]
[Authorize]
public class GameController : ControllerBase
{
    private readonly ArcadeDbContext _db;

    public GameController(ArcadeDbContext db)
    {
        _db = db;
    }

    [HttpPost("session")]
    public async Task<IActionResult> RecordSession([FromBody] RecordGameSessionDto dto)
    {
        var userIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userIdStr == null) return Unauthorized();

        var userId = Guid.Parse(userIdStr);

        var session = new GameSession
        {
            UserId = userId,
            GameKey = dto.GameKey,
            Score = dto.Score,
            XpEarned = dto.XpEarned
        };

        _db.GameSessions.Add(session);
        await _db.SaveChangesAsync();

        return Ok();
    }

[HttpGet("game/{gameKey}/best-scores")]
public async Task<IActionResult> GetBestScores(string gameKey)
{
    var leaderboard = await _db.GameSessions
        .Where(g => g.GameKey == gameKey)
        .GroupBy(g => g.UserId)
        .Select(g => new
        {
            UserId = g.Key,
            BestScore = g.Max(x => x.Score)
        })
        .OrderByDescending(g => g.BestScore)
        .Take(50)
        .Join(_db.Users,
            g => g.UserId,
            u => u.UserId,
            (g, u) => new
            {
                username = u.Username,
                bestScore = g.BestScore
            })
        .ToListAsync();

    return Ok(leaderboard);
}


}