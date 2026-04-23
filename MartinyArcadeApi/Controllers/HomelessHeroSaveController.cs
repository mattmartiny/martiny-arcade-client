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

        object? dto = null;
        object? backupDto = null;

        try
        {
            dto = JsonSerializer.Deserialize<object>(save.SaveData);
        }
        catch
        {
        }

        if (!string.IsNullOrWhiteSpace(save.BackupSaveData))
        {
            try
            {
                backupDto = JsonSerializer.Deserialize<object>(save.BackupSaveData);
            }
            catch
            {
            }
        }

        return Ok(new
        {
            data = dto,
            backupData = backupDto,
            battleMessage = save.BattleMessage,
            backupBattleMessage = save.BackupBattleMessage
        });
    }


    [HttpPost("recover")]
    public IActionResult RecoverSave()
    {
        var userId = GetUserId();

        var save = _context.HomelessHeroSaves
            .FirstOrDefault(s => s.UserId == userId && s.GameKey == "homeless-hero");

        if (save == null || string.IsNullOrWhiteSpace(save.BackupSaveData))
            return NotFound("No backup save found.");

        save.SaveData = save.BackupSaveData;
        save.BattleMessage = save.BackupBattleMessage;
        save.UpdatedAt = DateTime.UtcNow;

        _context.SaveChanges();

        return Ok();
    }




    // 🔹 SAVE GAME (UPSERT)
    public class HomelessHeroSaveRequest
    {
        public object? Data { get; set; }
        public string? BattleMessage { get; set; }
        public DateTime? ClientUpdatedAt { get; set; }

    }

    [HttpPost]
    public IActionResult SaveGame([FromBody] HomelessHeroSaveRequest request)
    {

        if (request.Data == null)
        {
            return BadRequest("Save data is required");
        }
        var userId = GetUserId();

        var existing = _context.HomelessHeroSaves
            .FirstOrDefault(s => s.UserId == userId && s.GameKey == "homeless-hero");

        // 🚨 BLOCK stale saves
        if (existing != null && request.ClientUpdatedAt.HasValue)
        {
            if (request.ClientUpdatedAt < existing.UpdatedAt)
            {
                return Conflict("Stale save rejected"); // 🔥 KEY LINE
            }
        }

        var json = JsonSerializer.Serialize(request.Data);

        if (existing != null)
        {

            existing.BackupSaveData = existing.SaveData;
            existing.BackupBattleMessage = existing.BattleMessage;

            existing.SaveData = json;
            existing.BattleMessage = request.BattleMessage;
            existing.UpdatedAt = DateTime.UtcNow;
        }
        else
        {
            _context.HomelessHeroSaves.Add(new HomelessHeroSave
            {
                UserId = userId,
                GameKey = "homeless-hero",
                SaveData = json,
                BattleMessage = request.BattleMessage,
                UpdatedAt = DateTime.UtcNow
            });
        }

        _context.SaveChanges();

        return Ok();
    }
}