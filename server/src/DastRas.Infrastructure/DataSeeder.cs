using DastRas.Application.Interfaces;
using DastRas.Domain.Entities;
using DastRas.Domain.Enums;
using DastRas.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace DastRas.Infrastructure;

public static class DataSeeder
{
    public static async Task SeedAsync(IServiceProvider serviceProvider)
    {
        using var scope = serviceProvider.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        var logger = scope.ServiceProvider.GetRequiredService<ILogger<AppDbContext>>();
        var config = scope.ServiceProvider.GetRequiredService<IConfiguration>();
        var passwordHasher = scope.ServiceProvider.GetRequiredService<IPasswordHasher>();

        try
        {
            await context.Database.MigrateAsync();
            logger.LogInformation("✅ Database migrated successfully.");

            // Seed Root Admin
            var rootUsername = config["AdminSettings:RootUsername"] ?? "admin";
            var rootPassword = config["AdminSettings:RootPassword"] ?? "admin";

            var existingAdmin = await context.Set<StaffMember>()
                .FirstOrDefaultAsync(s => s.Username == rootUsername);

            if (existingAdmin == null)
            {
                var rootAdmin = new StaffMember
                {
                    Username = rootUsername,
                    PasswordHash = passwordHasher.HashPassword(rootPassword),
                    Name = "Root Administrator",
                    Role = UserRole.Admin,
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow
                };

                await context.Set<StaffMember>().AddAsync(rootAdmin);
                await context.SaveChangesAsync();
                logger.LogInformation("✅ Root administrator seeded successfully.");
            }
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "❌ An error occurred while seeding the database.");
        }
    }
}
