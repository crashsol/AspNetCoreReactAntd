using Volo.Abp.AspNetCore.Mvc;
using Volo.Abp.Modularity;

namespace Crash.BookStoreSPA
{
    [DependsOn(
        typeof(BookStoreSPAApplicationContractsModule),
        typeof(AbpAspNetCoreMvcModule))]
    public class BookStoreSPAHttpApiModule : AbpModule
    {
        
    }
}
