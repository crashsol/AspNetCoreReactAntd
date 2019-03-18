using System.Threading.Tasks;
using Volo.Abp.Modularity;
using Xunit;

namespace Crash.BookStoreSPA
{
    public abstract class MyEntityRepository_Tests<TStartupModule> : BookStoreSPATestBase<TStartupModule>
        where TStartupModule : IAbpModule
    {
        [Fact]
        public async Task Test1()
        {

        }
    }
}
