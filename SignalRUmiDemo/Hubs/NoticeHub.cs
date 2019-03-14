using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace SignalRUmiDemo.Hubs
{
    public class NoticeHub : Hub
    {

        /// <summary>
        /// 前台发送消息给后台
        /// </summary>
        /// <param name="name">发送消息人</param>
        /// <param name="message">消息内容</param>
        /// <returns></returns>
        public async Task NewMessage(string name, string message)
        {
            await Clients.Others.SendAsync("MessageReceive", arg1: name, arg2: message);
        }

    }
}