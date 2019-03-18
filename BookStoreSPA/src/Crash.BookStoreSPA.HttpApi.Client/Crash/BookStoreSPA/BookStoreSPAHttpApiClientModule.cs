using Microsoft.Extensions.DependencyInjection;
using Volo.Abp.Http.Client;
using Volo.Abp.Modularity;

namespace Crash.BookStoreSPA
{
    [DependsOn(
        typeof(BookStoreSPAApplicationContractsModule),
        typeof(AbpHttpClientModule))]
    public class BookStoreSPAHttpApiClientModule : AbpModule
    {
        public const string RemoteServiceName = "BookStoreSPA";

        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            context.Services.AddHttpClientProxies(
                typeof(BookStoreSPAApplicationContractsModule).Assembly,
                RemoteServiceName
            );
        }
    }
}
