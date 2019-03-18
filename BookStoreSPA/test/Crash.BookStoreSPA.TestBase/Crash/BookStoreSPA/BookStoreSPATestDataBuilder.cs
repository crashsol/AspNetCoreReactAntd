using Volo.Abp.DependencyInjection;
using Volo.Abp.Guids;

namespace Crash.BookStoreSPA
{
    public class BookStoreSPATestDataBuilder : ITransientDependency
    {
        private readonly IGuidGenerator _guidGenerator;
        private BookStoreSPATestData _testData;

        public BookStoreSPATestDataBuilder(
            IGuidGenerator guidGenerator,
            BookStoreSPATestData testData)
        {
            _guidGenerator = guidGenerator;
            _testData = testData;
        }

        public void Build()
        {
            
        }
    }
}