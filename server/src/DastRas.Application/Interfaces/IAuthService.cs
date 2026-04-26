using DastRas.Application.DTOs.Auth;

namespace DastRas.Application.Interfaces;

public interface IAuthService
{
    Task<string> SendCodeAsync(string phone);
    Task<AuthResponse?> VerifyCodeAsync(string phone, string code);
    Task<UserDto?> GetCurrentUserAsync(int userId);
}
