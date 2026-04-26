using DastRas.Domain.Entities;

namespace DastRas.Application.Interfaces;

public interface IJwtService
{
    string GenerateToken(User user);
}
