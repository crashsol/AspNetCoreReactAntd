using Crash.BookStoreSAP.Localization;
using Volo.Abp.Authorization.Permissions;
using Volo.Abp.Localization;

namespace Crash.BookStoreSAP
{
    public class BookStoreSAPPermissionDefinitionProvider : PermissionDefinitionProvider
    {
        public override void Define(IPermissionDefinitionContext context)
        {
            //var moduleGroup = context.AddGroup(BookStoreSAPPermissions.GroupName, L("Permission:BookStoreSAP"));
        }

        private static LocalizableString L(string name)
        {
            return LocalizableString.Create<BookStoreSAPResource>(name);
        }
    }
}