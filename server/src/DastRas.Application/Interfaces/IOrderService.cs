using DastRas.Application.DTOs.Orders;

namespace DastRas.Application.Interfaces;

public interface IOrderService
{
    Task<IEnumerable<OrderDto>> GetUserOrdersAsync(int userId);
    Task<OrderDto?> GetOrderByIdAsync(int orderId, int userId);
    Task<OrderDto> CreateOrderAsync(int userId, CreateOrderRequest request);
}
