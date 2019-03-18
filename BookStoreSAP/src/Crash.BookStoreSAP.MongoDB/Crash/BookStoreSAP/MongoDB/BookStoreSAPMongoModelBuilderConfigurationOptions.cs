using JetBrains.Annotations;
using Volo.Abp.MongoDB;

namespace Crash.BookStoreSAP.MongoDB
{
    public class BookStoreSAPMongoModelBuilderConfigurationOptions : MongoModelBuilderConfigurationOptions
    {
        public BookStoreSAPMongoModelBuilderConfigurationOptions(
            [NotNull] string tablePrefix = BookStoreSAPConsts.DefaultDbTablePrefix)
            : base(tablePrefix)
        {
        }
    }
}