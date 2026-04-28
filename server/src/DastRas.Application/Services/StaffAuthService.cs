using DastRas.Application.DTOs.Auth;
using DastRas.Application.Interfaces;
using DastRas.Application.Mappings;
using DastRas.Domain.Entities;
using DastRas.Domain.Interfaces;

namespace DastRas.Application.Services;

public class StaffAuthService : IStaffAuthService
{
    private readonly IStaffMemberRepository _staffRepo;
    private readonly IRepository<SmsCode> _smsCodeRepo;
    private readonly IJwtService _jwtService;
    private readonly ISmsService _smsService;
    private readonly IPasswordHasher _passwordHasher;

    public StaffAuthService(
        IStaffMemberRepository staffRepo,
        IRepository<SmsCode> smsCodeRepo,
        IJwtService jwtService,
        ISmsService smsService,
        IPasswordHasher passwordHasher)
    {
        _staffRepo = staffRepo;
        _smsCodeRepo = smsCodeRepo;
        _jwtService = jwtService;
        _smsService = smsService;
        _passwordHasher = passwordHasher;
    }

    public async Task<StaffAuthResponse?> LoginAsync(string username, string password)
    {
        var staff = await _staffRepo.GetByUsernameAsync(username);
        if (staff == null || !staff.IsActive)
            return null;

        if (!_passwordHasher.VerifyPassword(password, staff.PasswordHash))
            return null;

        var token = _jwtService.GenerateToken(staff);
        return new StaffAuthResponse(token, staff.ToDto());
    }

    public async Task<string> SendCodeAsync(string phone)
    {
        // Проверяем, существует ли такой сотрудник
        var staff = await _staffRepo.GetByPhoneOrEmailAsync(phone);
        if (staff == null || !staff.IsActive)
            throw new UnauthorizedAccessException("Доступ запрещен или сотрудник не найден");

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

    public async Task<StaffAuthResponse?> VerifyCodeAsync(string phone, string code)
    {
        var smsCodes = await _smsCodeRepo.FindAsync(s =>
            s.Phone == phone && s.Code == code && !s.IsUsed && s.ExpiresAt > DateTime.UtcNow);

        var smsCode = smsCodes.FirstOrDefault();
        if (smsCode == null)
            return null;

        smsCode.IsUsed = true;
        await _smsCodeRepo.UpdateAsync(smsCode);

        var staff = await _staffRepo.GetByPhoneOrEmailAsync(phone);
        if (staff == null || !staff.IsActive)
            return null;

        var token = _jwtService.GenerateToken(staff);
        return new StaffAuthResponse(token, staff.ToDto());
    }

    public async Task<StaffMemberDto?> GetCurrentStaffAsync(int staffId)
    {
        var staff = await _staffRepo.GetByIdAsync(staffId);
        return staff?.ToDto();
    }
}
