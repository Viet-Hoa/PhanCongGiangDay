using System.Web;

namespace Lib.Setting
{ 
    public class Sessions
    {
        public static string GetMessage(string pKey)
        {
            return Protect.ToString(HttpContext.Current.Session[pKey]);
        }
        public static void AddMessage(string pKey, string pMessage)
        {
            string currentMessage = Protect.ToString(HttpContext.Current.Session[pKey]);
            if (currentMessage != string.Empty)
            {
                currentMessage += "<br/>" + pMessage;
            }
            else
            {
                currentMessage = pMessage;
            }
            HttpContext.Current.Session[pKey.ToString()] = currentMessage;
        }
        public static void AddObject<T>(string pKey, T obj) where T : new()
        {
            HttpContext.Current.Session[pKey.ToString()] = obj;
        }

        public static void AddObjectWithStringKey<T>(string pKey, T obj) where T : new()
        {
            HttpContext.Current.Session[pKey.ToString()] = obj;
        }
        
        public static T GetObject<T>(string pKey) where T : new()
        {
            return (T)(HttpContext.Current.Session[pKey.ToString()]);
        }

        public static void UpdateMessage(string pKey, string pMessage)
        {
            HttpContext.Current.Session[pKey.ToString()] = pMessage;
        }

        public static void ClearMessage(string pKey)
        {
            HttpContext.Current.Session[pKey.ToString()] = string.Empty;
        }

        /// <summary>
        /// Clear all data in session satte
        /// </summary>
        public static void ClearMessage()
        {
            HttpContext.Current.Session.Clear();
        }

        public static void Remove(string pKey)
        {
            HttpContext.Current.Session.Remove(pKey.ToString());
        }

        /// <summary>
        /// Removes all keys and values in session state
        /// </summary>
        public static void Remove()
        {
            HttpContext.Current.Session.RemoveAll();
        }
    }
}
