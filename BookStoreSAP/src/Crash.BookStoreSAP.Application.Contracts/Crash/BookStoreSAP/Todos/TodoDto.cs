using System;
using Volo.Abp.Application.Dtos;

namespace Crash.BookStoreSAP.Todos
{
    public class TodoDto : EntityDto<Guid>
    {
        public string Text { get; set; }
    }
}