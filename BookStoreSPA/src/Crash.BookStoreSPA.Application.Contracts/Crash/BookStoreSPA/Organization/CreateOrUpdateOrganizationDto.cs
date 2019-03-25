using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.Extensions.Primitives;

namespace Crash.BookStoreSPA.Organization
{
    public class CreateOrUpdateOrganizationDto
    {
        public  Guid?  ParentId { get; set; }

        public  string Title { get; set; }

    }
}
