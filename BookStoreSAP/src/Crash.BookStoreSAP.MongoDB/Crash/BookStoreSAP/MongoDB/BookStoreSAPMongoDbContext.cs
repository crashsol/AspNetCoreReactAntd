using Volo.Abp.Data;
using Volo.Abp.MongoDB;

namespace Crash.BookStoreSAP.MongoDB
{
    [ConnectionStringName("BookStoreSAP")]
    public class BookStoreSAPMongoDbContext : AbpMongoDbContext, IBookStoreSAPMongoDbContext
    {
        public static string CollectionPrefix { get; set; } = BookStoreSAPConsts.DefaultDbTablePrefix;

        /* Add mongo collections here. Example:
         * public IMongoCollection<Question> Questions => Collection<Question>();
         */

        protected override void CreateModel(IMongoModelBuilder modelBuilder)
        {
            base.CreateModel(modelBuilder);

            modelBuilder.ConfigureBookStoreSAP(options =>
            {
                options.CollectionPrefix = CollectionPrefix;
            });
        }
    }
}