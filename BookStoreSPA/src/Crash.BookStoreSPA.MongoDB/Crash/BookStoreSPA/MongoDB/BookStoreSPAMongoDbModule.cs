using Microsoft.Extensions.DependencyInjection;
using Volo.Abp.Modularity;
using Volo.Abp.MongoDB;

namespace Crash.BookStoreSPA.MongoDB
{
    [DependsOn(
        typeof(BookStoreSPADomainModule),
        typeof(AbpMongoDbModule)
        )]
    public class BookStoreSPAMongoDbModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            context.Services.AddMongoDbContext<BookStoreSPAMongoDbContext>(options =>
            {
                /* Add custom repositories here. Example:
                 * options.AddRepository<Question, MongoQuestionRepository>();
                 */
            });
        }
    }
}
