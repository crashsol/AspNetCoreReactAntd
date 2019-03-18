using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;

namespace Crash.BookStoreSAP.Todos
{
    public interface ITodoAppService
    {
        Task<PagedResultDto<TodoDto>> GetListAsync();
    }
}