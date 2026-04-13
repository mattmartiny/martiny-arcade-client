using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MartinyArcadeApi.Data;
using MartinyArcadeApi.Models;
using System.Security.Claims;
using System.Text.Json;

namespace MartinyArcadeApi.Controllers;

[ApiController]
[Route("save/homeless-hero")]
[Authorize]
public class HomelessHeroSaveController : ControllerBase
{
    private readonly ArcadeDbContext _context;

    public HomelessHeroSaveController(ArcadeDbContext context)
    {
        _context = context;
    }

    private Guid GetUserId()
    {
        return Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
    }

    // 🔹 GET SAVE
    [HttpGet]
    public IActionResult GetSave()
    {
        var userId = GetUserId();

        var save = _context.HomelessHeroSaves
            .FirstOrDefault(s => s.UserId == userId && s.GameKey == "homeless-hero");

        if (save == null)
            return Ok(null);

        var dto = JsonSerializer.Deserialize<object>(save.SaveData);

        return Ok(new
        {
            data = dto,
            battleMessage = save.BattleMessage
        });
    }

    // 🔹 SAVE GAME (UPSERT)
    public class HomelessHeroSaveRequest
    {
        public object Data { get; set; }
        public string BattleMessage { get; set; }
    }

    [HttpPost]
    public IActionResult SaveGame([FromBody] HomelessHeroSaveRequest request)
    {
        var userId = GetUserId();

        var json = JsonSerializer.Serialize(request.Data);

        var existing = _context.HomelessHeroSaves
            .FirstOrDefault(s => s.UserId == userId && s.GameKey == "homeless-hero");

        if (existing != null)
        {
            existing.SaveData = json; // ✅ ONLY game data
            existing.BattleMessage = request.BattleMessage; // ✅ separate column
            existing.UpdatedAt = DateTime.UtcNow;
        }
        else
        {
            _context.HomelessHeroSaves.Add(new HomelessHeroSave
            {
                UserId = userId,
                GameKey = "homeless-hero",
                SaveData = json,
                BattleMessage = request.BattleMessage
            });
        }

        _context.SaveChanges();

        return Ok();
    }
}