using System;
using System.Collections.Generic;
using System.Text;

namespace Crash.BookStoreSPA.Organization
{
    /// <summary>
    /// 树形结构
    /// </summary>
   public class OrganizationUnitDto
    {

        public Guid Id { get; set; } 

        public  string Title { get; set; }

        public  List<OrganizationUnitDto> children { get; set; } = new List<OrganizationUnitDto>();
    }
}
