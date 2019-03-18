using System;
using Volo.Abp;
using Volo.Abp.MongoDB;

namespace Crash.BookStoreSPA.MongoDB
{
    public static class BookStoreSPAMongoDbContextExtensions
    {
        public static void ConfigureBookStoreSPA(
            this IMongoModelBuilder builder,
            Action<MongoModelBuilderConfigurationOptions> optionsAction = null)
        {
            Check.NotNull(builder, nameof(builder));

            var options = new BookStoreSPAMongoModelBuilderConfigurationOptions();

            optionsAction?.Invoke(options);
        }
    }
}