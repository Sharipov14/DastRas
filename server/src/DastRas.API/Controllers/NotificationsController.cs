using System.Security.Claims;
using DastRas.Application.Mappings;
using DastRas.Domain.Entities;
using DastRas.Domain.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DastRas.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[AllowAnonymous]
public class NotificationsController : ControllerBase
{
    private readonly IRepository<Notification> _notificationRepo;

    public NotificationsController(IRepository<Notification> notificationRepo)
    {
        _notificationRepo = notificationRepo;
    }

    private int UserId => 1; // Temporary hardcoded for dev without client auth

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var notifications = await _notificationRepo.FindAsync(n => n.UserId == UserId);
        return Ok(notifications
            .OrderByDescending(n => n.CreatedAt)
            .Select(n => n.ToDto()));
    }

    [HttpPut("{id}/read")]
    public async Task<IActionResult> MarkAsRead(int id)
    {
        var notification = await _notificationRepo.GetByIdAsync(id);
        if (notification == null || notification.UserId != UserId) return NotFound();

        notification.IsRead = true;
        await _notificationRepo.UpdateAsync(notification);
        return Ok(notification.ToDto());
    }

    [HttpPut("read-all")]
    public async Task<IActionResult> MarkAllAsRead()
    {
        var notifications = await _notificationRepo.FindAsync(n =>
            n.UserId == UserId && !n.IsRead);

        foreach (var n in notifications)
        {
            n.IsRead = true;
            await _notificationRepo.UpdateAsync(n);
        }

        return NoContent();
    }
}
