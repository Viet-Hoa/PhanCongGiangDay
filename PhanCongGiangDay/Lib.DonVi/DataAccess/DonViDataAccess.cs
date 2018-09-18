using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Lib.Setting;
using Lib.Setting.Model;
using System.Data.SqlClient;
using Lib.DonVi.IDataAccess;
using Lib.DonVi.Model;

namespace Lib.DonVi.DataAccess
{
    public class DonViDataAccess: IDonViDataAccess
    {
        public IEnumerable<DonviModel> DanhSachDonvi()
        {
            List<DonviModel> list = new List<DonviModel>();
            try
            {
                list = DBUtils.ExecuteSPList<DonviModel>("SP_DonVi_DanhSach", null);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return list;
        }
        public DonviModel ChiTietDonvi(int DonViID)
        {
            DonviModel model = null;
            try
            {
                List<SqlParameter> listParameter = new List<SqlParameter>();
                listParameter.Add(new SqlParameter("@DonViID", DonViID));
                model = DBUtils.ExecuteSP<DonviModel>("SP_DonVi_ChiTiet", listParameter);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return model;
        }
        public ResponseResult ThemDonvi(DonviModel model)
        {
            ResponseResult res = null;
            try
            {
                List<SqlParameter> listParameter = new List<SqlParameter>();
                listParameter.Add(new SqlParameter("@MaDonVi", model.MaDonVi));
                listParameter.Add(new SqlParameter("@TenDonVi", model.TenDonVi));
                listParameter.Add(new SqlParameter("@NguoiTao", model.NguoiTao));
                res = DBUtils.ExecuteSP<ResponseResult>("SP_DonVi_Them", listParameter);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return res;
        }
        public ResponseResult SuaDonvi(DonviModel model)
        {
            ResponseResult res = null;
            try
            {
                List<SqlParameter> listParameter = new List<SqlParameter>();
                listParameter.Add(new SqlParameter("@DonViID", model.DonViID));
                listParameter.Add(new SqlParameter("@MaDonVi", model.MaDonVi));
                listParameter.Add(new SqlParameter("@TenDonVi", model.TenDonVi));
                listParameter.Add(new SqlParameter("@NguoiTao", model.NguoiTao));
                res = DBUtils.ExecuteSP<ResponseResult>("SP_DonVi_Sua", listParameter);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return res;
        }
        public ResponseResult XoaDonvi(int DonViID, string NguoiTao)
        {
            ResponseResult res = null;
            try
            {
                List<SqlParameter> listParameter = new List<SqlParameter>();
                listParameter.Add(new SqlParameter("@DonViID", DonViID));
                listParameter.Add(new SqlParameter("@NguoiTao", NguoiTao));
                res = DBUtils.ExecuteSP<ResponseResult>("SP_DonVi_Xoa", listParameter);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return res;
        }
    }
}
