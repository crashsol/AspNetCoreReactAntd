using System.Threading.Tasks;
using Volo.Abp.Modularity;
using Xunit;

namespace Crash.BookStoreSAP
{
    public abstract class MyEntityRepository_Tests<TStartupModule> : BookStoreSAPTestBase<TStartupModule>
        where TStartupModule : IAbpModule
    {
        [Fact]
        public async Task Test1()
        {

        }
    }
}
