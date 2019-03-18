using JetBrains.Annotations;
using Volo.Abp.EntityFrameworkCore.Modeling;

namespace Crash.BookStoreSPA.EntityFrameworkCore
{
    public class BookStoreSPAModelBuilderConfigurationOptions : ModelBuilderConfigurationOptions
    {
        public BookStoreSPAModelBuilderConfigurationOptions(
            [NotNull] string tablePrefix = BookStoreSPAConsts.DefaultDbTablePrefix,
            [CanBeNull] string schema = BookStoreSPAConsts.DefaultDbSchema)
            : base(
                tablePrefix,
                schema)
        {

        }
    }
}