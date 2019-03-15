using Microsoft.AspNetCore.SignalR;
using System;
using System.Threading.Tasks;

namespace SignalRUmiDemo.Hubs
{
    public class NoticeHub : Hub<INotice>
    {

        /// <summary>
        /// 前台发送消息给后台
        /// </summary>
        /// <param name="name">发送消息人</param>
        /// <param name="message">消息内容</param>
        /// <returns></returns>
        public async Task NewMessage(string name, string message)
        {
            await Clients.Others.MessageReceive(name, message);
        }


        public async Task SentTimeToClients(DateTime dateTime)
        {
            await Clients.All.ShowTime(dateTime);
        }


    }
}