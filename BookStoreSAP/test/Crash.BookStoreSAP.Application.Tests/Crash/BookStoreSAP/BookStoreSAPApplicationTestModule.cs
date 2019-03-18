using Volo.Abp.Modularity;

namespace Crash.BookStoreSAP
{
    [DependsOn(
        typeof(BookStoreSAPApplicationModule),
        typeof(BookStoreSAPDomainTestModule)
        )]
    public class BookStoreSAPApplicationTestModule : AbpModule
    {

    }
}
