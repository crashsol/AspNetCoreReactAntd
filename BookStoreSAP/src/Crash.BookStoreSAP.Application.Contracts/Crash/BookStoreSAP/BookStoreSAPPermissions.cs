namespace Crash.BookStoreSAP
{
    public class BookStoreSAPPermissions
    {
        public const string GroupName = "BookStoreSAP";

        public static string[] GetAll()
        {
            return new[]
            {
                GroupName
            };
        }
    }
}