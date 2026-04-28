using DastRas.Domain.Entities;

namespace DastRas.Domain.Interfaces;

public interface IStaffMemberRepository : IRepository<StaffMember>
{
    Task<StaffMember?> GetByUsernameAsync(string username);
    Task<StaffMember?> GetByPhoneOrEmailAsync(string login);
}
