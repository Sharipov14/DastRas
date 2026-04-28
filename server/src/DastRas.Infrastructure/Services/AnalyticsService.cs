using DastRas.Application.DTOs.Analytics;
using DastRas.Application.Interfaces;
using DastRas.Domain.Enums;
using DastRas.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace DastRas.Infrastructure.Services;

public class AnalyticsService : IAnalyticsService
{
    private readonly AppDbContext _context;

    public AnalyticsService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<DashboardDataDto> GetDashboardDataAsync(DateTime? from = null, DateTime? to = null)
    {
        var startDate = (from ?? DateTime.UtcNow.AddDays(-30)).ToUniversalTime();
        var endDate = (to ?? DateTime.UtcNow).ToUniversalTime();

        // General Stats
        var totalOrders = await _context.Orders.CountAsync(o => o.CreatedAt >= startDate && o.CreatedAt <= endDate);
        
        var totalRevenue = await _context.Orders
            .Where(o => o.CreatedAt >= startDate && o.CreatedAt <= endDate && o.Status != OrderStatus.Cancelled)
            .SumAsync(o => o.Total);
            
        var totalCustomers = await _context.Users.CountAsync();
        
        var lowStockCount = await _context.Products.CountAsync(p => p.StockQuantity < 10);

        // Sales Trends
        var salesTrendsRaw = await _context.Orders
            .Where(o => o.CreatedAt >= startDate && o.CreatedAt <= endDate && o.Status != OrderStatus.Cancelled)
            .GroupBy(o => o.CreatedAt.Date)
            .Select(g => new { Date = g.Key, Count = g.Count(), Revenue = g.Sum(o => o.Total) })
            .ToListAsync();

        var salesTrends = salesTrendsRaw
            .Select(x => new SalesTrendDto(DateTime.SpecifyKind(x.Date, DateTimeKind.Utc), x.Count, x.Revenue))
            .OrderBy(t => t.Date)
            .ToList();

        // Staff Performance
        var performance = await _context.OrderStatusHistories
            .Where(h => h.CreatedAt >= startDate && h.CreatedAt <= endDate && h.StaffId != null)
            .GroupBy(h => new { h.StaffId, h.StaffMember!.Name, h.StaffMember.Role })
            .Select(g => new StaffPerformanceDto(
                g.Key.StaffId!.Value,
                g.Key.Name ?? "Unknown",
                g.Key.Role.ToString(),
                g.Count(h => h.Status == OrderStatus.Delivering),
                g.Count(h => h.Status == OrderStatus.Delivered)
            ))
            .ToListAsync();

        // Low Stock Products
        var lowStock = await _context.Products
            .Where(p => p.StockQuantity < 10)
            .OrderBy(p => p.StockQuantity)
            .Take(10)
            .Select(p => new StockAlertDto(p.Id, p.NameRu, p.StockQuantity, p.Unit))
            .ToListAsync();

        return new DashboardDataDto(
            new GeneralStatsDto(totalOrders, totalRevenue, totalCustomers, lowStockCount),
            salesTrends,
            performance,
            lowStock
        );
    }
}
