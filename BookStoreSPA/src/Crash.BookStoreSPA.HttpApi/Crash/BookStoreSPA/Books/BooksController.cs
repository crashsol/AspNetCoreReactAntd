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
    [RemoteService]
    //[Area("BookStoreSPA")]
    [Route("api/app/books")]
    //[Authorize] 是否启用认证
    public class BooksController : AbpController, IBookAppService
    {
        private readonly IBookAppService _bookAppService;

        public BooksController(IBookAppService bookAppService)
        {
            _bookAppService = bookAppService;
        }

        [HttpPost]
        public async Task<BookDto> CreateAsync(CreateUpdateBookDto input)
        {
            return await _bookAppService.CreateAsync(input);
        }

        [HttpDelete("{id}")]
        public Task DeleteAsync(Guid id)
        {

            return _bookAppService.DeleteAsync(id);
        }

        [HttpGet("{id}")]
        public async Task<BookDto> GetAsync(Guid id)
        {
            return await _bookAppService.GetAsync(id);
        }

        [HttpGet("list")]
        public async Task<PagedResultDto<BookDto>> GetListAsync(PagedAndSortedResultRequestDto input)
        {
            return await _bookAppService.GetListAsync(input);
        }

        [HttpPut("{id}")]
        public async Task<BookDto> UpdateAsync(Guid id, CreateUpdateBookDto input)
        {
            return await _bookAppService.UpdateAsync(id, input);
        }
    }
}
