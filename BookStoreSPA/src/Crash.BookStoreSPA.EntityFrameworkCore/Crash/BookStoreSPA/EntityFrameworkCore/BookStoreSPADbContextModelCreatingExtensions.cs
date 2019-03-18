using System;
using Crash.BookStoreSPA.Books;
using Microsoft.EntityFrameworkCore;
using Volo.Abp;
using Volo.Abp.EntityFrameworkCore.Modeling;

namespace Crash.BookStoreSPA.EntityFrameworkCore
{
    public static class BookStoreSPADbContextModelCreatingExtensions
    {
        public static void ConfigureBookStoreSPA(
            this ModelBuilder builder,
            Action<BookStoreSPAModelBuilderConfigurationOptions> optionsAction = null)
        {
            Check.NotNull(builder, nameof(builder));

            var options = new BookStoreSPAModelBuilderConfigurationOptions();

            optionsAction?.Invoke(options);

            ///* Configure all entities here. Example:*/
            builder.Entity<Book>(a =>
            {               
                a.ToTable(options.TablePrefix + "Books", options.Schema);

                a.Property(b => b.Name).IsRequired().HasMaxLength(128);
                //AuditedAggregateRoot 基类 
                a.ConfigureExtraProperties();

            });
        }
    }
}