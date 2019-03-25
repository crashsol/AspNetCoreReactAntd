using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Crash.BookStoreSPA.Organization;
using Microsoft.EntityFrameworkCore;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;

namespace Crash.BookStoreSPA.EntityFrameworkCore
{
   public class EfCoreOrganizationUnitRepository: EfCoreRepository<BookStoreSPADbContext, OrganizationUnit,Guid>,IOrganizationUnitRepository
    {
        public EfCoreOrganizationUnitRepository(IDbContextProvider<BookStoreSPADbContext> dbContextProvider)
            : base(dbContextProvider)
        {
        }

        public async Task<OrganizationUnit> GetOrganizationByIdAsync(Guid id, bool includeDetails = true, CancellationToken cancellationToken = default)
        {
           
            return await DbSet
                .Include(b=> b.Children)
                .Include(b=>b.OrganizationUnitUsers)
                .FirstOrDefaultAsync(
                    u => u.Id == id,
                    GetCancellationToken(cancellationToken)
                );
        }
    }
}
