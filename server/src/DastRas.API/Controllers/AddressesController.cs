using System.Security.Claims;
using DastRas.Application.DTOs.Addresses;
using DastRas.Application.Interfaces;
using DastRas.Application.Mappings;
using DastRas.Domain.Entities;
using DastRas.Domain.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DastRas.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class AddressesController : ControllerBase
{
    private readonly IRepository<Address> _addressRepo;
    private readonly IAddressValidationService _validationService;

    public AddressesController(
        IRepository<Address> addressRepo,
        IAddressValidationService validationService)
    {
        _addressRepo = addressRepo;
        _validationService = validationService;
    }

    private int UserId => int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var addresses = await _addressRepo.FindAsync(a => a.UserId == UserId);
        return Ok(addresses.Select(a => a.ToDto()));
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var address = await _addressRepo.GetByIdAsync(id);
        if (address == null || address.UserId != UserId) return NotFound();
        return Ok(address.ToDto());
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateAddressRequest request)
    {
        var address = new Address
        {
            UserId = UserId,
            Title = request.Title,
            Details = request.Details,
            Type = request.Type,
            IsPrivateHouse = request.IsPrivateHouse,
            Entrance = request.Entrance,
            Floor = request.Floor,
            Apartment = request.Apartment,
            Intercom = request.Intercom,
            Lat = request.Lat,
            Lng = request.Lng
        };

        var created = await _addressRepo.AddAsync(address);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created.ToDto());
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateAddressRequest request)
    {
        var address = await _addressRepo.GetByIdAsync(id);
        if (address == null || address.UserId != UserId) return NotFound();

        address.Title = request.Title;
        address.Details = request.Details;
        address.Type = request.Type;
        address.IsPrivateHouse = request.IsPrivateHouse;
        address.Entrance = request.Entrance;
        address.Floor = request.Floor;
        address.Apartment = request.Apartment;
        address.Intercom = request.Intercom;
        address.Lat = request.Lat;
        address.Lng = request.Lng;

        await _addressRepo.UpdateAsync(address);
        return Ok(address.ToDto());
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var address = await _addressRepo.GetByIdAsync(id);
        if (address == null || address.UserId != UserId) return NotFound();

        await _addressRepo.DeleteAsync(address);
        return NoContent();
    }

    [HttpPost("validate")]
    public IActionResult Validate([FromBody] ValidateAddressRequest request)
    {
        var isValid = _validationService.ValidateAddress(request.Details);
        return Ok(new { IsValid = isValid });
    }
}
