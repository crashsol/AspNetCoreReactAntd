using System;
using System.Threading.Tasks;

namespace SignalRUmiDemo.Hubs
{
    public interface INotice
    {
        /// <summary>
        /// 发送服务器时间
        /// </summary>
        /// <param name="currentTime">服务器时间</param>
        /// <returns></returns>
        Task ShowTime(DateTime currentTime);


        /// <summary>
        /// 接受用户消息，并转发给其他用用户
        /// </summary>
        /// <param name="name">消息发送人</param>
        /// <param name="message">消息内容</param>
        /// <returns></returns>
        Task MessageReceive(string name, string message);
    }
}