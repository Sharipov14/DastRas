namespace DastRas.Application.DTOs.Orders;

public record OrderDto(
    int Id,
    string OrderNumber,
    string Status,
    decimal Total,
    DateTime CreatedAt,
    IEnumerable<OrderItemDto> Items
);

public record OrderItemDto(
    int ProductId,
    string ProductNameRu,
    string ProductImageUrl,
    decimal Price,
    int Quantity
);

public record CreateOrderRequest(int? AddressId);
