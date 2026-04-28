namespace DastRas.Application.DTOs.Products;

public record ProductDto(
    int Id,
    string NameRu,
    string NameTj,
    string NameEn,
    decimal Price,
    decimal StockQuantity,
    string Unit,
    string ImageUrl,
    double Rating,
    string? Description,
    int CategoryId
);

public record CategoryDto(
    int Id, 
    string Name, 
    string Emoji, 
    int? ParentId
);

public record CreateCategoryRequest(string Name, string Emoji, int? ParentId);
public record UpdateCategoryRequest(string Name, string Emoji, int? ParentId);

public record CreateProductRequest(
    string NameRu,
    string NameTj,
    string NameEn,
    decimal Price,
    decimal StockQuantity,
    string Unit,
    string ImageUrl,
    string? Description,
    int CategoryId
);

public record UpdateProductRequest(
    string NameRu,
    string NameTj,
    string NameEn,
    decimal Price,
    decimal StockQuantity,
    string Unit,
    string ImageUrl,
    string? Description,
    int CategoryId
);
