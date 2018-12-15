using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Lib.Account.Model;
using Lib.Account.DataAccess;
using Lib.Account.IDataAccess;
using Lib.Setting.Model;
using PhanCongGiangDay.IServices;

namespace PhanCongGiangDay.Services
{
    public class AccountService: IAccountService
    {
        private IAccountDataAccess _AccountDA;
        private IAccountDataAccess AccountDA
        {
            get { return _AccountDA ?? (_AccountDA = new AccountDataAccess()); }
        }

        public AccountModel Login(string username, string password)
        {
            AccountModel model = null;
            try
            {
                model = AccountDA.Login(username, password);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return model;
        }

        public List<AccountModel> ListAccount()
        {
            List<AccountModel> model = null;
            try
            {
                model = AccountDA.ListAccount();
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return model;
        }

        public ResponseResult CreateAccount(AccountModel model)
        {
            ResponseResult res = null;
            try
            {
                res = AccountDA.CreateAccount(model);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return res;
        }
        public ResponseResult EditAccount(AccountModel model)
        {
            ResponseResult res = null;
            try
            {
                res = AccountDA.EditAccount(model);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return res;
        }
        public ResponseResult ChangePassord(string oldPassword, string newPassword)
        {
            ResponseResult res = null;
            try
            {
                res = AccountDA.ChangePassord(oldPassword,newPassword);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return res;
        }
    }
}