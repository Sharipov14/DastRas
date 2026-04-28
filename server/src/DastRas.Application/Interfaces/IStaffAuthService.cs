using DastRas.Application.DTOs.Auth;

namespace DastRas.Application.Interfaces;

public interface IStaffAuthService
{
    Task<StaffAuthResponse?> LoginAsync(string username, string password);
    Task<string> SendCodeAsync(string phone);
    Task<StaffAuthResponse?> VerifyCodeAsync(string phone, string code);
    Task<StaffMemberDto?> GetCurrentStaffAsync(int staffId);
}
