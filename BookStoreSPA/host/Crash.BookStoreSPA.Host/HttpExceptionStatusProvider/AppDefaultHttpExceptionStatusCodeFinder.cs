using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Volo.Abp;
using Volo.Abp.AspNetCore.Mvc.ExceptionHandling;
using Volo.Abp.Authorization;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Domain.Entities;
using Volo.Abp.ExceptionHandling;
using Volo.Abp.Validation;

namespace Crash.BookStoreSPA.Host.HttpExceptionStatusProvider
{
    /// <summary>
    /// 自定义异常返回状态码
    /// </summary>
    public class AppDefaultHttpExceptionStatusCodeFinder : IHttpExceptionStatusCodeFinder, ITransientDependency
    {
        protected ExceptionHttpStatusCodeOptions Options { get; }

        public AppDefaultHttpExceptionStatusCodeFinder(IOptions<ExceptionHttpStatusCodeOptions> options)
        {
            Options = options.Value;
        }

        public HttpStatusCode GetStatusCode(HttpContext httpContext, Exception exception)
        {
            if (exception is IHasErrorCode exceptionWithErrorCode &&
                !exceptionWithErrorCode.Code.IsNullOrWhiteSpace())
            {
                if (Options.ErrorCodeToHttpStatusCodeMappings.TryGetValue(exceptionWithErrorCode.Code, out var status))
                {
                    return status;
                }
            }

            if (exception is AbpAuthorizationException)
            {
                return httpContext.User.Identity.IsAuthenticated
                    ? HttpStatusCode.Forbidden
                    : HttpStatusCode.Unauthorized;
            }

            //TODO: Handle SecurityException..?

            if (exception is AbpValidationException || exception is IBusinessException)
            {
                return HttpStatusCode.BadRequest;
            }

            if (exception is EntityNotFoundException)
            {
                return HttpStatusCode.NotFound;
            }

            if (exception is NotImplementedException)
            {
                return HttpStatusCode.NotImplemented;
            }
          

            return HttpStatusCode.InternalServerError;
        }
    }
}
