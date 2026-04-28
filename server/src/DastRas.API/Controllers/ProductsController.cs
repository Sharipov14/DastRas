using DastRas.Application.Mappings;
using DastRas.Application.DTOs.Products;
using DastRas.Domain.Entities;
using DastRas.Domain.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DastRas.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly IProductRepository _productRepo;

    public ProductsController(IProductRepository productRepo)
    {
        _productRepo = productRepo;
    }

    [HttpGet]
    [AllowAnonymous]
    public async Task<IActionResult> GetAll([FromQuery] int? categoryId)
    {
        var products = categoryId.HasValue
            ? await _productRepo.GetByCategoryAsync(categoryId.Value)
            : await _productRepo.GetAllAsync();

        return Ok(products.Select(p => p.ToDto()));
    }

    [HttpGet("{id}")]
    [AllowAnonymous]
    public async Task<IActionResult> GetById(int id)
    {
        var product = await _productRepo.GetByIdAsync(id);
        if (product == null) return NotFound();
        return Ok(product.ToDto());
    }

    [HttpGet("search")]
    [AllowAnonymous]
    public async Task<IActionResult> Search([FromQuery] string q)
    {
        if (string.IsNullOrWhiteSpace(q))
            return Ok(Array.Empty<object>());

        var products = await _productRepo.SearchAsync(q);
        return Ok(products.Select(p => p.ToDto()));
    }

    [HttpPost]
    [Authorize(Roles = "Admin,Manager")]
    public async Task<IActionResult> Create([FromBody] CreateProductRequest request)
    {
        var product = new Product
        {
            NameRu = request.NameRu,
            NameTj = request.NameTj,
            NameEn = request.NameEn,
            Price = request.Price,
            StockQuantity = request.StockQuantity,
            Unit = request.Unit,
            ImageUrl = request.ImageUrl,
            Description = request.Description,
            CategoryId = request.CategoryId,
            Rating = 5.0 // Initial rating
        };

        await _productRepo.AddAsync(product);
        return Ok(product.ToDto());
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Admin,Manager")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateProductRequest request)
    {
        var product = await _productRepo.GetByIdAsync(id);
        if (product == null) return NotFound();

        product.NameRu = request.NameRu;
        product.NameTj = request.NameTj;
        product.NameEn = request.NameEn;
        product.Price = request.Price;
        product.StockQuantity = request.StockQuantity;
        product.Unit = request.Unit;
        product.ImageUrl = request.ImageUrl;
        product.Description = request.Description;
        product.CategoryId = request.CategoryId;

        await _productRepo.UpdateAsync(product);
        return Ok(product.ToDto());
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin,Manager")]
    public async Task<IActionResult> Delete(int id)
    {
        var product = await _productRepo.GetByIdAsync(id);
        if (product == null) return NotFound();

        await _productRepo.DeleteAsync(product);
        return NoContent();
    }
}
