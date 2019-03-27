using Crash.BookStoreSPA.Books;
using Crash.BookStoreSPA.Organization;
using Microsoft.EntityFrameworkCore;
using Volo.Abp.Data;
using Volo.Abp.EntityFrameworkCore;

namespace Crash.BookStoreSPA.EntityFrameworkCore
{
    [ConnectionStringName("BookStoreSPA")]
    public class BookStoreSPADbContext : AbpDbContext<BookStoreSPADbContext>, IBookStoreSPADbContext
    {
        public static string TablePrefix { get; set; } = BookStoreSPAConsts.DefaultDbTablePrefix;

        public static string Schema { get; set; } = BookStoreSPAConsts.DefaultDbSchema;

        /* Add DbSet for each Aggregate Root here. Example:
         * public DbSet<Question> Questions { get; set; }
         */
        public DbSet<Book> Books { get; set; }

        /// <summary>
        /// 组织单元
        /// </summary>
        public DbSet<OrganizationUnit> OrganizationUnits { get; set; }

        public DbSet<OrganizationUnitUser> OrganizationUnitUsers { get; set; }


        public BookStoreSPADbContext(DbContextOptions<BookStoreSPADbContext> options) 
            : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.ConfigureBookStoreSPA(options =>
            {
                options.TablePrefix = TablePrefix;
                options.Schema = Schema;
            });
        }
    }
}