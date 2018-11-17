using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Lib.Setting;
using Lib.Setting.Model;
using System.Data.SqlClient;
using Lib.CongTacKhac.IDataAccess;
using Lib.CongTacKhac.Model;

namespace Lib.CongTacKhac.DataAccess
{
    public class CongTacKhacDataAccess: ICongTacKhacDataAccess
    {
        public IEnumerable<CongTacKhacModel> DanhSachCongTacKhac()
        {
            List<CongTacKhacModel> list = new List<CongTacKhacModel>();
            try
            {
                list = DBUtils.ExecuteSPList<CongTacKhacModel>("SP_CongTacKhac_DanhSach", null);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return list;
        }
        public CongTacKhacModel ChiTietCongTacKhac(int CongTacKhacID)
        {
            CongTacKhacModel model = null;
            try
            {
                List<SqlParameter> listParameter = new List<SqlParameter>();
                listParameter.Add(new SqlParameter("@CongTacKhacID", CongTacKhacID));
                model = DBUtils.ExecuteSP<CongTacKhacModel>("SP_CongTacKhac_ChiTiet", listParameter);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return model;
        }
        public ResponseResult ThemCongTacKhac(CongTacKhacModel model)
        {
            ResponseResult res = null;
            try
            {
                List<SqlParameter> listParameter = new List<SqlParameter>();
                listParameter.Add(new SqlParameter("@TenCongTac", model.TenCongTac));
                listParameter.Add(new SqlParameter("@SoTiet", model.SoTiet));
                listParameter.Add(new SqlParameter("@NguoiTao", model.NguoiTao));
                res = DBUtils.ExecuteSP<ResponseResult>("SP_CongTacKhac_Them", listParameter);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return res;
        }
        public ResponseResult SuaCongTacKhac(CongTacKhacModel model)
        {
            ResponseResult res = null;
            try
            {
                List<SqlParameter> listParameter = new List<SqlParameter>();
                listParameter.Add(new SqlParameter("@CongTacKhacID", model.CongTacKhacID));
                listParameter.Add(new SqlParameter("@TenCongTac", model.TenCongTac));
                listParameter.Add(new SqlParameter("@SoTiet", model.SoTiet));
                listParameter.Add(new SqlParameter("@NguoiTao", model.NguoiTao));
                res = DBUtils.ExecuteSP<ResponseResult>("SP_CongTacKhac_Sua", listParameter);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return res;
        }
        public ResponseResult XoaCongTacKhac(int id, string NguoiTao)
        {
            ResponseResult res = null;
            try
            {
                List<SqlParameter> listParameter = new List<SqlParameter>();
                listParameter.Add(new SqlParameter("@CongTacKhacID", id));
                listParameter.Add(new SqlParameter("@NguoiTao", NguoiTao));
                res = DBUtils.ExecuteSP<ResponseResult>("SP_CongTacKhac_Xoa", listParameter);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return res;
        }
    }
}
