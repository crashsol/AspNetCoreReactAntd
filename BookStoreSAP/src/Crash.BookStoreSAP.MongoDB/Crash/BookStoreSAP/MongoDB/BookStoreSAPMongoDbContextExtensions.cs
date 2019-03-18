using System;
using Volo.Abp;
using Volo.Abp.MongoDB;

namespace Crash.BookStoreSAP.MongoDB
{
    public static class BookStoreSAPMongoDbContextExtensions
    {
        public static void ConfigureBookStoreSAP(
            this IMongoModelBuilder builder,
            Action<MongoModelBuilderConfigurationOptions> optionsAction = null)
        {
            Check.NotNull(builder, nameof(builder));

            var options = new BookStoreSAPMongoModelBuilderConfigurationOptions();

            optionsAction?.Invoke(options);
        }
    }
}