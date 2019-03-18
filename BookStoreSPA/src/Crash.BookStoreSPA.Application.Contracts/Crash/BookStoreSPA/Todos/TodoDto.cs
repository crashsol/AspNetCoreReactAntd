using System;
using Volo.Abp.Application.Dtos;

namespace Crash.BookStoreSPA.Todos
{
    public class TodoDto : EntityDto<Guid>
    {
        public string Text { get; set; }
    }
}