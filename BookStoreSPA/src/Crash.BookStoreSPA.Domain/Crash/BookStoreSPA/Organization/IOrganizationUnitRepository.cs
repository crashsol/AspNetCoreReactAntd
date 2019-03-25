using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories;

namespace Crash.BookStoreSPA.Organization
{
    /// <summary>
    /// 组织单元管理接口
    /// </summary>
    public interface IOrganizationUnitRepository:IBasicRepository<OrganizationUnit,Guid>
    {
        /// <summary>
        /// 获取单个Organization聚合根
        /// </summary>
        /// <param name="id">主键ID</param>
        /// <param name="includeDetails">是否加载导航属性</param>
        /// <param name="cancellationToken">是否可以取消</param>
        /// <returns></returns>
        Task<OrganizationUnit> GetOrganizationByIdAsync(Guid id, bool includeDetails = true, CancellationToken cancellationToken = default);

    }
}
