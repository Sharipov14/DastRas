using DastRas.Domain.Entities;

namespace DastRas.Domain.Interfaces;

public interface IUserRepository : IRepository<User>
{
    Task<User?> GetByPhoneAsync(string phone);
}
