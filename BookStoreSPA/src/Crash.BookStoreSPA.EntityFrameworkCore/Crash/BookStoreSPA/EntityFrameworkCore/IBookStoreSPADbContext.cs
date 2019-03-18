using Volo.Abp.Data;
using Volo.Abp.EntityFrameworkCore;

namespace Crash.BookStoreSPA.EntityFrameworkCore
{
    [ConnectionStringName("BookStoreSPA")]
    public interface IBookStoreSPADbContext : IEfCoreDbContext
    {
        /* Add DbSet for each Aggregate Root here. Example:
         * DbSet<Question> Questions { get; }
         */
    }
}