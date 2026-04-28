using DastRas.Domain.Enums;

namespace DastRas.Domain.Entities;

/// <summary>
/// История изменения статусов заказа для аналитики и отслеживания работы персонала.
/// </summary>
public class OrderStatusHistory
{
    public int Id { get; set; }
    
    public int OrderId { get; set; }
    public Order Order { get; set; } = null!;
    
    public OrderStatus Status { get; set; }
    
    /// <summary>
    /// ID сотрудника, который перевел заказ в этот статус (может быть null для автоматических систем или старых данных).
    /// </summary>
    public int? StaffId { get; set; }
    public StaffMember? StaffMember { get; set; }
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
