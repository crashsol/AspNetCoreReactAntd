using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Crash.BookStoreSPA.Host.Models
{

    /// <summary>
    /// 登录模型
    /// </summary>
    public class LoginVModel
    {
        [Required]
        [StringLength(255)]
        public string UserNameOrEmailAddress { get; set; }

        [Required]
        [StringLength(32)]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        public bool RememberMe { get; set; }

        public Guid? TenanId { get; set; }
    }

}
