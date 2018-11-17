using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Lib.Setting;
using Lib.Setting.Model;
using System.Data.SqlClient;
using Lib.PhanCongGiangVien.IDataAccess;
using Lib.PhanCongGiangVien.Model;
using Lib.GiangVien.Model;

namespace Lib.PhanCongGiangVien.DataAccess
{
    public class PhanCongGiangVienDataAccess: IPhanCongGiangVienDataAccess
    {
        public IEnumerable<PhanCongGiangVienModel> DanhSachPhanCongGiangVien(int BangPhanCongID, int GiangVienID)
        {
            List<PhanCongGiangVienModel> list = new List<PhanCongGiangVienModel>();
            try
            {
                List<SqlParameter> listParameter = new List<SqlParameter>();
                listParameter.Add(new SqlParameter("@BangPhanCongID", BangPhanCongID));
                listParameter.Add(new SqlParameter("@GiangVienID", GiangVienID));
                list = DBUtils.ExecuteSPList<PhanCongGiangVienModel>("SP_PhanCongGiangVien_DanhSach", listParameter);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return list;
        }
        public ResponseResult ThemPhanCongGiangVien(PhanCongGiangVienModel model)
        {
            ResponseResult res = null;
            try
            {
                List<SqlParameter> listParameter = new List<SqlParameter>();
                listParameter.Add(new SqlParameter("@PhanCongNhomLopID", model.PhanCongNhomLopID));
                listParameter.Add(new SqlParameter("@GiangVienLogID", model.GiangVienLogID));
                listParameter.Add(new SqlParameter("@HK1LT", model.HK1LT));
                listParameter.Add(new SqlParameter("@HK1TH", model.HK1TH));
                listParameter.Add(new SqlParameter("@HK2LT", model.HK2LT));
                listParameter.Add(new SqlParameter("@HK2TH", model.HK2TH));
                listParameter.Add(new SqlParameter("@NguoiTao", model.NguoiTao));
                res = DBUtils.ExecuteSP<ResponseResult>("SP_PhanCongGiangVien_Them", listParameter);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return res;
        }
        public ResponseResult SuaPhanCongGiangVien(PhanCongGiangVienModel model)
        {
            ResponseResult res = null;
            try
            {
                List<SqlParameter> listParameter = new List<SqlParameter>();
                listParameter.Add(new SqlParameter("@PhanCongID", model.PhanCongID));
                listParameter.Add(new SqlParameter("@PhanCongNhomLopID", model.PhanCongNhomLopID));
                listParameter.Add(new SqlParameter("@HK1LT", model.HK1LT));
                listParameter.Add(new SqlParameter("@HK1TH", model.HK1TH));
                listParameter.Add(new SqlParameter("@HK2LT", model.HK2LT));
                listParameter.Add(new SqlParameter("@HK2TH", model.HK2TH));
                listParameter.Add(new SqlParameter("@NguoiTao", model.NguoiTao));
                res = DBUtils.ExecuteSP<ResponseResult>("SP_PhanCongGiangVien_Sua", listParameter);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return res;
        }
        public ResponseResult XoaPhanCongGiangVien(int id, string NguoiTao)
        {
            ResponseResult res = null;
            try
            {
                List<SqlParameter> listParameter = new List<SqlParameter>();
                listParameter.Add(new SqlParameter("@PhanCongID", id));
                listParameter.Add(new SqlParameter("@NguoiTao", NguoiTao));
                res = DBUtils.ExecuteSP<ResponseResult>("SP_PhanCongGiangVien_Xoa", listParameter);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return res;
        }

        public IEnumerable<PhanCongCongTacModel> DanhSachPhanCongCongTac(int BangPhanCongID, int GiangVienID)
        {
            List<PhanCongCongTacModel> list = new List<PhanCongCongTacModel>();
            try
            {
                List<SqlParameter> listParameter = new List<SqlParameter>();
                listParameter.Add(new SqlParameter("@BangPhanCongID", BangPhanCongID));
                listParameter.Add(new SqlParameter("@GiangVienID", GiangVienID));
                list = DBUtils.ExecuteSPList<PhanCongCongTacModel>("SP_PhanCongCongTac_DanhSach", listParameter);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return list;
        }

        public ResponseResult ThemPhanCongCongTac(PhanCongCongTacModel model)
        {
            ResponseResult res = null;
            try
            {
                List<SqlParameter> listParameter = new List<SqlParameter>();
                listParameter.Add(new SqlParameter("@CongTacKhacLogID", model.CongTacKhacLogID));
                listParameter.Add(new SqlParameter("@BangPhanCongID", model.BangPhanCongID));
                listParameter.Add(new SqlParameter("@GiangVienLogID", model.GiangVienLogID));
                listParameter.Add(new SqlParameter("@NguoiTao", model.NguoiTao));
                res = DBUtils.ExecuteSP<ResponseResult>("SP_PhanCongCongTac_Them", listParameter);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return res;
        }
        public ResponseResult SuaPhanCongCongTac(PhanCongCongTacModel model)
        {
            ResponseResult res = null;
            try
            {
                List<SqlParameter> listParameter = new List<SqlParameter>();
                listParameter.Add(new SqlParameter("@PhanCongCongTacID", model.PhanCongCongTacID));
                listParameter.Add(new SqlParameter("@CongTacKhacLogID", model.CongTacKhacLogID));
                listParameter.Add(new SqlParameter("@TrangThai", model.TrangThai));
                listParameter.Add(new SqlParameter("@NguoiTao", model.NguoiTao));
                res = DBUtils.ExecuteSP<ResponseResult>("SP_PhanCongCongTac_Sua", listParameter);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return res;
        }

        public IEnumerable<GiangVienModel> DanhSachGiangVienPhanCong(int BangPhanCongID, int Loc)
        {
            List<GiangVienModel> list = new List<GiangVienModel>();
            try
            {
                List<SqlParameter> listParameter = new List<SqlParameter>();
                listParameter.Add(new SqlParameter("@BangPhanCongID", BangPhanCongID));
                listParameter.Add(new SqlParameter("@Loc", Loc));
                list = DBUtils.ExecuteSPList<GiangVienModel>("SP_GiangVien_DanhSach_PhanCong", listParameter);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return list;
        }

        public GiangVienModel ChiTietGiangVienPhanCong(int BangPhanCongID, int GiangVienID)
        {
            GiangVienModel list = new GiangVienModel();
            try
            {
                List<SqlParameter> listParameter = new List<SqlParameter>();
                listParameter.Add(new SqlParameter("@BangPhanCongID", BangPhanCongID));
                listParameter.Add(new SqlParameter("@GiangVienID", GiangVienID));
                list = DBUtils.ExecuteSP<GiangVienModel>("SP_GiangVien_ChiTiet_PhanCong", listParameter);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return list;
        }
    }
}
