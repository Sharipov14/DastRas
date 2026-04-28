using DastRas.Application.Mappings;
using DastRas.Application.DTOs.Products;
using DastRas.Domain.Entities;
using DastRas.Domain.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DastRas.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoriesController : ControllerBase
{
    private readonly IRepository<Category> _categoryRepo;

    public CategoriesController(IRepository<Category> categoryRepo)
    {
        _categoryRepo = categoryRepo;
    }

    [HttpGet]
    [AllowAnonymous]
    public async Task<IActionResult> GetAll()
    {
        var categories = await _categoryRepo.GetAllAsync();
        return Ok(categories.Select(c => c.ToDto()));
    }

    [HttpPost]
    [Authorize(Roles = "Admin,Manager")]
    public async Task<IActionResult> Create([FromBody] CreateCategoryRequest request)
    {
        var category = new Category
        {
            Name = request.Name,
            Emoji = request.Emoji,
            ParentId = request.ParentId
        };

        await _categoryRepo.AddAsync(category);
        return Ok(category.ToDto());
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Admin,Manager")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateCategoryRequest request)
    {
        var category = await _categoryRepo.GetByIdAsync(id);
        if (category == null) return NotFound();

        category.Name = request.Name;
        category.Emoji = request.Emoji;
        category.ParentId = request.ParentId;

        await _categoryRepo.UpdateAsync(category);
        return Ok(category.ToDto());
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin,Manager")]
    public async Task<IActionResult> Delete(int id)
    {
        var category = await _categoryRepo.GetByIdAsync(id);
        if (category == null) return NotFound();

        await _categoryRepo.DeleteAsync(category);
        return NoContent();
    }
}
