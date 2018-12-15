using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Lib.Setting.Model;
using Lib.Setting;
using Lib.Account.Model;
using Lib.Account.IDataAccess;
using System.Data.SqlClient;

namespace Lib.Account.DataAccess
{
    public class AccountDataAccess: IAccountDataAccess
    {
        public AccountModel Login(string username,string password)
        {
            AccountModel model = null;
            try
            {
                List<SqlParameter> listParameter = new List<SqlParameter>();
                listParameter.Add(new SqlParameter("@UserName", username));
                listParameter.Add(new SqlParameter("@Pawword", password));
                model = DBUtils.ExecuteSP<AccountModel>("SP_Account_Login", listParameter);
            }
            catch(Exception ex)
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
                model = DBUtils.ExecuteSPList<AccountModel>("SP_Account_List", null);
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
                List<SqlParameter> listParameter = new List<SqlParameter>();
                listParameter.Add(new SqlParameter("@UserName", model.UserName));
                listParameter.Add(new SqlParameter("@Password", model.Password));
                listParameter.Add(new SqlParameter("@Lv", model.Lv));
                res = DBUtils.ExecuteSP<ResponseResult>("SP_Account_Create", listParameter);
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
                List<SqlParameter> listParameter = new List<SqlParameter>();
                listParameter.Add(new SqlParameter("@UserName", model.UserName));
                listParameter.Add(new SqlParameter("@Lv", model.Lv));
                res = DBUtils.ExecuteSP<ResponseResult>("SP_Account_Edit", listParameter);
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
                List<SqlParameter> listParameter = new List<SqlParameter>();
                listParameter.Add(new SqlParameter("@oldPassword", oldPassword));
                listParameter.Add(new SqlParameter("@newPassword", newPassword));
                res = DBUtils.ExecuteSP<ResponseResult>("SP_Account_ChangePassord", listParameter);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return res;
        }

        public ResponseResult CheckSession(string SessionKey)
        {
            ResponseResult res = null;
            try
            {
                List<SqlParameter> listParameter = new List<SqlParameter>();
                listParameter.Add(new SqlParameter("@SessionKey", SessionKey));
                res = DBUtils.ExecuteSP<ResponseResult>("SP_Account_Check_Session", listParameter);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return res;
        }
    }
}
