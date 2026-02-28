using MartinyArcadeApi.Services;
using Microsoft.AspNetCore.Mvc;
using MartinyArcadeApi.Data;
using MartinyArcadeApi.Models;
using MartinyArcadeApi.Dtos.Auth;
using Microsoft.EntityFrameworkCore;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;


[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly ArcadeDbContext _db;
    private readonly PasswordService _password;
    private readonly IConfiguration _config;

    public AuthController(ArcadeDbContext db, PasswordService password, IConfiguration config)
    {
        _db = db;
        _password = password;
        _config = config;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        if (await _db.Users.AnyAsync(u => u.Email == dto.Email))
            return BadRequest("Email already exists");

        if (await _db.Users.AnyAsync(u => u.Username == dto.Username))
            return BadRequest("Username already taken");


        var user = new User
        {
            Email = dto.Email,
            Username = dto.Username,
            PasswordHash = _password.Hash(dto.Password)
        };

        _db.Users.Add(user);

        var profile = new UserProfile
        {
            UserId = user.UserId,
            TotalXP = 0,
            LastUpdated = DateTime.UtcNow
        };

        _db.UserProfiles.Add(profile);


        await _db.SaveChangesAsync();

        return Ok();
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var user = await _db.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);

        if (user == null || !_password.Verify(dto.Password, user.PasswordHash))
            return Unauthorized();

        var token = GenerateJwt(user);

        return Ok(new AuthResponseDto { Token = token });
    }

    [Authorize]
    [HttpGet("me")]
    public IActionResult Me()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)
            ?? User.FindFirstValue(JwtRegisteredClaimNames.Sub);

        var email = User.FindFirstValue(ClaimTypes.Email)
            ?? User.FindFirstValue(JwtRegisteredClaimNames.Email);


    var username = User.FindFirstValue("username");


        return Ok(new
        {
            userId,
            email,
            username
        });
    }

    private string GenerateJwt(User user)
{
    var jwt = _config.GetSection("Jwt");

    var claims = new[]
    {
        new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()),
        new Claim(ClaimTypes.Email, user.Email),
        new Claim("username", user.Username) // THIS MUST EXIST
    };

    var key = new SymmetricSecurityKey(
        Encoding.UTF8.GetBytes(jwt["Key"]!));

    var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

    var token = new JwtSecurityToken(
        issuer: jwt["Issuer"],
        audience: jwt["Audience"],
        claims: claims,
        expires: DateTime.UtcNow.AddDays(7),
        signingCredentials: creds
    );

    return new JwtSecurityTokenHandler().WriteToken(token);
}
}