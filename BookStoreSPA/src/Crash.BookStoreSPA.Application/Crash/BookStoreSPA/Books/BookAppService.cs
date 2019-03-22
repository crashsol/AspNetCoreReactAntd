using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace Crash.BookStoreSPA.Books
{

    public class BookAppService : AsyncCrudAppService<Book, BookDto,
        Guid, PageAndStortedAndFilterRequestDto, CreateUpdateBookDto, CreateUpdateBookDto>, IBookAppService
    {
        public BookAppService(IRepository<Book, Guid> repository) : base(repository)
        {

        }


        /// <summary>
        /// 重写基类信息过滤,添加自定义条件过滤
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        protected override IQueryable<Book> CreateFilteredQuery(PageAndStortedAndFilterRequestDto input)
        {
            if (!string.IsNullOrEmpty(input.Name))
            {
                return Repository.Where(b => b.Name.Contains(input.Name));
            }
            return Repository;

        }

    }
}
