using DastRas.Application.DTOs.Auth;
using DastRas.Application.Interfaces;
using DastRas.Application.Mappings;
using DastRas.Domain.Entities;
using DastRas.Domain.Interfaces;

namespace DastRas.Application.Services;

public class AuthService : IAuthService
{
    private readonly IUserRepository _userRepo;
    private readonly IRepository<SmsCode> _smsCodeRepo;
    private readonly IJwtService _jwtService;
    private readonly ISmsService _smsService;

    public AuthService(
        IUserRepository userRepo,
        IRepository<SmsCode> smsCodeRepo,
        IJwtService jwtService,
        ISmsService smsService)
    {
        _userRepo = userRepo;
        _smsCodeRepo = smsCodeRepo;
        _jwtService = jwtService;
        _smsService = smsService;
    }

    public async Task<string> SendCodeAsync(string phone)
    {
        var code = Random.Shared.Next(1000, 9999).ToString();

        var smsCode = new SmsCode
        {
            Phone = phone,
            Code = code,
            ExpiresAt = DateTime.UtcNow.AddMinutes(5),
            IsUsed = false
        };

        await _smsCodeRepo.AddAsync(smsCode);
        await _smsService.SendSmsAsync(phone, code);
        return code;
    }

    public async Task<AuthResponse?> VerifyCodeAsync(string phone, string code)
    {
        var smsCodes = await _smsCodeRepo.FindAsync(s =>
            s.Phone == phone && s.Code == code && !s.IsUsed && s.ExpiresAt > DateTime.UtcNow);

        var smsCode = smsCodes.FirstOrDefault();
        if (smsCode == null)
            return null;

        // Mark code as used
        smsCode.IsUsed = true;
        await _smsCodeRepo.UpdateAsync(smsCode);

        // Find or create user
        var user = await _userRepo.GetByPhoneAsync(phone);
        if (user == null)
        {
            user = new User
            {
                Phone = phone,
                Name = "User",
                CreatedAt = DateTime.UtcNow
            };
            user = await _userRepo.AddAsync(user);
        }

        var token = _jwtService.GenerateToken(user);
        return new AuthResponse(token, user.ToDto());
    }

    public async Task<UserDto?> GetCurrentUserAsync(int userId)
    {
        var user = await _userRepo.GetByIdAsync(userId);
        return user?.ToDto();
    }
}
