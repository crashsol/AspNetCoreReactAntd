using Microsoft.Extensions.DependencyInjection;
using Volo.Abp.Modularity;
using Volo.Abp.MongoDB;

namespace Crash.BookStoreSAP.MongoDB
{
    [DependsOn(
        typeof(BookStoreSAPDomainModule),
        typeof(AbpMongoDbModule)
        )]
    public class BookStoreSAPMongoDbModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            context.Services.AddMongoDbContext<BookStoreSAPMongoDbContext>(options =>
            {
                /* Add custom repositories here. Example:
                 * options.AddRepository<Question, MongoQuestionRepository>();
                 */
            });
        }
    }
}
