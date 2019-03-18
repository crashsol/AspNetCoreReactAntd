namespace Crash.BookStoreSPA
{
    public class BookStoreSPAPermissions
    {
        public const string GroupName = "BookStoreSPA";

        public static string[] GetAll()
        {
            return new[]
            {
                GroupName
            };
        }
    }
}