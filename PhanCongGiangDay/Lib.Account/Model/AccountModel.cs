using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Lib.Account.Model
{
    public class AccountModel
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Lv { get; set; } 
        public string SessionKey { get; set; }
        public string ReturnUrl { get; set; }
    }
}
