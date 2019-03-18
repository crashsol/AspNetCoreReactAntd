using Microsoft.Extensions.DependencyInjection;
using Crash.BookStoreSAP.Localization;
using Volo.Abp.Application;
using Volo.Abp.Authorization.Permissions;
using Volo.Abp.Localization;
using Volo.Abp.Modularity;
using Volo.Abp.VirtualFileSystem;

namespace Crash.BookStoreSAP
{
    [DependsOn(
        typeof(BookStoreSAPDomainSharedModule),
        typeof(AbpDddApplicationModule)
        )]
    public class BookStoreSAPApplicationContractsModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            Configure<PermissionOptions>(options =>
            {
                options.DefinitionProviders.Add<BookStoreSAPPermissionDefinitionProvider>();
            });

            Configure<VirtualFileSystemOptions>(options =>
            {
                options.FileSets.AddEmbedded<BookStoreSAPApplicationContractsModule>();
            });

            Configure<AbpLocalizationOptions>(options =>
            {
                options.Resources
                    .Get<BookStoreSAPResource>()
                    .AddVirtualJson("/Crash/BookStoreSAP/Localization/ApplicationContracts");
            });
        }
    }
}
