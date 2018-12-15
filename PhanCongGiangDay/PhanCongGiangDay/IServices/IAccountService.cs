using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Lib.Account.Model;
using Lib.Setting.Model;
namespace PhanCongGiangDay.IServices
{
    public interface IAccountService
    {
        AccountModel Login(string username, string password);
        List<AccountModel> ListAccount();
        ResponseResult CreateAccount(AccountModel model);
        ResponseResult EditAccount(AccountModel model);
        ResponseResult ChangePassord(string oldPassword, string newPassword);
    }
}
