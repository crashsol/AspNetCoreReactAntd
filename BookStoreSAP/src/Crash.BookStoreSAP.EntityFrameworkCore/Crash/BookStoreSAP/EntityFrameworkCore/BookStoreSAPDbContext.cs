using Microsoft.EntityFrameworkCore;
using Volo.Abp.Data;
using Volo.Abp.EntityFrameworkCore;

namespace Crash.BookStoreSAP.EntityFrameworkCore
{
    [ConnectionStringName("BookStoreSAP")]
    public class BookStoreSAPDbContext : AbpDbContext<BookStoreSAPDbContext>, IBookStoreSAPDbContext
    {
        public static string TablePrefix { get; set; } = BookStoreSAPConsts.DefaultDbTablePrefix;

        public static string Schema { get; set; } = BookStoreSAPConsts.DefaultDbSchema;

        /* Add DbSet for each Aggregate Root here. Example:
         * public DbSet<Question> Questions { get; set; }
         */

        public BookStoreSAPDbContext(DbContextOptions<BookStoreSAPDbContext> options) 
            : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.ConfigureBookStoreSAP(options =>
            {
                options.TablePrefix = TablePrefix;
                options.Schema = Schema;
            });
        }
    }
}