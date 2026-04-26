using DastRas.Domain.Entities;

namespace DastRas.Domain.Interfaces;

public interface IOrderRepository : IRepository<Order>
{
    Task<IEnumerable<Order>> GetByUserIdAsync(int userId);
    Task<Order?> GetByIdWithItemsAsync(int id);
}
