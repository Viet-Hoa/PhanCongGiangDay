using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Lib.Setting;
using Lib.Setting.Model;
using System.Data.SqlClient;
using Lib.NamHoc.IDataAccess;
using Lib.NamHoc.Model;

namespace Lib.NamHoc.DataAccess
{
    public class NamHocDataAccess: INamHocDataAccess
    {
        public IEnumerable<NamHocModel> DanhSachNamHoc()
        {
            List<NamHocModel> list = new List<NamHocModel>();
            try
            {
                list = DBUtils.ExecuteSPList<NamHocModel>("SP_BangPhanCong_DanhSach", null);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return list;
        }
        public NamHocModel ChiTietNamHoc(int BangPhanCongID)
        {
            NamHocModel model = null;
            try
            {
                List<SqlParameter> listParameter = new List<SqlParameter>();
                listParameter.Add(new SqlParameter("@BangPhanCongID", BangPhanCongID));
                model = DBUtils.ExecuteSP<NamHocModel>("SP_BangPhanCong_ChiTiet", listParameter);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return model;
        }
        public ResponseResult ThemNamHoc(NamHocModel model)
        {
            ResponseResult res = null;
            try
            {
                List<SqlParameter> listParameter = new List<SqlParameter>();
                listParameter.Add(new SqlParameter("@NamHoc", model.NamHoc));
                listParameter.Add(new SqlParameter("@NguoiTao", model.NguoiTao));
                res = DBUtils.ExecuteSP<ResponseResult>("SP_BangPhanCong_Them", listParameter);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return res;
        }
        public ResponseResult SuaNamHoc(NamHocModel model)
        {
            ResponseResult res = null;
            try
            {
                List<SqlParameter> listParameter = new List<SqlParameter>();
                listParameter.Add(new SqlParameter("@BangPhanCongID", model.BangPhanCongID));
                listParameter.Add(new SqlParameter("@NamHoc", model.NamHoc));
                listParameter.Add(new SqlParameter("@NguoiTao", model.NguoiTao));
                res = DBUtils.ExecuteSP<ResponseResult>("SP_BangPhanCong_Sua", listParameter);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return res;
        }
    }
}
