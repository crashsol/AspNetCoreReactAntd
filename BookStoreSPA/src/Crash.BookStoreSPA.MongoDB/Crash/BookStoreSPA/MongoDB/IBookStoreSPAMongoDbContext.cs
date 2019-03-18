using Volo.Abp.Data;
using Volo.Abp.MongoDB;

namespace Crash.BookStoreSPA.MongoDB
{
    [ConnectionStringName("BookStoreSPA")]
    public interface IBookStoreSPAMongoDbContext : IAbpMongoDbContext
    {
        /* Define mongo collections here. Example:
         * IMongoCollection<Question> Questions { get; }
         */
    }
}
