using DastRas.Application.DTOs.Auth;
using DastRas.Application.Interfaces;
using DastRas.Domain.Entities;
using DastRas.Domain.Interfaces;
using DastRas.Domain.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using DastRas.Application.Mappings;

namespace DastRas.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "Admin")]
public class UsersController : ControllerBase
{
    private readonly IStaffMemberRepository _staffRepo;
    private readonly IPasswordHasher _passwordHasher;

    public UsersController(IStaffMemberRepository staffRepo, IPasswordHasher passwordHasher)
    {
        _staffRepo = staffRepo;
        _passwordHasher = passwordHasher;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] bool includeDeleted = false)
    {
        var staff = await _staffRepo.GetAllAsync();
        var result = staff.AsEnumerable();
        
        if (!includeDeleted)
        {
            result = result.Where(s => !s.IsDeleted);
        }
        
        return Ok(result.Select(s => s.ToDto()));
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateStaffRequest request)
    {
        var existing = await _staffRepo.GetByUsernameAsync(request.Username);
        if (existing != null) return BadRequest(new { Message = "Пользователь с таким логином уже существует" });

        var staff = new StaffMember
        {
            Username = request.Username,
            PasswordHash = _passwordHasher.HashPassword(request.Password),
            Phone = request.Phone,
            Name = request.Name,
            Role = request.Role,
            IsActive = true,
            CreatedAt = DateTime.UtcNow
        };

        await _staffRepo.AddAsync(staff);
        return Ok(staff.ToDto());
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateStaffRequest request)
    {
        var staff = await _staffRepo.GetByIdAsync(id);
        if (staff == null) return NotFound();

        staff.Name = request.Name;
        staff.Phone = request.Phone;
        staff.Role = request.Role;
        staff.IsActive = request.IsActive;

        if (!string.IsNullOrEmpty(request.Password))
        {
            staff.PasswordHash = _passwordHasher.HashPassword(request.Password);
        }

        await _staffRepo.UpdateAsync(staff);
        return Ok(staff.ToDto());
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var staff = await _staffRepo.GetByIdAsync(id);
        if (staff == null) return NotFound();
        
        staff.IsDeleted = true;
        await _staffRepo.UpdateAsync(staff);
        return NoContent();
    }

    [HttpPost("{id}/restore")]
    public async Task<IActionResult> Restore(int id)
    {
        var staff = await _staffRepo.GetByIdAsync(id);
        if (staff == null) return NotFound();
        
        staff.IsDeleted = false;
        await _staffRepo.UpdateAsync(staff);
        return Ok(staff.ToDto());
    }
}

public record CreateStaffRequest(
    string Username, 
    string Password, 
    string Phone, 
    string Name, 
    UserRole Role);

public record UpdateStaffRequest(
    string Name, 
    string Phone, 
    UserRole Role,
    bool IsActive,
    string? Password = null);
