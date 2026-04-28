using DastRas.Domain.Entities;
using DastRas.Domain.Enums;
using Microsoft.EntityFrameworkCore;

namespace DastRas.Infrastructure.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<User> Users => Set<User>();
    public DbSet<Category> Categories => Set<Category>();
    public DbSet<Product> Products => Set<Product>();
    public DbSet<Address> Addresses => Set<Address>();
    public DbSet<Order> Orders => Set<Order>();
    public DbSet<OrderItem> OrderItems => Set<OrderItem>();
    public DbSet<CartItem> CartItems => Set<CartItem>();
    public DbSet<Notification> Notifications => Set<Notification>();
    public DbSet<SmsCode> SmsCodes => Set<SmsCode>();
    public DbSet<StaffMember> StaffMembers => Set<StaffMember>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // ──────────────────────────────────
        // Schema: management (StaffMember)
        // ──────────────────────────────────

        modelBuilder.Entity<StaffMember>(e =>
        {
            e.ToTable("StaffMembers", "management");
            e.HasIndex(s => s.Phone).IsUnique();
            e.HasIndex(s => s.Email).IsUnique();
            e.Property(s => s.Phone).HasMaxLength(20);
            e.Property(s => s.Email).HasMaxLength(100);
            e.Property(s => s.Name).HasMaxLength(100);
            e.Property(s => s.AvatarUrl).HasMaxLength(500);
            e.Property(s => s.Role).HasConversion<string>().HasMaxLength(20);
            e.Property(s => s.PasswordHash).HasMaxLength(500);
        });

        // ──────────────────────────────────
        // Schema: identity (User, SmsCode)
        // ──────────────────────────────────

        modelBuilder.Entity<User>(e =>
        {
            e.ToTable("Users", "identity");
            e.HasIndex(u => u.Phone).IsUnique();
            e.Property(u => u.Phone).HasMaxLength(20);
            e.Property(u => u.Name).HasMaxLength(100);
            e.Property(u => u.AvatarUrl).HasMaxLength(500);
        });

        modelBuilder.Entity<SmsCode>(e =>
        {
            e.ToTable("SmsCodes", "identity");
            e.Property(s => s.Phone).HasMaxLength(20);
            e.Property(s => s.Code).HasMaxLength(10);
            e.HasIndex(s => new { s.Phone, s.Code });
        });

        // ──────────────────────────────────
        // Schema: catalog (Category, Product)
        // ──────────────────────────────────

        modelBuilder.Entity<Category>(e =>
        {
            e.ToTable("Categories", "catalog");
            e.Property(c => c.Name).HasMaxLength(100);
            e.Property(c => c.Emoji).HasMaxLength(10);

            e.HasOne(c => c.Parent)
                .WithMany(c => c.SubCategories)
                .HasForeignKey(c => c.ParentId)
                .OnDelete(DeleteBehavior.Restrict);

            e.HasData(
                new Category { Id = 1, Name = "Овощи", Emoji = "🥬" },
                new Category { Id = 2, Name = "Фрукты", Emoji = "🍎" },
                new Category { Id = 3, Name = "Молочное", Emoji = "🥛" },
                new Category { Id = 4, Name = "Мясо", Emoji = "🍗" },
                new Category { Id = 5, Name = "Выпечка", Emoji = "🍞" }
            );
        });

        modelBuilder.Entity<Product>(e =>
        {
            e.ToTable("Products", "catalog");
            e.Property(p => p.NameRu).HasMaxLength(200);
            e.Property(p => p.NameTj).HasMaxLength(200);
            e.Property(p => p.NameEn).HasMaxLength(200);
            e.Property(p => p.Price).HasPrecision(10, 2);
            e.Property(p => p.StockQuantity).HasPrecision(10, 2);
            e.Property(p => p.Unit).HasMaxLength(20);
            e.Property(p => p.ImageUrl).HasMaxLength(500);
            e.Property(p => p.Description).HasMaxLength(1000);

            e.HasOne(p => p.Category)
                .WithMany(c => c.Products)
                .HasForeignKey(p => p.CategoryId);

            e.HasData(
                new Product { Id = 1, CategoryId = 1, NameRu = "Помидоры", NameTj = "Помидор", NameEn = "Tomatoes", Price = 15, StockQuantity = 100, Unit = "кг", Rating = 4.8, ImageUrl = "https://picsum.photos/300/300?random=1", Description = "Свежие, сочные помидоры." },
                new Product { Id = 2, CategoryId = 1, NameRu = "Огурцы", NameTj = "Бодиринг", NameEn = "Cucumbers", Price = 12, StockQuantity = 80, Unit = "кг", Rating = 4.5, ImageUrl = "https://picsum.photos/300/300?random=2", Description = "Хрустящие огурцы." },
                new Product { Id = 3, CategoryId = 2, NameRu = "Яблоки", NameTj = "Себ", NameEn = "Apples", Price = 10, StockQuantity = 150, Unit = "кг", Rating = 4.9, ImageUrl = "https://picsum.photos/300/300?random=3", Description = "Сладкие красные яблоки." },
                new Product { Id = 4, CategoryId = 2, NameRu = "Бананы", NameTj = "Банан", NameEn = "Bananas", Price = 18, StockQuantity = 60, Unit = "кг", Rating = 4.7, ImageUrl = "https://picsum.photos/300/300?random=4", Description = "Спелые бананы." },
                new Product { Id = 5, CategoryId = 3, NameRu = "Молоко", NameTj = "Шир", NameEn = "Milk", Price = 8, StockQuantity = 40, Unit = "л", Rating = 4.6, ImageUrl = "https://picsum.photos/300/300?random=5", Description = "Натуральное молоко 3.2%." },
                new Product { Id = 6, CategoryId = 3, NameRu = "Сыр", NameTj = "Паннир", NameEn = "Cheese", Price = 45, StockQuantity = 25, Unit = "кг", Rating = 4.8, ImageUrl = "https://picsum.photos/300/300?random=6", Description = "Твердый сыр." },
                new Product { Id = 7, CategoryId = 4, NameRu = "Говядина", NameTj = "Гушти гов", NameEn = "Beef", Price = 85, StockQuantity = 15, Unit = "кг", Rating = 5.0, ImageUrl = "https://picsum.photos/300/300?random=7", Description = "Свежая говядина без костей." },
                new Product { Id = 8, CategoryId = 5, NameRu = "Хлеб", NameTj = "Нон", NameEn = "Bread", Price = 4, StockQuantity = 50, Unit = "шт", Rating = 4.9, ImageUrl = "https://picsum.photos/300/300?random=8", Description = "Горячий тандырный хлеб." }
            );
        });

        // ──────────────────────────────────
        // Schema: ordering (Order, OrderItem, CartItem)
        // ──────────────────────────────────

        modelBuilder.Entity<Order>(e =>
        {
            e.ToTable("Orders", "ordering");
            e.Property(o => o.OrderNumber).HasMaxLength(20);
            e.Property(o => o.Total).HasPrecision(10, 2);

            e.Property(o => o.Status)
                .HasConversion<string>()
                .HasMaxLength(20);

            e.HasOne(o => o.User)
                .WithMany(u => u.Orders)
                .HasForeignKey(o => o.UserId);

            e.HasOne(o => o.Address)
                .WithMany()
                .HasForeignKey(o => o.AddressId)
                .OnDelete(DeleteBehavior.SetNull);
        });

        modelBuilder.Entity<OrderItem>(e =>
        {
            e.ToTable("OrderItems", "ordering");
            e.Property(oi => oi.Price).HasPrecision(10, 2);

            e.HasOne(oi => oi.Order)
                .WithMany(o => o.Items)
                .HasForeignKey(oi => oi.OrderId);

            e.HasOne(oi => oi.Product)
                .WithMany()
                .HasForeignKey(oi => oi.ProductId);
        });

        modelBuilder.Entity<CartItem>(e =>
        {
            e.ToTable("CartItems", "ordering");
            e.HasIndex(ci => new { ci.UserId, ci.ProductId }).IsUnique();

            e.HasOne(ci => ci.User)
                .WithMany(u => u.CartItems)
                .HasForeignKey(ci => ci.UserId);

            e.HasOne(ci => ci.Product)
                .WithMany()
                .HasForeignKey(ci => ci.ProductId);
        });

        // ──────────────────────────────────
        // Schema: customers (Address, Notification)
        // ──────────────────────────────────

        modelBuilder.Entity<Address>(e =>
        {
            e.ToTable("Addresses", "customers");
            e.Property(a => a.Title).HasMaxLength(100);
            e.Property(a => a.Details).HasMaxLength(500);
            e.Property(a => a.Entrance).HasMaxLength(10);
            e.Property(a => a.Floor).HasMaxLength(10);
            e.Property(a => a.Apartment).HasMaxLength(20);
            e.Property(a => a.Intercom).HasMaxLength(20);

            e.Property(a => a.Type)
                .HasConversion<string>()
                .HasMaxLength(20);

            e.HasOne(a => a.User)
                .WithMany(u => u.Addresses)
                .HasForeignKey(a => a.UserId);
        });

        modelBuilder.Entity<Notification>(e =>
        {
            e.ToTable("Notifications", "customers");
            e.Property(n => n.Title).HasMaxLength(200);
            e.Property(n => n.Message).HasMaxLength(1000);
            e.Property(n => n.Icon).HasMaxLength(50);
            e.Property(n => n.Color).HasMaxLength(100);

            e.Property(n => n.Type)
                .HasConversion<string>()
                .HasMaxLength(20);

            e.HasOne(n => n.User)
                .WithMany(u => u.Notifications)
                .HasForeignKey(n => n.UserId);
        });
    }
}
