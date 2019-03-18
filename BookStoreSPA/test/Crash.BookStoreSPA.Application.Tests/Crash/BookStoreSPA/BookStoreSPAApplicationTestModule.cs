using Volo.Abp.Modularity;

namespace Crash.BookStoreSPA
{
    [DependsOn(
        typeof(BookStoreSPAApplicationModule),
        typeof(BookStoreSPADomainTestModule)
        )]
    public class BookStoreSPAApplicationTestModule : AbpModule
    {

    }
}
