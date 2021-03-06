﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Linq.Dynamic.Core;
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

        #region 组织单元管理

        public async Task<OrganizationDto> CreateAsync(CreateUpdateOrganizationDto dto)
        {
            if (dto.ParentId.HasValue)
            {
                //添加下级节点
                var parent = await _repository.GetAsync(dto.ParentId.Value);
                parent.AddChildrenNode(dto.Title);
                await _repository.UpdateAsync(parent, true);
                return ObjectMapper.Map<OrganizationUnit, OrganizationDto>(parent);
            }
            else
            {
                var rootCount = _repository.Count(b => b.ParentId == null);
                var id = GuidGenerator.Create();
                //添加根节点
                var rootNode = new OrganizationUnit(id, null, dto.Title, rootCount);
                await _repository.InsertAsync(rootNode, true);
                return ObjectMapper.Map<OrganizationUnit, OrganizationDto>(rootNode);
            }
        }

        public async Task DeleteAsync(Guid id)
        {
            var entity = await _repository.GetAsync(id);
            if (entity != null)
            {
                await _repository.DeleteAsync(b=>b.Code.StartsWith(entity.Code), true);
            }
        }

        public async Task<List<OrganizationDto>> GetListAsync()
        {
            var allNodes = await _repository.GetListAsync(true);
            return ObjectMapper.Map<List<OrganizationUnit>, List<OrganizationDto>>(
                allNodes.Where(b => b.ParentId == null).ToList());
        }

        public async Task<OrganizationDto> UpdateAsync(Guid id, CreateUpdateOrganizationDto dto)
        {
            var entity = await _repository.GetAsync(id);
            entity.UpdateTitle(dto.Title);
            await _repository.UpdateAsync(entity, true);
            return ObjectMapper.Map<OrganizationUnit, OrganizationDto>(entity);
        }



        #endregion



    }
}
