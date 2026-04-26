using System.Security.Claims;
using DastRas.Application.DTOs.Cart;
using DastRas.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DastRas.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[AllowAnonymous]
public class CartController : ControllerBase
{
    private readonly ICartService _cartService;

    public CartController(ICartService cartService)
    {
        _cartService = cartService;
    }

    private int UserId => 1; // Temporary hardcoded for dev without client auth

    [HttpGet]
    public async Task<IActionResult> GetCart()
    {
        var items = await _cartService.GetCartAsync(UserId);
        return Ok(items);
    }

    [HttpPost("items")]
    public async Task<IActionResult> AddItem([FromBody] AddCartItemRequest request)
    {
        var item = await _cartService.AddItemAsync(UserId, request);
        return CreatedAtAction(nameof(GetCart), item);
    }

    [HttpPut("items/{productId}")]
    public async Task<IActionResult> UpdateItem(int productId, [FromBody] UpdateCartItemRequest request)
    {
        var item = await _cartService.UpdateItemAsync(UserId, productId, request);
        if (item == null && request.Quantity > 0) return NotFound();
        return Ok(item);
    }

    [HttpDelete("items/{productId}")]
    public async Task<IActionResult> RemoveItem(int productId)
    {
        var result = await _cartService.RemoveItemAsync(UserId, productId);
        if (!result) return NotFound();
        return NoContent();
    }

    [HttpDelete]
    public async Task<IActionResult> ClearCart()
    {
        await _cartService.ClearCartAsync(UserId);
        return NoContent();
    }
}
