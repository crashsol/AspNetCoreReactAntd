using Volo.Abp.DependencyInjection;
using Volo.Abp.Guids;

namespace Crash.BookStoreSAP
{
    public class BookStoreSAPTestDataBuilder : ITransientDependency
    {
        private readonly IGuidGenerator _guidGenerator;
        private BookStoreSAPTestData _testData;

        public BookStoreSAPTestDataBuilder(
            IGuidGenerator guidGenerator,
            BookStoreSAPTestData testData)
        {
            _guidGenerator = guidGenerator;
            _testData = testData;
        }

        public void Build()
        {
            
        }
    }
}