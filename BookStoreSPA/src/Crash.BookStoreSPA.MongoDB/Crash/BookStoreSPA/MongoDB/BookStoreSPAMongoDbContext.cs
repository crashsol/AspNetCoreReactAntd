using Volo.Abp.Data;
using Volo.Abp.MongoDB;

namespace Crash.BookStoreSPA.MongoDB
{
    [ConnectionStringName("BookStoreSPA")]
    public class BookStoreSPAMongoDbContext : AbpMongoDbContext, IBookStoreSPAMongoDbContext
    {
        public static string CollectionPrefix { get; set; } = BookStoreSPAConsts.DefaultDbTablePrefix;

        /* Add mongo collections here. Example:
         * public IMongoCollection<Question> Questions => Collection<Question>();
         */

        protected override void CreateModel(IMongoModelBuilder modelBuilder)
        {
            base.CreateModel(modelBuilder);

            modelBuilder.ConfigureBookStoreSPA(options =>
            {
                options.CollectionPrefix = CollectionPrefix;
            });
        }
    }
}