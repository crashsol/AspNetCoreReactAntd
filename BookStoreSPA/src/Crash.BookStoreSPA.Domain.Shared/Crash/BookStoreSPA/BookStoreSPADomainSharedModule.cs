using Microsoft.Extensions.DependencyInjection;
using Volo.Abp.Modularity;
using Volo.Abp.Localization;
using Crash.BookStoreSPA.Localization;

namespace Crash.BookStoreSPA
{
    [DependsOn(
        typeof(AbpLocalizationModule)
        )]
    public class BookStoreSPADomainSharedModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            Configure<AbpLocalizationOptions>(options =>
            {
                options.Resources.Add<BookStoreSPAResource>("en");
            });
        }
    }
}
