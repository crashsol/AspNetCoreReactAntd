using Crash.BookStoreSAP.EntityFrameworkCore;
using Volo.Abp.Modularity;

namespace Crash.BookStoreSAP
{
    [DependsOn(
        typeof(BookStoreSAPEntityFrameworkCoreTestModule)
        )]
    public class BookStoreSAPDomainTestModule : AbpModule
    {
        
    }
}
