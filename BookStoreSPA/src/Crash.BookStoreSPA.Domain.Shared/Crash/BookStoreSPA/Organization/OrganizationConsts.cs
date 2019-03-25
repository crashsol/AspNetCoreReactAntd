using System;
using System.Collections.Generic;
using System.Text;

namespace Crash.BookStoreSPA.Organization
{
    /// <summary>
    /// 组织单元定义
    /// </summary>
    public static class OrganizationConsts
    {
        /// <summary>
        /// 组织单元名称最大长度
        /// </summary>
        public const int MaxNameLength = 128;


        /// <summary>
        /// 组织单元最大深度
        /// </summary>
        public const int MaxDepth = 16;

        /// <summary>
        /// 组织单元子集Code长度，子集最大99999
        /// </summary>
        public const int CodeUnitLength = 5;

        /// <summary>
        /// 组织单元全路径最大长度
        /// </summary>
        public const int MaxCodeLength = 95;
    }
}
