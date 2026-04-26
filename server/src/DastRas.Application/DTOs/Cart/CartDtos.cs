namespace DastRas.Application.DTOs.Cart;

public record CartItemDto(
    int Id,
    int ProductId,
    string ProductNameRu,
    string ProductImageUrl,
    decimal ProductPrice,
    string ProductUnit,
    int Quantity
);

public record AddCartItemRequest(int ProductId, int Quantity = 1);

public record UpdateCartItemRequest(int Quantity);
