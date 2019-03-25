using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Crash.BookStoreSPA.Organization;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace Crash.BookStoreSPA.Organization
{
    public class OrganizationAppService : ApplicationService, IOrganizationAppService
    {
        private readonly IRepository<OrganizationUnit, Guid> _repository;

        public OrganizationAppService(IRepository<OrganizationUnit, Guid> repository)
        {
            this._repository = repository;
        }

        public async Task<OrganizationUnitDto> AddOrganizationAsync(CreateOrUpdateOrganizationDto dto)
        {
            if (dto.ParentId.HasValue)
            {
                //添加下级节点
                var parent = await _repository.GetAsync(dto.ParentId.Value, true);
                parent.AddChildrenNode(dto.Title);
                await CurrentUnitOfWork.SaveChangesAsync();
                return ObjectMapper.Map<OrganizationUnit, OrganizationUnitDto>(parent);
            }
            else
            {
                var id = GuidGenerator.Create();
                //添加根节点
                var rootNode = new OrganizationUnit(id, null, dto.Title, "00001");
                await _repository.InsertAsync(rootNode);
                await CurrentUnitOfWork.SaveChangesAsync();
                return ObjectMapper.Map<OrganizationUnit, OrganizationUnitDto>(rootNode);
            }
        }

        public Task<OrganizationUnitDto> RemoveOrganization(Guid? parentId, Guid id, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
