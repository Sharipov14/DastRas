using DastRas.Application.DTOs.Orders;
using DastRas.Application.Interfaces;
using DastRas.Application.Mappings;
using DastRas.Domain.Entities;
using DastRas.Domain.Interfaces;

namespace DastRas.Application.Services;

public class OrderService : IOrderService
{
    private readonly IOrderRepository _orderRepo;
    private readonly IRepository<CartItem> _cartRepo;

    public OrderService(IOrderRepository orderRepo, IRepository<CartItem> cartRepo)
    {
        _orderRepo = orderRepo;
        _cartRepo = cartRepo;
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
}
