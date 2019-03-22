using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Application.Dtos;

namespace Crash.BookStoreSPA.Books
{
    [Serializable]
   public class PageAndStortedAndFilterRequestDto:PagedAndSortedResultRequestDto
    {
        public string Name { get; set; }
    }
}
