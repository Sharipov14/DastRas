using DastRas.Domain.Entities;
using DastRas.Domain.Interfaces;
using DastRas.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace DastRas.Infrastructure.Repositories;

public class UserRepository : Repository<User>, IUserRepository
{
    public UserRepository(AppDbContext context) : base(context) { }

    public async Task<User?> GetByPhoneAsync(string phone)
    {
        return await _dbSet.FirstOrDefaultAsync(u => u.Phone == phone);
    }
}
