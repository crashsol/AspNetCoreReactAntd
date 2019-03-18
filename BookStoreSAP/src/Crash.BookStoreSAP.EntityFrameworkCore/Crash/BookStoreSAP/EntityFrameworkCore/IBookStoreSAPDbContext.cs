using Volo.Abp.Data;
using Volo.Abp.EntityFrameworkCore;

namespace Crash.BookStoreSAP.EntityFrameworkCore
{
    [ConnectionStringName("BookStoreSAP")]
    public interface IBookStoreSAPDbContext : IEfCoreDbContext
    {
        /* Add DbSet for each Aggregate Root here. Example:
         * DbSet<Question> Questions { get; }
         */
    }
}