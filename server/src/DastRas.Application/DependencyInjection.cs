using DastRas.Application.Interfaces;
using DastRas.Application.Services;
using Microsoft.Extensions.DependencyInjection;

namespace DastRas.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddScoped<IAuthService, AuthService>();
        services.AddScoped<IStaffAuthService, StaffAuthService>();
        services.AddScoped<ICartService, CartService>();
        services.AddScoped<IOrderService, OrderService>();
        services.AddScoped<IAddressValidationService, AddressValidationService>();

        return services;
    }
}
