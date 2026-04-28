using DastRas.Domain.Entities;
using DastRas.Domain.Interfaces;
using DastRas.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace DastRas.Infrastructure.Repositories;

public class StaffMemberRepository : Repository<StaffMember>, IStaffMemberRepository
{
    public StaffMemberRepository(AppDbContext context) : base(context) { }

    public async Task<StaffMember?> GetByUsernameAsync(string username)
    {
        return await _dbSet.FirstOrDefaultAsync(s => s.Username == username);
    }

    public async Task<StaffMember?> GetByPhoneOrEmailAsync(string login)
    {
        return await _dbSet.FirstOrDefaultAsync(s => s.Phone == login || s.Email == login);
    }
}
