using DastRas.Application.DTOs.Orders;
using DastRas.Application.Interfaces;
using DastRas.Application.Mappings;
using DastRas.Domain.Entities;
using DastRas.Domain.Enums;
using DastRas.Domain.Interfaces;

namespace DastRas.Application.Services;

public class OrderService : IOrderService
{
    private readonly IOrderRepository _orderRepo;
    private readonly IRepository<CartItem> _cartRepo;
    private readonly IRepository<OrderStatusHistory> _historyRepo;

    public OrderService(
        IOrderRepository orderRepo, 
        IRepository<CartItem> cartRepo,
        IRepository<OrderStatusHistory> historyRepo)
    {
        _orderRepo = orderRepo;
        _cartRepo = cartRepo;
        _historyRepo = historyRepo;
    }

    public async Task<IEnumerable<OrderDto>> GetUserOrdersAsync(int userId)
    {
        var orders = await _orderRepo.GetByUserIdAsync(userId);
        return orders.Select(o => o.ToDto());
    }

    public async Task<OrderDto?> GetOrderByIdAsync(int orderId, int userId)
    {
        var order = await _orderRepo.GetByIdWithItemsAsync(orderId);
        if (order == null || order.UserId != userId) return null;
        return order.ToDto();
    }

    public async Task<OrderDto> CreateOrderAsync(int userId, CreateOrderRequest request)
    {
        var cartItems = await _cartRepo.FindAsync(c => c.UserId == userId);
        var cartList = cartItems.ToList();

        if (cartList.Count == 0)
            throw new InvalidOperationException("Cart is empty");

        var order = new Order
        {
            OrderNumber = "#" + Random.Shared.Next(10000, 99999),
            UserId = userId,
            AddressId = request.AddressId,
            Total = cartList.Sum(ci => ci.Product.Price * ci.Quantity),
            Items = cartList.Select(ci => new OrderItem
            {
                ProductId = ci.ProductId,
                Quantity = ci.Quantity,
                Price = ci.Product.Price
            }).ToList()
        };

        var created = await _orderRepo.AddAsync(order);

        // Clear cart
        foreach (var item in cartList)
        {
            await _cartRepo.DeleteAsync(item);
        }

        return created.ToDto();
    }

    public async Task<bool> UpdateOrderStatusAsync(int orderId, OrderStatus status, int? staffId = null)
    {
        var order = await _orderRepo.GetByIdAsync(orderId);
        if (order == null) return false;

        order.Status = status;
        await _orderRepo.UpdateAsync(order);

        // Record history
        await _historyRepo.AddAsync(new OrderStatusHistory
        {
            OrderId = orderId,
            Status = status,
            StaffId = staffId,
            CreatedAt = DateTime.UtcNow
        });

        return true;
    }
}
