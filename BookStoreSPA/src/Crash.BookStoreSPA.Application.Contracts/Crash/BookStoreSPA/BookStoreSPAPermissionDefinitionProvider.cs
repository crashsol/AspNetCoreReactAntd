using Crash.BookStoreSPA.Localization;
using Volo.Abp.Authorization.Permissions;
using Volo.Abp.Localization;

namespace Crash.BookStoreSPA
{
    public class BookStoreSPAPermissionDefinitionProvider : PermissionDefinitionProvider
    {
        public override void Define(IPermissionDefinitionContext context)
        {
            //var moduleGroup = context.AddGroup(BookStoreSPAPermissions.GroupName, L("Permission:BookStoreSPA"));
        }

        private static LocalizableString L(string name)
        {
            return LocalizableString.Create<BookStoreSPAResource>(name);
        }
    }
}