using Volo.Abp.Data;
using Volo.Abp.MongoDB;

namespace Crash.BookStoreSAP.MongoDB
{
    [ConnectionStringName("BookStoreSAP")]
    public interface IBookStoreSAPMongoDbContext : IAbpMongoDbContext
    {
        /* Define mongo collections here. Example:
         * IMongoCollection<Question> Questions { get; }
         */
    }
}
