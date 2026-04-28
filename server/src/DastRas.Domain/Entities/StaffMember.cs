using DastRas.Domain.Enums;

namespace DastRas.Domain.Entities;

/// <summary>
/// Сущность сотрудника системы (админ, менеджер, сборщик, курьер).
/// Хранится отдельно от обычных покупателей.
/// </summary>
public class StaffMember
{
    public int Id { get; set; }
    
    /// <summary>
    /// Логин сотрудника
    /// </summary>
    public string Username { get; set; } = string.Empty;
    
    /// <summary>
    /// Номер телефона
    /// </summary>
    public string Phone { get; set; } = string.Empty;

    /// <summary>
    /// Email сотрудника (может использоваться как логин)
    /// </summary>
    public string? Email { get; set; }
    
    /// <summary>
    /// Хэш пароля
    /// </summary>
    public string PasswordHash { get; set; } = string.Empty;
    
    /// <summary>
    /// Имя сотрудника
    /// </summary>
    public string? Name { get; set; }
    
    public string? AvatarUrl { get; set; }
    
    /// <summary>
    /// Роль в системе управления
    /// </summary>
    public UserRole Role { get; set; }
    
    /// <summary>
    /// Флаг активности аккаунта
    /// </summary>
    public bool IsActive { get; set; } = true;
    
    /// <summary>
    /// Флаг мягкого удаления
    /// </summary>
    public bool IsDeleted { get; set; } = false;
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
