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
        /// 获取所有部门节点
        /// </summary>
        /// <returns></returns>
        Task<List<OrganizationUnitDto>> GetListAsync();


        /// <summary>
        ///  添加组织节点
        /// </summary>
        /// <param name="dto"><see cref="CreateOrUpdateOrganizationDto"/></param>
        /// <returns></returns>
        Task<OrganizationUnitDto> CreateAsync(CreateOrUpdateOrganizationDto dto);


        /// <summary>
        /// 更组织节点
        /// </summary>
        /// <param name="id">节点id</param>
        /// <param name="dto">删除</param>
        /// <returns></returns>

        Task<OrganizationUnitDto> UpdateAsync(Guid id, CreateOrUpdateOrganizationDto dto);

        /// <summary>
        /// 删除组织节点
        /// </summary>
        /// <param name="id">要删除的节点</param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        Task DeleteAsync(Guid id);

         

    }
}
