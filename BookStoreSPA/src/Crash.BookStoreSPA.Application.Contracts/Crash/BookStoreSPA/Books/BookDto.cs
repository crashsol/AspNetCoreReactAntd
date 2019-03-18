using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Application.Dtos;

namespace Crash.BookStoreSPA.Books
{
    /// <summary>
    /// 展示Book Dto
    /// </summary>
    public class BookDto:AuditedEntityDto<Guid>
    {

        public string Name { get; set; }

        public BookType Type { get; set; }

        public DateTime PublishDate { get; set; }

        public float Price { get; set; }
    }
}
