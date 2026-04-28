using DastRas.Domain.Enums;

namespace DastRas.Application.DTOs.Auth;

public record StaffAuthResponse(string Token, StaffMemberDto User);

public record StaffMemberDto(
    int Id, 
    string Username,
    string Phone, 
    string? Name, 
    string? AvatarUrl, 
    UserRole Role,
    bool IsActive,
    bool IsDeleted);

public record LoginRequest(string Username, string Password);

