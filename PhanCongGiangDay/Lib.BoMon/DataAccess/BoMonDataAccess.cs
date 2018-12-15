using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Lib.Setting;
using Lib.Setting.Model;
using System.Data.SqlClient;
using Lib.BoMon.IDataAccess;
using Lib.BoMon.Model;

namespace Lib.BoMon.DataAccess
{
    public class BoMonDataAccess: IBoMonDataAccess
    {
        public IEnumerable<BoMonModel> DanhSachBoMon()
        {
            List<BoMonModel> list = new List<BoMonModel>();
            try
            {
                list = DBUtils.ExecuteSPList<BoMonModel>("SP_BoMon_DanhSach", null);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return list;
        }
        public BoMonModel ChiTietBoMon(int BoMonID)
        {
            BoMonModel model = null;
            try
            {
                List<SqlParameter> listParameter = new List<SqlParameter>();
                listParameter.Add(new SqlParameter("@BoMonID", BoMonID));
                model = DBUtils.ExecuteSP<BoMonModel>("SP_BoMon_ChiTiet", listParameter);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return model;
        }
        public ResponseResult ThemBoMon(BoMonModel model)
        {
            ResponseResult res = null;
            try
            {
                List<SqlParameter> listParameter = new List<SqlParameter>();
                listParameter.Add(new SqlParameter("@MaBoMon", model.MaBoMon));
                listParameter.Add(new SqlParameter("@TenBoMon", model.TenBoMon));
                listParameter.Add(new SqlParameter("@DonViID", model.DonViID));
                listParameter.Add(new SqlParameter("@NguoiTao", model.NguoiTao));
                res = DBUtils.ExecuteSP<ResponseResult>("SP_BoMon_Them", listParameter);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return res;
        }
        public ResponseResult SuaBoMon(BoMonModel model)
        {
            ResponseResult res = null;
            try
            {
                List<SqlParameter> listParameter = new List<SqlParameter>();
                listParameter.Add(new SqlParameter("@BoMonID", model.BoMonID));
                listParameter.Add(new SqlParameter("@MaBoMon", model.MaBoMon));
                listParameter.Add(new SqlParameter("@TenBoMon", model.TenBoMon));
                listParameter.Add(new SqlParameter("@DonViID", model.DonViID));
                listParameter.Add(new SqlParameter("@NguoiTao", model.NguoiTao));
                res = DBUtils.ExecuteSP<ResponseResult>("SP_BoMon_Sua", listParameter);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return res;
        }
        public ResponseResult XoaBoMon(int id, string NguoiTao)
        {
            ResponseResult res = null;
            try
            {
                List<SqlParameter> listParameter = new List<SqlParameter>();
                listParameter.Add(new SqlParameter("@BoMonID", id));
                listParameter.Add(new SqlParameter("@NguoiTao", NguoiTao));
                res = DBUtils.ExecuteSP<ResponseResult>("SP_BoMon_Xoa", listParameter);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return res;
        }
    }
}
