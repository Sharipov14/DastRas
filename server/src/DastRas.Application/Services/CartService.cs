using DastRas.Application.DTOs.Cart;
using DastRas.Application.Interfaces;
using DastRas.Application.Mappings;
using DastRas.Domain.Entities;
using DastRas.Domain.Interfaces;

namespace DastRas.Application.Services;

public class CartService : ICartService
{
    private readonly IRepository<CartItem> _cartRepo;
    private readonly IRepository<Product> _productRepo;

    public CartService(IRepository<CartItem> cartRepo, IRepository<Product> productRepo)
    {
        _cartRepo = cartRepo;
        _productRepo = productRepo;
    }

    public async Task<IEnumerable<CartItemDto>> GetCartAsync(int userId)
    {
        var items = await _cartRepo.FindAsync(c => c.UserId == userId);
        return items.Select(i => i.ToDto());
    }

    public async Task<CartItemDto> AddItemAsync(int userId, AddCartItemRequest request)
    {
        // Check if item already in cart
        var existing = (await _cartRepo.FindAsync(c =>
            c.UserId == userId && c.ProductId == request.ProductId)).FirstOrDefault();

        if (existing != null)
        {
            existing.Quantity += request.Quantity;
            await _cartRepo.UpdateAsync(existing);
            return existing.ToDto();
        }

        var product = await _productRepo.GetByIdAsync(request.ProductId)
            ?? throw new ArgumentException("Product not found");

        var cartItem = new CartItem
        {
            UserId = userId,
            ProductId = request.ProductId,
            Quantity = request.Quantity,
            Product = product
        };

        var created = await _cartRepo.AddAsync(cartItem);
        return created.ToDto();
    }

    public async Task<CartItemDto?> UpdateItemAsync(int userId, int productId, UpdateCartItemRequest request)
    {
        var item = (await _cartRepo.FindAsync(c =>
            c.UserId == userId && c.ProductId == productId)).FirstOrDefault();

        if (item == null) return null;

        if (request.Quantity <= 0)
        {
            await _cartRepo.DeleteAsync(item);
            return null;
        }

        item.Quantity = request.Quantity;
        await _cartRepo.UpdateAsync(item);
        return item.ToDto();
    }

    public async Task<bool> RemoveItemAsync(int userId, int productId)
    {
        var item = (await _cartRepo.FindAsync(c =>
            c.UserId == userId && c.ProductId == productId)).FirstOrDefault();

        if (item == null) return false;

        await _cartRepo.DeleteAsync(item);
        return true;
    }

    public async Task ClearCartAsync(int userId)
    {
        var items = await _cartRepo.FindAsync(c => c.UserId == userId);
        foreach (var item in items)
        {
            await _cartRepo.DeleteAsync(item);
        }
    }
}
