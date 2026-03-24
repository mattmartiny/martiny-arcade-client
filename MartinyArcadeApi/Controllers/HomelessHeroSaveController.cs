using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MartinyArcadeApi.Data;
using MartinyArcadeApi.Models;
using System.Security.Claims;
using System.Text.Json;

namespace MartinyArcadeApi.Controllers;

[ApiController]
[Route("api/save/homeless-hero")]
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

        return Ok(dto);
    }

    // 🔹 SAVE GAME (UPSERT)
    [HttpPost]
    public IActionResult SaveGame([FromBody] object dto)
    {
        var userId = GetUserId();

        var json = JsonSerializer.Serialize(dto);

        var existing = _context.HomelessHeroSaves
            .FirstOrDefault(s => s.UserId == userId && s.GameKey == "homeless-hero");

        if (existing != null)
        {
            existing.SaveData = json;
            existing.UpdatedAt = DateTime.UtcNow;
        }
        else
        {
            _context.HomelessHeroSaves.Add(new HomelessHeroSave
            {
                UserId = userId,
                GameKey = "homeless-hero",
                SaveData = json
            });
        }

        _context.SaveChanges();

        return Ok();
    }
}