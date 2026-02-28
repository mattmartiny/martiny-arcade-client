using MartinyArcadeApi.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using MartinyArcadeApi.Dtos;
using MartinyArcadeApi.Models;
using System.Security.Claims;


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
}