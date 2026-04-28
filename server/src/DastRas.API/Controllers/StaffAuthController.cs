using System.Security.Claims;
using DastRas.Application.DTOs.Auth;
using DastRas.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DastRas.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class StaffAuthController : ControllerBase
{
    private readonly IStaffAuthService _authService;

    public StaffAuthController(IStaffAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        var result = await _authService.LoginAsync(request.Username, request.Password);
        if (result == null) return Unauthorized(new { Message = "Неверный логин или пароль" });
        return Ok(result);
    }

    [HttpPost("send-code")]
    public async Task<IActionResult> SendCode([FromBody] SendCodeRequest request)
    {
        try 
        {
            var result = await _authService.SendCodeAsync(request.Phone);
            return Ok(new { Message = "Code sent", Code = result }); // В реальном проде код не возвращаем
        }
        catch (UnauthorizedAccessException ex)
        {
            return Unauthorized(new { Message = ex.Message });
        }
    }

    [HttpPost("verify-code")]
    public async Task<IActionResult> VerifyCode([FromBody] VerifyCodeRequest request)
    {
        var result = await _authService.VerifyCodeAsync(request.Phone, request.Code);
        if (result == null) return Unauthorized(new { Message = "Invalid or expired code, or access denied" });
        return Ok(result);
    }

    [Authorize]
    [HttpGet("me")]
    public async Task<IActionResult> GetCurrentUser()
    {
        var userIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(userIdStr)) return Unauthorized();
        
        var userId = int.Parse(userIdStr);
        var user = await _authService.GetCurrentStaffAsync(userId);
        if (user == null) return NotFound();
        return Ok(user);
    }
}
