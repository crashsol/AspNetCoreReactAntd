using Microsoft.Extensions.DependencyInjection;
using Crash.BookStoreSAP.Localization;
using Volo.Abp.Localization;
using Volo.Abp.Localization.ExceptionHandling;
using Volo.Abp.Modularity;
using Volo.Abp.VirtualFileSystem;

namespace Crash.BookStoreSAP
{
    [DependsOn(
        typeof(BookStoreSAPDomainSharedModule)
        )]
    public class BookStoreSAPDomainModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            Configure<VirtualFileSystemOptions>(options =>
            {
                options.FileSets.AddEmbedded<BookStoreSAPDomainModule>();
            });

            Configure<AbpLocalizationOptions>(options =>
            {
                options.Resources.Get<BookStoreSAPResource>().AddVirtualJson("/Crash/BookStoreSAP/Localization/Domain");
            });

            Configure<ExceptionLocalizationOptions>(options =>
            {
                options.MapCodeNamespace("BookStoreSAP", typeof(BookStoreSAPResource));
            });
        }
    }
}
