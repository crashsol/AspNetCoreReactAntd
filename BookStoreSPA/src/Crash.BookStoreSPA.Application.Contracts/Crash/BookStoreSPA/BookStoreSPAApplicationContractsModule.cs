using Microsoft.Extensions.DependencyInjection;
using Crash.BookStoreSPA.Localization;
using Volo.Abp.Application;
using Volo.Abp.Authorization.Permissions;
using Volo.Abp.Localization;
using Volo.Abp.Modularity;
using Volo.Abp.VirtualFileSystem;

namespace Crash.BookStoreSPA
{
    [DependsOn(
        typeof(BookStoreSPADomainSharedModule),
        typeof(AbpDddApplicationModule)
        )]
    public class BookStoreSPAApplicationContractsModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            Configure<PermissionOptions>(options =>
            {
                options.DefinitionProviders.Add<BookStoreSPAPermissionDefinitionProvider>();
            });

            Configure<VirtualFileSystemOptions>(options =>
            {
                options.FileSets.AddEmbedded<BookStoreSPAApplicationContractsModule>();
            });

            Configure<AbpLocalizationOptions>(options =>
            {
                options.Resources
                    .Get<BookStoreSPAResource>()
                    .AddVirtualJson("/Crash/BookStoreSPA/Localization/ApplicationContracts");
            });
        }
    }
}
