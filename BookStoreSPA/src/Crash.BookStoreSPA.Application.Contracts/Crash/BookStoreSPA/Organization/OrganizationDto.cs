using System;
using System.Collections.Generic;
using System.Text;

namespace Crash.BookStoreSPA.Organization
{
    /// <summary>
    /// 树形结构
    /// </summary>
   public class OrganizationDto
    {

        public Guid Key { get; set; } 

        public  string Title { get; set; }

        public  List<OrganizationDto> children { get; set; } = new List<OrganizationDto>();
    }
}
