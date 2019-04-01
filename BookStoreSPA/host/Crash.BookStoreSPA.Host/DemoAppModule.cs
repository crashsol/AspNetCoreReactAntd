using System;
using System.IO;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Crash.BookStoreSPA.EntityFrameworkCore;
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
using Volo.Abp.Authorization.Permissions;
using Volo.Abp.Identity;
using Volo.Abp.Identity.AspNetCore;
using Volo.Abp.Identity.EntityFrameworkCore;
using Volo.Abp.PermissionManagement;
using Volo.Abp.PermissionManagement.HttpApi;
using Volo.Abp.Threading;
using NSwag.AspNetCore;

namespace Crash.BookStoreSPA.Host
{
    [DependsOn(
        typeof(AbpAutofacModule),
        typeof(AbpAspNetCoreMvcModule),
        // 自动生成代理类
        typeof(BookStoreSPAApplicationModule),

        //获取Identity管理模块API
        typeof(AbpIdentityHttpApiModule),
        //获取权限管理API
        typeof(AbpPermissionManagementHttpApiModule),
        typeof(BookStoreSPAEntityFrameworkCoreModule),
        typeof(AbpIdentityApplicationModule),
        typeof(AbpPermissionManagementApplicationModule),

        // Authencation 相关配置
        typeof(AbpIdentityAspNetCoreModule),

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

            // NSwag 注入
            context.Services.AddSwaggerDocument(doc =>
            {
                doc.DocumentName = "BookStore";
            });

            //配置权限管理的Policy
            Configure<PermissionManagementOptions>(options =>
            {
                // 配置使用Role 设置权限列表（Policy）
                options.ProviderPolicies.Add(RolePermissionValueProvider.ProviderName, IdentityPermissions.Roles.ManagePermissions);

                // 配置使用User 设置权限列表（Policy）
                options.ProviderPolicies.Add(UserPermissionValueProvider.ProviderName, IdentityPermissions.Users.ManagePermissions);
            });

            Configure<AbpLocalizationOptions>(options =>
            {
                //options.Languages.Add(new LanguageInfo("en", "en", "English"));
                //...add other languages
                 options.Languages.Add(new LanguageInfo("zh-CN", "zh-Hans", "简体中文"));
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



            // NSwag
            app.UseSwagger();
            app.UseSwaggerUi3();
          
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            // 启用验证
            app.UseAuthentication();
            app.UseAbpRequestLocalization();
            app.UseAuditing();
            app.UseMvc();

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";
                spa.UseProxyToSpaDevelopmentServer("http://localhost:8000");
            });

            //初始化数据种子数据
            SeedDatabase(context);
        }


        //数据库初始化
        private static void SeedDatabase(ApplicationInitializationContext context)
        {
            using (var scope = context.ServiceProvider.CreateScope())
            {
                AsyncHelper.RunSync(async () =>
                {
                    var identitySeedResult = await scope.ServiceProvider
                        .GetRequiredService<IIdentityDataSeeder>()
                        .SeedAsync(
                            "123qwe!@#QWE"
                        );

                    if (identitySeedResult.CreatedAdminRole)
                    {
                        await scope.ServiceProvider
                            .GetRequiredService<IPermissionDataSeeder>()
                            .SeedAsync(
                                RolePermissionValueProvider.ProviderName,
                                "admin",
                                IdentityPermissions.GetAll()
                            );
                    }
                });
            }
        }
    }
}
