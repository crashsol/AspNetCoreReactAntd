using Crash.BookStoreSPA.EntityFrameworkCore;
using Volo.Abp.Modularity;

namespace Crash.BookStoreSPA
{
    [DependsOn(
        typeof(BookStoreSPAEntityFrameworkCoreTestModule)
        )]
    public class BookStoreSPADomainTestModule : AbpModule
    {
        
    }
}
