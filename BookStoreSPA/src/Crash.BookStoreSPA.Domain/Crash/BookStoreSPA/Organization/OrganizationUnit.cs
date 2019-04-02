using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using Crash.BookStoreSPA.Organization;
using Volo.Abp;
using Volo.Abp.Domain.Entities;
using Volo.Abp.Guids;

namespace Crash.BookStoreSPA.Organization
{
    public class OrganizationUnit : AggregateRoot<Guid>
    {
        /// <summary>
        /// 组织名称
        /// </summary>
        [MaxLength(OrganizationConsts.MaxNameLength)]
        [Required]
        public virtual string Title { get; protected set; }

        /// <summary>
        /// 组织全路径，同一个Tentant下唯一
        /// </summary>
        [Required]
        [MaxLength(OrganizationConsts.MaxCodeLength)]
        public virtual string Code { get; protected set; }


        /// <summary>
        /// 上级组织
        /// </summary>
        [ForeignKey("ParentId")]
        public virtual OrganizationUnit Parent { get; protected set; }

        public virtual Guid? ParentId { get; protected set; }


        /// <summary>
        /// 组织单元下级
        /// </summary>
        public virtual List<OrganizationUnit> Children { get; protected set; }



        public virtual List<OrganizationUnitUser> OrganizationUnitUsers { get; protected set; }


        /// <summary>
        /// EF使用
        /// </summary>
        protected OrganizationUnit() { }


        public OrganizationUnit(Guid id,Guid? parentId, string title,int code)
        {
            Check.NotNullOrEmpty(title, nameof(title));

            Title = title;
            Code = CreateCode(code);
            ParentId = parentId;
            Children = new List<OrganizationUnit>();
            OrganizationUnitUsers = new List<OrganizationUnitUser>();

        }

        /// <summary>
        /// 添加下级部门
        /// </summary>
        /// <param name="title"></param>
        public void AddChildrenNode(string title)
        {
            Check.NotNullOrEmpty(title, nameof(title));

            if (Children.Any(b => b.Title == title))
            {
                throw new UserFriendlyException($"{title} 已被占用!");

            }

           var node = new OrganizationUnit()
            {
                Title = title ,     //设置名称
                ParentId = this.Id,//父亲节点id
                Code = CaculateCode() //生成唯一的code编码
            };
            this.Children.Add(node);
        }


        public void RemoveChildrenNode(Guid organizationId)
        {
            Check.NotNull(organizationId, nameof(organizationId));
            var node = Children.FirstOrDefault(b => b.Id == organizationId);
            if (node != null)
            {
                Children.Remove(node);
            }
        }


        #region 组织单元用户管理
        /// <summary>
        /// 组织添加添加用户
        /// </summary>
        /// <param name="userId"></param>
        public void AddOrganizationUser(Guid userId)
        {
            Check.NotNull(userId, nameof(userId));

            if (!OrganizationUnitUsers.Any(b => b.IdentityUserId == userId))
            {
                OrganizationUnitUsers.Add(new OrganizationUnitUser(this.Id, userId));
            }
        }

        /// <summary>
        /// 组织单元移除用户
        /// </summary>
        /// <param name="userId"></param>
        public void RemoveOrganizationUser(Guid userId)
        {
            Check.NotNull(userId, nameof(userId));
            var existNode = OrganizationUnitUsers.FirstOrDefault(b => b.IdentityUserId == userId);
            OrganizationUnitUsers.RemoveAll(b => b.IdentityUserId == userId);
        }


        #endregion



        #region 私有方法
        private string CaculateCode()
        {
            //获取父亲节点下级节点的最后一个元素
            var lastNode = Children.LastOrDefault();
            var nextCode = lastNode != null ?
                CreateCode( Convert.ToInt32(GetLastUnitCode(lastNode.Code)) + 1) : CreateCode(1);


            return this.Code + "." + nextCode;

        }


        /// <summary>
        /// 更新Title
        /// </summary>
        /// <param name="title"></param>
        public void UpdateTitle(string title)
        {
            this.Title = title;
        }

        /// <summary>
        /// 创建Code，将整数转换成00005格式
        /// Creates code for given numbers.
        /// Example: if numbers are 4,2 then returns "00004.00002";
        /// </summary>
        /// <param name="numbers">Numbers</param>
        private string CreateCode(params int[] numbers)
        {
            if (((ICollection<int>)numbers).IsNullOrEmpty<int>())
                return (string)null;
            return ((IEnumerable<int>)numbers).Select<int, string>((Func<int, string>)(number => number.ToString(new string('0', 5)))).JoinAsString(".");
        }


        /// <summary>
        /// 获取最后一个节点Code
        /// Gets the last unit code.
        /// Example: if code = "00019.00055.00001" returns "00001".
        /// </summary>
        /// <param name="code">The code.</param>
        private string GetLastUnitCode(string code)
        {
            if (code.IsNullOrEmpty())
                throw new ArgumentNullException(nameof(code), "code can not be null or empty.");
            string[] strArray = code.Split('.');
            return strArray[strArray.Length - 1];
        }

        /// <summary>
        /// 获取父亲节点Code
        ///  Example: if code = "00019.00055.00001" returns "00019.00055".
        /// </summary>
        /// <param name="code"></param>
        /// <returns></returns>
        private string GetParentCode(string code)
        {
            if (code.IsNullOrEmpty())
                throw new ArgumentNullException(nameof(code), "code can not be null or empty.");
            string[] strArray = code.Split('.');
            if (strArray.Length == 1)
                return (string)null;
            return ((IEnumerable<string>)strArray).Take<string>(strArray.Length - 1).JoinAsString(".");
        }



        #endregion


    }
}
