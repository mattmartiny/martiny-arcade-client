using MartinyArcadeApi.Data;
using MartinyArcadeApi.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using MartinyArcadeApi.Dtos;
using MartinyArcadeApi.Models;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("game")]
[Authorize]
public class GameController : ControllerBase
{
    private readonly ArcadeDbContext _db;
    private readonly AchievementService _achievementService;

    public GameController(
        ArcadeDbContext db,
        AchievementService achievementService)
    {
        _db = db;
        _achievementService = achievementService;
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
        var unlocked = await _achievementService.CheckAchievements(userId, dto.GameKey);

        return Ok(new
        {
            unlockedAchievements = unlocked.Select(a => new
            {
                key = a.AchievementKey,
                title = a.Title,
                description = a.Description,
                xpReward = a.XpReward
            })
        });
    }
}