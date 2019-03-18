using Microsoft.Extensions.DependencyInjection;
using Crash.BookStoreSPA.Localization;
using Volo.Abp.Localization;
using Volo.Abp.Localization.ExceptionHandling;
using Volo.Abp.Modularity;
using Volo.Abp.VirtualFileSystem;

namespace Crash.BookStoreSPA
{
    [DependsOn(
        typeof(BookStoreSPADomainSharedModule)
        )]
    public class BookStoreSPADomainModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            Configure<VirtualFileSystemOptions>(options =>
            {
                options.FileSets.AddEmbedded<BookStoreSPADomainModule>();
            });

            Configure<AbpLocalizationOptions>(options =>
            {
                options.Resources.Get<BookStoreSPAResource>().AddVirtualJson("/Crash/BookStoreSPA/Localization/Domain");
            });

            Configure<ExceptionLocalizationOptions>(options =>
            {
                options.MapCodeNamespace("BookStoreSPA", typeof(BookStoreSPAResource));
            });
        }
    }
}
