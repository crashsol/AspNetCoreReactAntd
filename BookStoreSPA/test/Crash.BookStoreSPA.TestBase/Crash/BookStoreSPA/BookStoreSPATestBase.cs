using Volo.Abp;
using Volo.Abp.Modularity;

namespace Crash.BookStoreSPA
{
    public abstract class BookStoreSPATestBase<TStartupModule> : AbpIntegratedTest<TStartupModule> 
        where TStartupModule : IAbpModule
    {
        protected override void SetAbpApplicationCreationOptions(AbpApplicationCreationOptions options)
        {
            options.UseAutofac();
        }
    }
}
