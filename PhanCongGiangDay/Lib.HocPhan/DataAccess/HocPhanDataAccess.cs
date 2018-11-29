using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Lib.Setting;
using Lib.Setting.Model;
using System.Data.SqlClient;
using Lib.HocPhan.IDataAccess;
using Lib.HocPhan.Model;

namespace Lib.HocPhan.DataAccess
{
    public class HocPhanDataAccess: IHocPhanDataAccess
    {
        public IEnumerable<HocPhanModel> DanhSachHocPhan()
        {
            List<HocPhanModel> list = new List<HocPhanModel>();
            try
            {
                list = DBUtils.ExecuteSPList<HocPhanModel>("SP_HocPhan_DanhSach", null);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return list;
        }
        public IEnumerable<HocPhanModel> DanhSachHocPhanTheoCTDT(int CTDTID)
        {
            List<HocPhanModel> list = new List<HocPhanModel>();
            try
            {
                List<SqlParameter> listParameter = new List<SqlParameter>();
                listParameter.Add(new SqlParameter("@CTDTID", CTDTID));
                list = DBUtils.ExecuteSPList<HocPhanModel>("SP_HocPhan_DanhSach_Theo_CTDT", listParameter);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return list;
        }
        public IEnumerable<HocPhanModel> DanhSachHocPhanTheoKhoa(int? KhoaID)
        {
            List<HocPhanModel> list = new List<HocPhanModel>();
            try
            {
                List<SqlParameter> listParameter = new List<SqlParameter>();
                listParameter.Add(new SqlParameter("@KhoaID", KhoaID));
                list = DBUtils.ExecuteSPList<HocPhanModel>("SP_HocPhan_DanhSach_Theo_Khoa", listParameter);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return list;
        }
        public IEnumerable<HocPhanModel> DanhSachHocPhanTheoBoMon(int BoMonID)
        {
            List<HocPhanModel> list = new List<HocPhanModel>();
            try
            {
                List<SqlParameter> listParameter = new List<SqlParameter>();
                listParameter.Add(new SqlParameter("@BoMonID", BoMonID));
                list = DBUtils.ExecuteSPList<HocPhanModel>("SP_HocPhan_DanhSach_Theo_BoMon", listParameter);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return list;
        }
        public HocPhanModel ChiTietHocPhan(int HocPhanID)
        {
            HocPhanModel model = null;
            try
            {
                List<SqlParameter> listParameter = new List<SqlParameter>();
                listParameter.Add(new SqlParameter("@HocPhanID", HocPhanID));
                model = DBUtils.ExecuteSP<HocPhanModel>("SP_HocPhan_ChiTiet", listParameter);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return model;
        }
        public HocPhanModel ChiTietHocPhanLog(int HocPhanLogID)
        {
            HocPhanModel model = null;
            try
            {
                List<SqlParameter> listParameter = new List<SqlParameter>();
                listParameter.Add(new SqlParameter("@HocPhanLogID", HocPhanLogID));
                model = DBUtils.ExecuteSP<HocPhanModel>("SP_HocPhan_ChiTiet_Log", listParameter);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return model;
        }
        public ResponseResult ThemHocPhan(HocPhanModel model)
        {
            ResponseResult res = null;
            try
            {
                List<SqlParameter> listParameter = new List<SqlParameter>();
                listParameter.Add(new SqlParameter("@MaHP", model.MaHP));
                listParameter.Add(new SqlParameter("@TenHocPhan", model.TenHocPhan));
                listParameter.Add(new SqlParameter("@SoTC", model.SoTC));
                listParameter.Add(new SqlParameter("@SoTietLT", model.SoTietLT));
                listParameter.Add(new SqlParameter("@SoTietTH", model.SoTietTH));
                listParameter.Add(new SqlParameter("@BoMonID", model.BoMonID));
                listParameter.Add(new SqlParameter("@NguoiTao", model.NguoiTao));
                res = DBUtils.ExecuteSP<ResponseResult>("SP_HocPhan_Them", listParameter);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return res;
        }
        public ResponseResult SuaHocPhan(HocPhanModel model)
        {
            ResponseResult res = null;
            try
            {
                List<SqlParameter> listParameter = new List<SqlParameter>();
                listParameter.Add(new SqlParameter("@HocPhanID", model.HocPhanID));
                listParameter.Add(new SqlParameter("@MaHP", model.MaHP));
                listParameter.Add(new SqlParameter("@TenHocPhan", model.TenHocPhan));
                listParameter.Add(new SqlParameter("@SoTC", model.SoTC));
                listParameter.Add(new SqlParameter("@SoTietLT", model.SoTietLT));
                listParameter.Add(new SqlParameter("@SoTietTH", model.SoTietTH));
                listParameter.Add(new SqlParameter("@BoMonID", model.BoMonID));
                listParameter.Add(new SqlParameter("@NguoiTao", model.NguoiTao));
                res = DBUtils.ExecuteSP<ResponseResult>("SP_HocPhan_Sua", listParameter);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return res;
        }
        public ResponseResult XoaHocPhan(int HocPhanID, string NguoiTao)
        {
            ResponseResult res = null;
            try
            {
                List<SqlParameter> listParameter = new List<SqlParameter>();
                listParameter.Add(new SqlParameter("@HocPhanID", HocPhanID));
                listParameter.Add(new SqlParameter("@NguoiTao", NguoiTao));
                res = DBUtils.ExecuteSP<ResponseResult>("SP_HocPhan_Xoa", listParameter);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return res;
        }
    }
}
