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
                //添加AutoMapperProfile
                //是否开启验证，如果开启验证，有src->dest有字段未映射会报错
                options.AddProfile<BookStoreSPAApplicationAutoMapperProfile>(validate: false);
            });

            Configure<SettingOptions>(options =>
            {
                options.DefinitionProviders.Add<BookStoreSPASettingDefinitionProvider>();
            });
        }
    }
}
