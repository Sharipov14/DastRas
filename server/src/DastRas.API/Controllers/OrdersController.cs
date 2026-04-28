using System.Security.Claims;
using DastRas.Application.DTOs.Orders;
using DastRas.Application.Interfaces;
using DastRas.Domain.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DastRas.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[AllowAnonymous]
public class OrdersController : ControllerBase
{
    private readonly IOrderService _orderService;

    public OrdersController(IOrderService orderService)
    {
        _orderService = orderService;
    }

    private int UserId => 1; // Temporary hardcoded for dev without client auth

    [HttpGet]
    public async Task<IActionResult> GetOrders()
    {
        var orders = await _orderService.GetUserOrdersAsync(UserId);
        return Ok(orders);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetOrder(int id)
    {
        var order = await _orderService.GetOrderByIdAsync(id, UserId);
        if (order == null) return NotFound();
        return Ok(order);
    }

    [HttpPost]
    public async Task<IActionResult> CreateOrder([FromBody] CreateOrderRequest request)
    {
        try
        {
            var order = await _orderService.CreateOrderAsync(UserId, request);
            return CreatedAtAction(nameof(GetOrder), new { id = order.Id }, order);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { Message = ex.Message });
        }
    }

    [HttpPatch("{id}/status")]
    public async Task<IActionResult> UpdateStatus(int id, [FromBody] UpdateStatusRequest request)
    {
        var staffIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier);
        int? staffId = string.IsNullOrEmpty(staffIdStr) ? null : int.Parse(staffIdStr);

        var success = await _orderService.UpdateOrderStatusAsync(id, request.Status, staffId);
        if (!success) return NotFound();
        return NoContent();
    }
}

public record UpdateStatusRequest(OrderStatus Status);
