namespace DastRas.Domain.Entities;

public class Product
{
    public int Id { get; set; }
    public string NameRu { get; set; } = string.Empty;
    public string NameTj { get; set; } = string.Empty;
    public string NameEn { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public string Unit { get; set; } = string.Empty;
    public string ImageUrl { get; set; } = string.Empty;
    public double Rating { get; set; }
    public string? Description { get; set; }

    public int CategoryId { get; set; }
    public Category Category { get; set; } = null!;
}
