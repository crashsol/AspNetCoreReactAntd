using Crash.BookStoreSPA.Books;
using Crash.BookStoreSPA.Organization;
using Microsoft.EntityFrameworkCore;
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
        
        DbSet<Book> Books { get; }

        /// <summary>
        /// 组织单元
        /// </summary>
        DbSet<OrganizationUnit> OrganizationUnits { get; set; }
    }
}