using System;
using Crash.BookStoreSPA.Books;
using Crash.BookStoreSPA.Organization;
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

            // 配置Book
            builder.Entity<Book>(a =>
            {               
                a.ToTable(options.TablePrefix + "Books", options.Schema);

                a.Property(b => b.Name).IsRequired().HasMaxLength(128);
                //AuditedAggregateRoot 基类 
                a.ConfigureExtraProperties();

            });

            builder.Entity<OrganizationUnit>(a =>
            {
                a.ToTable(options.TablePrefix + "OrganizationUnits", options.Schema);
                a.Property(b => b.Title).IsRequired().HasMaxLength(OrganizationConsts.MaxNameLength);
                a.Property(b => b.Code).IsRequired().HasMaxLength(OrganizationConsts.MaxCodeLength);
                a.HasMany(b => b.Children)
                    .WithOne(b => b.Parent)
                    .HasForeignKey(b => b.ParentId);
                a.HasMany(b => b.OrganizationUnitUsers).WithOne();
                //AuditedAggregateRoot 基类 
                a.ConfigureExtraProperties();
            });

            builder.Entity<OrganizationUnitUser>(a =>
                {
                    a.ToTable(options.TablePrefix + "OrganizationUnitUser", options.Schema);
                    a.HasIndex(b => new {b.IdentityUserId, b.OrganizationId});
                    a.Property(b => b.IdentityUserId).IsRequired();
                    a.Property(b => b.OrganizationId).IsRequired();
                });
        }
    }
}