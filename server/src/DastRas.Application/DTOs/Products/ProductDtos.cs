namespace DastRas.Application.DTOs.Products;

public record ProductDto(
    int Id,
    string NameRu,
    string NameTj,
    string NameEn,
    decimal Price,
    string Unit,
    string ImageUrl,
    double Rating,
    string? Description,
    int CategoryId
);

public record CategoryDto(int Id, string Name, string Emoji);
