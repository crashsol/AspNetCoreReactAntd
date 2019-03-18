using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;

namespace Crash.BookStoreSPA.Todos
{
    public interface ITodoAppService
    {
        Task<PagedResultDto<TodoDto>> GetListAsync();
    }
}