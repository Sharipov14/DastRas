namespace DastRas.Application.DTOs.Analytics;

public record GeneralStatsDto(
    int TotalOrders,
    decimal TotalRevenue,
    int TotalCustomers,
    int LowStockProductsCount
);

public record SalesTrendDto(
    DateTime Date,
    int OrderCount,
    decimal Revenue
);

public record StaffPerformanceDto(
    int StaffId,
    string FullName,
    string Role,
    int AssembledCount,
    int DeliveredCount
);

public record StockAlertDto(
    int ProductId,
    string ProductName,
    decimal StockQuantity,
    string Unit
);

public record DashboardDataDto(
    GeneralStatsDto Stats,
    List<SalesTrendDto> SalesTrends,
    List<StaffPerformanceDto> StaffPerformance,
    List<StockAlertDto> LowStockProducts
);
