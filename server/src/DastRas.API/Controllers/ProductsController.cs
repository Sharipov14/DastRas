using DastRas.Application.Mappings;
using DastRas.Domain.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DastRas.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[AllowAnonymous]
public class ProductsController : ControllerBase
{
    private readonly IProductRepository _productRepo;

    public ProductsController(IProductRepository productRepo)
    {
        _productRepo = productRepo;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] int? categoryId)
    {
        var products = categoryId.HasValue
            ? await _productRepo.GetByCategoryAsync(categoryId.Value)
            : await _productRepo.GetAllAsync();

        return Ok(products.Select(p => p.ToDto()));
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var product = await _productRepo.GetByIdAsync(id);
        if (product == null) return NotFound();
        return Ok(product.ToDto());
    }

    [HttpGet("search")]
    public async Task<IActionResult> Search([FromQuery] string q)
    {
        if (string.IsNullOrWhiteSpace(q))
            return Ok(Array.Empty<object>());

        var products = await _productRepo.SearchAsync(q);
        return Ok(products.Select(p => p.ToDto()));
    }
}
