using DastRas.Domain.Enums;

namespace DastRas.Application.DTOs.Addresses;

public record AddressDto(
    int Id,
    string Title,
    string Details,
    string Type,
    bool IsPrivateHouse,
    string? Entrance,
    string? Floor,
    string? Apartment,
    string? Intercom,
    double? Lat,
    double? Lng
);

public record CreateAddressRequest(
    string Title,
    string Details,
    AddressType Type,
    bool IsPrivateHouse = false,
    string? Entrance = null,
    string? Floor = null,
    string? Apartment = null,
    string? Intercom = null,
    double? Lat = null,
    double? Lng = null
);

public record UpdateAddressRequest(
    string Title,
    string Details,
    AddressType Type,
    bool IsPrivateHouse = false,
    string? Entrance = null,
    string? Floor = null,
    string? Apartment = null,
    string? Intercom = null,
    double? Lat = null,
    double? Lng = null
);

public record ValidateAddressRequest(string Details);
