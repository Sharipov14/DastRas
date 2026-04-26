using DastRas.Domain.Entities;
using DastRas.Domain.Interfaces;
using DastRas.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace DastRas.Infrastructure.Repositories;

public class ProductRepository : Repository<Product>, IProductRepository
{
    public ProductRepository(AppDbContext context) : base(context) { }

    public async Task<IEnumerable<Product>> GetByCategoryAsync(int categoryId)
    {
        return await _dbSet.Where(p => p.CategoryId == categoryId).ToListAsync();
    }

    public async Task<IEnumerable<Product>> SearchAsync(string query)
    {
        var q = query.ToLower();
        return await _dbSet.Where(p =>
            p.NameRu.ToLower().Contains(q) ||
            p.NameTj.ToLower().Contains(q) ||
            p.NameEn.ToLower().Contains(q)
        ).ToListAsync();
    }
}
