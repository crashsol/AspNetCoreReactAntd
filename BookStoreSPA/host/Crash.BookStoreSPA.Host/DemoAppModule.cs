using System.IO;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Crash.BookStoreSPA.EntityFrameworkCore;
using Crash.BookStoreSPA.Organization;
using Swashbuckle.AspNetCore.Swagger;
using Volo.Abp;
using Volo.Abp.AuditLogging.EntityFrameworkCore;
using Volo.Abp.Autofac;
using Volo.Abp.Data;
using Volo.Abp.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore.SqlServer;
using Volo.Abp.Localization;
using Volo.Abp.Modularity;
using Volo.Abp.PermissionManagement.EntityFrameworkCore;
using Volo.Abp.SettingManagement.EntityFrameworkCore;
using Volo.Abp.VirtualFileSystem;
using Volo.Abp.AspNetCore.Mvc;
using Volo.Abp.EntityFrameworkCore.DependencyInjection;
using Volo.Abp.Identity;
using Volo.Abp.Identity.EntityFrameworkCore;
using Volo.Abp.PermissionManagement;

namespace Crash.BookStoreSPA.Host
{
    [DependsOn(
        typeof(AbpAutofacModule),
        typeof(AbpAspNetCoreMvcModule),
        typeof(BookStoreSPAApplicationModule),
        typeof(BookStoreSPAEntityFrameworkCoreModule),
        typeof(AbpIdentityApplicationModule),
        typeof(AbpPermissionManagementApplicationModule),
        typeof(AbpIdentityEntityFrameworkCoreModule),
        typeof(AbpPermissionManagementEntityFrameworkCoreModule),
        typeof(AbpSettingManagementEntityFrameworkCoreModule),
        typeof(AbpAuditLoggingEntityFrameworkCoreModule),
        typeof(AbpEntityFrameworkCoreSqlServerModule)
        )]
    public class DemoAppModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            var hostingEnvironment = context.Services.GetHostingEnvironment();
            var configuration = context.Services.BuildConfiguration();

            //添加服务自动生成Controllers            
            Configure<AbpAspNetCoreMvcOptions>(options =>
            {
                options.ConventionalControllers
                    .Create(typeof(BookStoreSPAApplicationModule).Assembly, opts =>
                        {
                            //设置是否生成给该Module下的生成动态代理API
                            //opts.TypePredicate = type => { return false; };
                            //设置是自动生成Api路劲
                            // opts.RootPath = "book-store";
                        });
            });

            Configure<DbConnectionOptions>(options =>
             {
                 options.ConnectionStrings.Default = configuration.GetConnectionString("Default");
             });
            Configure<AbpDbContextOptions>(options =>
            {
                options.UseSqlServer();
            });

            if (hostingEnvironment.IsDevelopment())
            {
                Configure<VirtualFileSystemOptions>(options =>
                {
                    options.FileSets.ReplaceEmbeddedByPhysical<BookStoreSPADomainModule>(Path.Combine(hostingEnvironment.ContentRootPath, string.Format("..{0}..{0}src{0}Crash.BookStoreSPA.Domain", Path.DirectorySeparatorChar)));
                    options.FileSets.ReplaceEmbeddedByPhysical<BookStoreSPAApplicationModule>(Path.Combine(hostingEnvironment.ContentRootPath, string.Format("..{0}..{0}src{0}Crash.BookStoreSPA.Application", Path.DirectorySeparatorChar)));
                    options.FileSets.ReplaceEmbeddedByPhysical<BookStoreSPAApplicationContractsModule>(Path.Combine(hostingEnvironment.ContentRootPath, string.Format("..{0}..{0}src{0}Crash.BookStoreSPA.Application.Contracts", Path.DirectorySeparatorChar)));
                });
            }

            ///用于配置生成Swagger documents
            context.Services.AddSwaggerGen(
                options =>
                {
                    options.SwaggerDoc("v1", new Info { Title = "BookStoreSPA API", Version = "v1" });
                    options.DocInclusionPredicate((docName, description) => true);
                    ///使用model的命名空间区分model，(e.g. "RequestModels.Product" & "ResponseModels.Product")
                    //options.CustomSchemaIds(type => type.Name);                   

                    //将enum装换成字符串
                    options.DescribeAllEnumsAsStrings();
                });

            Configure<AbpLocalizationOptions>(options =>
            {
                options.Languages.Add(new LanguageInfo("en", "en", "English"));
                //...add other languages
            });

            // 配置Sap
            context.Services.AddSpaStaticFiles(config =>
             {
                 //设置Sap访问的根目录，与ClientApp bulid文件输出路径一致
                 config.RootPath = "wwwroot/dist";
             });

            /*    context.Services.AddDistributedSqlServerCache(options =>
               {
                   options.ConnectionString = configuration.GetConnectionString("SqlServerCache");
                   options.SchemaName = "dbo";
                   options.TableName = "TestCache";
               });
    */
            /*  context.Services.AddAuthentication("Bearer")
                 .AddIdentityServerAuthentication(options =>
                 {
                     options.Authority = "http://localhost:61517";
                     options.RequireHttpsMetadata = false;

                     options.ApiName = "api1";

                     //TODO: Can we make this by default?
                     options.InboundJwtClaimTypeMap["sub"] = AbpClaimTypes.UserId;
                     options.InboundJwtClaimTypeMap["role"] = AbpClaimTypes.Role;
                     options.InboundJwtClaimTypeMap["email"] = AbpClaimTypes.Email;
                 }); */
        }

        public override void OnApplicationInitialization(ApplicationInitializationContext context)
        {
            var app = context.GetApplicationBuilder();
            app.UseVirtualFiles();


            app.UseCors(option =>
             {
                 option.AllowAnyHeader().AllowAnyMethod()
                 .AllowAnyOrigin()
                 .AllowCredentials();
             });
            //swagger中间件
            app.UseSwagger();
            //swagger UI显示
            app.UseSwaggerUI(options =>
            {
                ///显示方法调用名称
                //options.DisplayOperationId();

                options.SwaggerEndpoint("/swagger/v1/swagger.json", "Support APP API");
            });

            app.UseAuthentication();
            app.UseAbpRequestLocalization();
            app.UseAuditing();

            app.UseMvc();
            //静态文件
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";
                spa.UseProxyToSpaDevelopmentServer("http://localhost:8000");
            });
        }
    }
}
