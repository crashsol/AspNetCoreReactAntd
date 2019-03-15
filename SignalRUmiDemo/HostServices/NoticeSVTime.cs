using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using SignalRUmiDemo.Hubs;

namespace SignalRUmiDemo.HostServices
{
    /// <summary>
    /// 后台服务，给前段发送服务器时间
    /// </summary>
    public class NoticeSVTime : BackgroundService
    {
        private readonly ILogger<NoticeSVTime> _logger;
        private readonly IHubContext<NoticeHub, INotice> _noticeHub;

        public NoticeSVTime(ILogger<NoticeSVTime> logger,
        IHubContext<NoticeHub, INotice> hub
        )
        {
            _logger = logger;
            _noticeHub = hub;
        }
        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            //每隔3秒发送
            while (!stoppingToken.IsCancellationRequested)
            {

                _logger.LogInformation($"Worker running at: {DateTime.Now}");
                await _noticeHub.Clients.All.ShowTime(DateTime.Now);
                await Task.Delay(5000);

            }
        }
    }
}