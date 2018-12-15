using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Lib.Setting;
using Lib.Account.Model;

namespace PhanCongGiangDay.UtilityHelpers
{
    public class AccountUtils
    {
        public static string CurrentUsername()
        {
            var user = Sessions.GetObject<AccountModel>("AccountSessionObject");
            if (user != null)
                return user.UserName;
            else
                return string.Empty;
        }
        public static string CurrentSessionKey()
        {
            var user = Sessions.GetObject<AccountModel>("AccountSessionObject");
            if (user != null)
                return user.SessionKey;
            else
                return string.Empty;
        }
        public static string CurrentUserLv()
        {
            var user = Sessions.GetObject<AccountModel>("AccountSessionObject");
            if (user != null)
                return user.Lv;
            else
                return string.Empty;
        }
    }
}