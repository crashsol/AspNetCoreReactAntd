using Volo.Abp.AspNetCore.Mvc;
using Volo.Abp.Modularity;

namespace Crash.BookStoreSAP
{
    [DependsOn(
        typeof(BookStoreSAPApplicationContractsModule),
        typeof(AbpAspNetCoreMvcModule))]
    public class BookStoreSAPHttpApiModule : AbpModule
    {
        
    }
}
