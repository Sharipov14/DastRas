using DastRas.Application.DTOs.Analytics;

namespace DastRas.Application.Interfaces;

public interface IAnalyticsService
{
    Task<DashboardDataDto> GetDashboardDataAsync(DateTime? from = null, DateTime? to = null);
}
