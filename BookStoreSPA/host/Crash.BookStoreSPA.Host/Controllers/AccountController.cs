using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Crash.BookStoreSPA.Host.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Volo.Abp;
using Volo.Abp.AspNetCore.Mvc;
using Volo.Abp.Identity;
using IdentityUser = Volo.Abp.Identity.IdentityUser;
using SignInResult = Microsoft.AspNetCore.Identity.SignInResult;

namespace Crash.BookStoreSPA.Host.Controllers
{
    [RemoteService]
    [Route("api/account")]
    [Controller]
    [Area("Login")]
    public class AccountController : AbpController
    {
        private readonly SignInManager<IdentityUser> _singInManager;
        private readonly IdentityUserManager _identityUserManager;

        public AccountController(SignInManager<IdentityUser> singInManager,
            IdentityUserManager identityUserManager)
        {
            _singInManager = singInManager;
            _identityUserManager = identityUserManager;
        }

        /// <summary>
        /// 用户登录
        /// </summary>
        /// <param name="login"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("login")]
        public  async Task<AbpLoginResult> Login(LoginVModel login)
        {
            ValidateLoginInfo(login);

            return GetAbpLoginResult(await _singInManager.PasswordSignInAsync(
                login.UserNameOrEmailAddress,
                login.Password,
                login.RememberMe,
                true
            ));
        }

        /// <summary>
        /// 退出登录
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("logout")]
        public async Task<IActionResult> Logout()
        {
            await _singInManager.SignOutAsync();
            return Ok();
        }


        [HttpPost]
        [Route("checkPassword")]
        public  async Task<AbpLoginResult> CheckPassword(LoginVModel login)
        {
            ValidateLoginInfo(login);
            var identityUser = await _identityUserManager.FindByNameAsync(login.UserNameOrEmailAddress);

            if (identityUser == null)
            {
                return new AbpLoginResult(LoginResultType.InvalidUserNameOrPassword);
            }
            return GetAbpLoginResult(await _singInManager.CheckPasswordSignInAsync(identityUser, login.Password,true));
        }

        private static AbpLoginResult GetAbpLoginResult(SignInResult result)
        {
            if (result.IsLockedOut)
            {
                return new AbpLoginResult(LoginResultType.LockedOut);
            }

            if (result.RequiresTwoFactor)
            {
                return new AbpLoginResult(LoginResultType.RequiresTwoFactor);
            }

            if (result.IsNotAllowed)
            {
                return new AbpLoginResult(LoginResultType.NotAllowed);
            }

            if (!result.Succeeded)
            {
                return new AbpLoginResult(LoginResultType.InvalidUserNameOrPassword);
            }

            return new AbpLoginResult(LoginResultType.Success);
        }

        private void ValidateLoginInfo(LoginVModel login)
        {
            if (login == null)
            {
                throw new ArgumentException(nameof(login));
            }

            if (login.UserNameOrEmailAddress.IsNullOrEmpty())
            {
                throw new ArgumentNullException(nameof(login.UserNameOrEmailAddress));
            }

            if (login.Password.IsNullOrEmpty())
            {
                throw new ArgumentNullException(nameof(login.Password));
            }
        }
    }
}