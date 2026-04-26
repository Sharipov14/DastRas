using DastRas.Application.DTOs.Auth;
using DastRas.Application.DTOs.Products;
using DastRas.Application.DTOs.Cart;
using DastRas.Application.DTOs.Orders;
using DastRas.Application.DTOs.Addresses;
using DastRas.Application.DTOs.Notifications;
using DastRas.Domain.Entities;

namespace DastRas.Application.Mappings;

public static class MappingExtensions
{
    // User
    public static UserDto ToDto(this User user) =>
        new(user.Id, user.Phone, user.Name, user.AvatarUrl);

    // Product
    public static ProductDto ToDto(this Product product) =>
        new(product.Id, product.NameRu, product.NameTj, product.NameEn,
            product.Price, product.Unit, product.ImageUrl, product.Rating,
            product.Description, product.CategoryId);

    // Category
    public static CategoryDto ToDto(this Category category) =>
        new(category.Id, category.Name, category.Emoji);

    // CartItem
    public static CartItemDto ToDto(this CartItem item) =>
        new(item.Id, item.ProductId, item.Product.NameRu, item.Product.ImageUrl,
            item.Product.Price, item.Product.Unit, item.Quantity);

    // Order
    public static OrderDto ToDto(this Order order) =>
        new(order.Id, order.OrderNumber, order.Status.ToString().ToLower(),
            order.Total, order.CreatedAt,
            order.Items.Select(i => i.ToDto()));

    // OrderItem
    public static OrderItemDto ToDto(this OrderItem item) =>
        new(item.ProductId, item.Product.NameRu, item.Product.ImageUrl,
            item.Price, item.Quantity);

    // Address
    public static AddressDto ToDto(this Address address) =>
        new(address.Id, address.Title, address.Details,
            address.Type.ToString().ToLower(), address.IsPrivateHouse,
            address.Entrance, address.Floor, address.Apartment,
            address.Intercom, address.Lat, address.Lng);

    // Notification
    public static NotificationDto ToDto(this Notification notification) =>
        new(notification.Id, notification.Title, notification.Message,
            notification.Type.ToString().ToLower(), notification.Icon,
            notification.Color, notification.IsRead, notification.CreatedAt);
}
