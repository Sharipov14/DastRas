namespace DastRas.Application.DTOs.Notifications;

public record NotificationDto(
    int Id,
    string Title,
    string Message,
    string Type,
    string? Icon,
    string? Color,
    bool IsRead,
    DateTime CreatedAt
);
