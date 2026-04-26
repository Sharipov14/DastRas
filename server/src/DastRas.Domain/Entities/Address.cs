using DastRas.Domain.Enums;

namespace DastRas.Domain.Entities;

public class Address
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Details { get; set; } = string.Empty;
    public AddressType Type { get; set; } = AddressType.Other;
    public bool IsPrivateHouse { get; set; }
    public string? Entrance { get; set; }
    public string? Floor { get; set; }
    public string? Apartment { get; set; }
    public string? Intercom { get; set; }
    public double? Lat { get; set; }
    public double? Lng { get; set; }

    public int UserId { get; set; }
    public User User { get; set; } = null!;
}
