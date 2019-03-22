using System;
using System.Collections.Generic;
using System.Text;
using JetBrains.Annotations;
using Volo.Abp.Application.Dtos;

namespace Crash.BookStoreSPA.Books
{
    [Serializable]
    public class PageAndStortedAndFilterRequestDto : PagedAndSortedResultRequestDto
    {
        /// <summary>
        /// 通过名称查询
        /// </summary>
        /// <value></value>
        public string Name { get; set; }
        

        /// <summary>
        /// 类型过滤
        /// </summary>
        /// <value></value>
        [CanBeNull]
        public List<BookType> TypeFilters { get; set; }
    }
}
