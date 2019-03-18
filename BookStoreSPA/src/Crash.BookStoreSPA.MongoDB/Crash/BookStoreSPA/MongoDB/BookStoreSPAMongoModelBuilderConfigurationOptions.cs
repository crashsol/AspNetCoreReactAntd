using JetBrains.Annotations;
using Volo.Abp.MongoDB;

namespace Crash.BookStoreSPA.MongoDB
{
    public class BookStoreSPAMongoModelBuilderConfigurationOptions : MongoModelBuilderConfigurationOptions
    {
        public BookStoreSPAMongoModelBuilderConfigurationOptions(
            [NotNull] string tablePrefix = BookStoreSPAConsts.DefaultDbTablePrefix)
            : base(tablePrefix)
        {
        }
    }
}