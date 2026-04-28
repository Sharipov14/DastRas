namespace DastRas.Domain.Entities;

public class User
{
    public int Id { get; set; }
    public string Phone { get; set; } = string.Empty;
    public string? Username { get; set; }
    public string? PasswordHash { get; set; }
    public Enums.UserRole Role { get; set; } = Enums.UserRole.Customer;
    public string? Name { get; set; }
    public string? AvatarUrl { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navigation properties
    public ICollection<Address> Addresses { get; set; } = new List<Address>();
    public ICollection<Order> Orders { get; set; } = new List<Order>();
    public ICollection<CartItem> CartItems { get; set; } = new List<CartItem>();
    public ICollection<Notification> Notifications { get; set; } = new List<Notification>();
}
