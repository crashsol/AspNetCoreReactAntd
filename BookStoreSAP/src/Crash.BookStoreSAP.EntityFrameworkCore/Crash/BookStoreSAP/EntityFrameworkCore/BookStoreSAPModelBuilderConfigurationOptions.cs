using JetBrains.Annotations;
using Volo.Abp.EntityFrameworkCore.Modeling;

namespace Crash.BookStoreSAP.EntityFrameworkCore
{
    public class BookStoreSAPModelBuilderConfigurationOptions : ModelBuilderConfigurationOptions
    {
        public BookStoreSAPModelBuilderConfigurationOptions(
            [NotNull] string tablePrefix = BookStoreSAPConsts.DefaultDbTablePrefix,
            [CanBeNull] string schema = BookStoreSAPConsts.DefaultDbSchema)
            : base(
                tablePrefix,
                schema)
        {

        }
    }
}