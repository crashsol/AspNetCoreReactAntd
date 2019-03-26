using Crash.BookStoreSPA.Organization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Volo.Abp.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore.DependencyInjection;
using Volo.Abp.Modularity;

namespace Crash.BookStoreSPA.EntityFrameworkCore
{
    [DependsOn(
        typeof(BookStoreSPADomainModule),
        typeof(AbpEntityFrameworkCoreModule)
    )]
    public class BookStoreSPAEntityFrameworkCoreModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            context.Services.AddAbpDbContext<BookStoreSPADbContext>(options =>
            {
                /* Add custom repositories here. Example:
                 * options.AddRepository<Question, EfCoreQuestionRepository>();
                 */
                options.AddDefaultRepositories(true);


                options.Entity<OrganizationUnit>(sp =>
                {
                    sp.DefaultWithDetailsFunc = query => query.Include(b => b.Children)
                        .Include(b => b.OrganizationUnitUsers);
                });

                //添加OrganizationUnit Repository
               // options.AddRepository<IOrganizationUnitRepository, EfCoreOrganizationUnitRepository>();
            });

        }
    }
}