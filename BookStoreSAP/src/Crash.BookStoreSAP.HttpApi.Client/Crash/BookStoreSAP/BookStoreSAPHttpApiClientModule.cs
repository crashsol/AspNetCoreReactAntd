using Microsoft.Extensions.DependencyInjection;
using Volo.Abp.Http.Client;
using Volo.Abp.Modularity;

namespace Crash.BookStoreSAP
{
    [DependsOn(
        typeof(BookStoreSAPApplicationContractsModule),
        typeof(AbpHttpClientModule))]
    public class BookStoreSAPHttpApiClientModule : AbpModule
    {
        public const string RemoteServiceName = "BookStoreSAP";

        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            context.Services.AddHttpClientProxies(
                typeof(BookStoreSAPApplicationContractsModule).Assembly,
                RemoteServiceName
            );
        }
    }
}
