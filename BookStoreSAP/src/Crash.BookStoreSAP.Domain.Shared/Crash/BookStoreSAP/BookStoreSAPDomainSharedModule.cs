using Microsoft.Extensions.DependencyInjection;
using Volo.Abp.Modularity;
using Volo.Abp.Localization;
using Crash.BookStoreSAP.Localization;

namespace Crash.BookStoreSAP
{
    [DependsOn(
        typeof(AbpLocalizationModule)
        )]
    public class BookStoreSAPDomainSharedModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            Configure<AbpLocalizationOptions>(options =>
            {
                options.Resources.Add<BookStoreSAPResource>("en");
            });
        }
    }
}
