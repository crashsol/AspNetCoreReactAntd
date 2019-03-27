using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Crash.BookStoreSPA.Host.Models
{
    public enum LoginResultType : byte
    {
        Success = 1,

        InvalidUserNameOrPassword = 2,

        NotAllowed = 3,

        LockedOut = 4,

        RequiresTwoFactor = 5
    }
}
