using Volo.Abp;
using Volo.Abp.Modularity;

namespace Crash.BookStoreSAP
{
    public abstract class BookStoreSAPTestBase<TStartupModule> : AbpIntegratedTest<TStartupModule> 
        where TStartupModule : IAbpModule
    {
        protected override void SetAbpApplicationCreationOptions(AbpApplicationCreationOptions options)
        {
            options.UseAutofac();
        }
    }
}
