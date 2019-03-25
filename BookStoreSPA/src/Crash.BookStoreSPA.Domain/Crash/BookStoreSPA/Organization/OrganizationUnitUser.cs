using System;
using Volo.Abp;
using Volo.Abp.Domain.Entities;

namespace Crash.BookStoreSPA.Organization
{
    public class OrganizationUnitUser:Entity<long>
    {
        /// <summary>
        /// 组织单元Id
        /// </summary>
        public  virtual  Guid OrganizationId {get; protected set; }

        /// <summary>
        /// 用户Id
        /// </summary>
        public  virtual  Guid IdentityUserId { get; protected set; }

        /// <summary>
        /// Ef使用构造函数
        /// </summary>
        protected OrganizationUnitUser()
        {
        }

        /// <summary>
        /// 只能在该程序集中调用
        /// </summary>
        /// <param name="organizationId"></param>
        /// <param name="identityUserId"></param>
        internal OrganizationUnitUser(Guid organizationId, Guid identityUserId)
        {
            //参数合法检查
            Check.NotNull(organizationId, nameof(OrganizationId));
            Check.NotNull(identityUserId, nameof(IdentityUserId));

            OrganizationId = organizationId;
            IdentityUserId = identityUserId;
        }

    }
}