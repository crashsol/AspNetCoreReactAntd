using Microsoft.Extensions.DependencyInjection;
using Volo.Abp.AutoMapper;
using Volo.Abp.Modularity;
using Volo.Abp.Settings;

namespace Crash.BookStoreSAP
{
    [DependsOn(
        typeof(BookStoreSAPDomainModule),
        typeof(BookStoreSAPApplicationContractsModule),
        typeof(AbpAutoMapperModule)
        )]
    public class BookStoreSAPApplicationModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            Configure<AbpAutoMapperOptions>(options =>
            {
                options.AddProfile<BookStoreSAPApplicationAutoMapperProfile>(validate: true);
            });

            Configure<SettingOptions>(options =>
            {
                options.DefinitionProviders.Add<BookStoreSAPSettingDefinitionProvider>();
            });
        }
    }
}
