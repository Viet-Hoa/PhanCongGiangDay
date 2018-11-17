using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Lib.Setting;
using Lib.Setting.Model;
using System.Data.SqlClient;
using Lib.GiangVien.IDataAccess;
using Lib.GiangVien.Model;

namespace Lib.GiangVien.DataAccess
{
    public class GiangVienDataAccess: IGiangVienDataAccess
    {
        public IEnumerable<GiangVienModel> DanhSachGiangVien()
        {
            List<GiangVienModel> list = new List<GiangVienModel>();
            try
            {
                list = DBUtils.ExecuteSPList<GiangVienModel>("SP_GiangVien_DanhSach", null);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return list;
        }
        public IEnumerable<GiangVienModel> DanhSachGiangVienTheoLoai(int loai)
        {
            List<GiangVienModel> list = new List<GiangVienModel>();
            try
            {
                List<SqlParameter> listParameter = new List<SqlParameter>();
                listParameter.Add(new SqlParameter("@Loai", loai));
                list = DBUtils.ExecuteSPList<GiangVienModel>("SP_GiangVien_DanhSach_Theo_Loai", listParameter);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return list;
        }
        public IEnumerable<GiangVienModel> DanhSachGiangVienTheoBoMon(int BoMonID)
        {
            List<GiangVienModel> list = new List<GiangVienModel>();
            try
            {
                List<SqlParameter> listParameter = new List<SqlParameter>();
                listParameter.Add(new SqlParameter("@BoMonID", BoMonID));
                list = DBUtils.ExecuteSPList<GiangVienModel>("SP_GiangVien_DanhSach_Theo_BoMon", listParameter);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return list;
        }
        public GiangVienModel ChiTietGiangVien(int GiangVienID)
        {
            GiangVienModel model = null;
            try
            {
                List<SqlParameter> listParameter = new List<SqlParameter>();
                listParameter.Add(new SqlParameter("@GiangVienID", GiangVienID));
                model = DBUtils.ExecuteSP<GiangVienModel>("SP_GiangVien_ChiTiet", listParameter);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return model;
        }
        public ResponseResult ThemGiangVien(GiangVienModel model)
        {
            ResponseResult res = null;
            try
            {
                List<SqlParameter> listParameter = new List<SqlParameter>();
                listParameter.Add(new SqlParameter("@MaCB", model.MaCB));
                listParameter.Add(new SqlParameter("@Ho", model.Ho));
                listParameter.Add(new SqlParameter("@Ten", model.Ten));
                listParameter.Add(new SqlParameter("@NamSinh", model.NamSinh));
                listParameter.Add(new SqlParameter("@ChucDanh", model.ChucDanh));
                listParameter.Add(new SqlParameter("@HocVi", model.HocVi));
                listParameter.Add(new SqlParameter("@ChucVu", model.ChucVu));
                listParameter.Add(new SqlParameter("@DonViID", model.DonViID));
                listParameter.Add(new SqlParameter("@BoMonID", model.BoMonID));
                listParameter.Add(new SqlParameter("@Truong", model.Truong));
                listParameter.Add(new SqlParameter("@NguoiTao", model.NguoiTao));
                res = DBUtils.ExecuteSP<ResponseResult>("SP_GiangVien_Them", listParameter);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return res;
        }
        public ResponseResult SuaGiangVien(GiangVienModel model)
        {
            ResponseResult res = null;
            try
            {
                List<SqlParameter> listParameter = new List<SqlParameter>();
                listParameter.Add(new SqlParameter("@GiangVienID", model.GiangVienID));
                listParameter.Add(new SqlParameter("@MaCB", model.MaCB));
                listParameter.Add(new SqlParameter("@Ho", model.Ho));
                listParameter.Add(new SqlParameter("@Ten", model.Ten));
                listParameter.Add(new SqlParameter("@NamSinh", model.NamSinh));
                listParameter.Add(new SqlParameter("@ChucDanh", model.ChucDanh));
                listParameter.Add(new SqlParameter("@HocVi", model.HocVi));
                listParameter.Add(new SqlParameter("@ChucVu", model.ChucVu));
                listParameter.Add(new SqlParameter("@DonViID", model.DonViID));
                listParameter.Add(new SqlParameter("@BoMonID", model.BoMonID));
                listParameter.Add(new SqlParameter("@Truong", model.Truong));
                listParameter.Add(new SqlParameter("@NguoiTao", model.NguoiTao));
                res = DBUtils.ExecuteSP<ResponseResult>("SP_GiangVien_Sua", listParameter);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return res;
        }
        public ResponseResult XoaGiangVien(int id, string NguoiTao)
        {
            ResponseResult res = null;
            try
            {
                List<SqlParameter> listParameter = new List<SqlParameter>();
                listParameter.Add(new SqlParameter("@GiangVienID", id));
                listParameter.Add(new SqlParameter("@NguoiTao", NguoiTao));
                res = DBUtils.ExecuteSP<ResponseResult>("SP_GiangVien_Xoa", listParameter);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return res;
        }
    }
}
