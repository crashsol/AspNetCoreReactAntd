using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using Microsoft.Extensions.Primitives;

namespace Crash.BookStoreSPA.Organization
{
    public class CreateOrUpdateOrganizationDto
    {
        public  Guid?  ParentId { get; set; }


        [Required]
        [MaxLength(OrganizationConsts.MaxNameLength)]
        public  string Title { get; set; }

    }
}
