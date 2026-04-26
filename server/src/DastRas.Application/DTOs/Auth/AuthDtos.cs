namespace DastRas.Application.DTOs.Auth;

public record SendCodeRequest(string Phone);

public record VerifyCodeRequest(string Phone, string Code);

public record AuthResponse(string Token, UserDto User);

public record UserDto(int Id, string Phone, string? Name, string? AvatarUrl);
