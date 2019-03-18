using Microsoft.Extensions.DependencyInjection;
using Volo.Abp.EntityFrameworkCore;
using Volo.Abp.Modularity;

namespace Crash.BookStoreSAP.EntityFrameworkCore
{
    [DependsOn(
        typeof(BookStoreSAPDomainModule),
        typeof(AbpEntityFrameworkCoreModule)
    )]
    public class BookStoreSAPEntityFrameworkCoreModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            context.Services.AddAbpDbContext<BookStoreSAPDbContext>(options =>
            {
                /* Add custom repositories here. Example:
                 * options.AddRepository<Question, EfCoreQuestionRepository>();
                 */
            });
        }
    }
}