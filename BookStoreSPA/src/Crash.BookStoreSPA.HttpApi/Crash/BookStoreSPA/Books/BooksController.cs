using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp;
using Volo.Abp.Application.Dtos;
using Volo.Abp.AspNetCore.Mvc;

namespace Crash.BookStoreSPA.Books
{
    /// <summary>
    /// RemoveService 用于生成 Swagger API相关文档
    /// </summary>
    [RemoteService]
    [Area("BookStoreSPA")]
    [Route("api/BookStoreSPA/books")]
    //[Authorize] 是否启用认证
    public class BooksController : AbpController, IBookAppService
    {
        private readonly IBookAppService _bookAppService;

        public BooksController(IBookAppService bookAppService)
        {
            _bookAppService = bookAppService;
        }

        [HttpPost("create")]
        public async Task<BookDto> CreateAsync(CreateUpdateBookDto input)
        {
            return await _bookAppService.CreateAsync(input);
        }

        [HttpDelete("delete/{id}")]
        public  Task DeleteAsync(Guid id)
        {

            return _bookAppService.DeleteAsync(id);
        }

        [HttpGet("book/{id}")]
        public async Task<BookDto> GetAsync(Guid id)
        {
            return await _bookAppService.GetAsync(id);
        }

        [HttpGet("")]
        public async Task<PagedResultDto<BookDto>> GetListAsync(PagedAndSortedResultRequestDto input)
        {
           return await _bookAppService.GetListAsync(input);
        }

        [HttpPost("update/{id}")]
        public async Task<BookDto> UpdateAsync(Guid id, CreateUpdateBookDto input)
        {
            return await _bookAppService.UpdateAsync(id, input);
        }
    }
}
