using DastRas.Application.DTOs.Cart;

namespace DastRas.Application.Interfaces;

public interface ICartService
{
    Task<IEnumerable<CartItemDto>> GetCartAsync(int userId);
    Task<CartItemDto> AddItemAsync(int userId, AddCartItemRequest request);
    Task<CartItemDto?> UpdateItemAsync(int userId, int productId, UpdateCartItemRequest request);
    Task<bool> RemoveItemAsync(int userId, int productId);
    Task ClearCartAsync(int userId);
}
