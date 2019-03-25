using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Crash.BookStoreSPA.Organization
{
    public interface IOrganizationAppService
    {


        /// <summary>
        ///  添加组织结构
        /// </summary>
        /// <param name="dto"><see cref="CreateOrUpdateOrganizationDto"/></param>
        /// <returns></returns>
        Task<OrganizationUnitDto> AddOrganizationAsync(CreateOrUpdateOrganizationDto dto);


        /// <summary>
        /// 删除节点
        /// </summary>
        /// <param name="parentId">当前节点的上级节点</param>
        /// <param name="id">要删除的节点</param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        Task<OrganizationUnitDto> RemoveOrganization(Guid? parentId, Guid id, CancellationToken cancellationToken);
    }
}
