using Microsoft.Extensions.DependencyInjection;
using Volo.Abp.AutoMapper;
using Volo.Abp.Modularity;
using Volo.Abp.Settings;

namespace Crash.BookStoreSPA
{
    [DependsOn(
        typeof(BookStoreSPADomainModule),
        typeof(BookStoreSPAApplicationContractsModule),
        typeof(AbpAutoMapperModule)
        )]
    public class BookStoreSPAApplicationModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            Configure<AbpAutoMapperOptions>(options =>
            {
                options.AddProfile<BookStoreSPAApplicationAutoMapperProfile>(validate: true);
            });

            Configure<SettingOptions>(options =>
            {
                options.DefinitionProviders.Add<BookStoreSPASettingDefinitionProvider>();
            });
        }
    }
}
