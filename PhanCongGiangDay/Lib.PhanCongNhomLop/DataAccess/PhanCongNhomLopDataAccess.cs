using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Lib.Setting;
using Lib.Setting.Model;
using System.Data.SqlClient;
using Lib.PhanCongNhomLop.IDataAccess;
using Lib.PhanCongNhomLop.Model;

namespace Lib.PhanCongNhomLop.DataAccess
{
    public class PhanCongNhomLopDataAccess: IPhanCongNhomLopDataAccess
    {
        public IEnumerable<PhanCongNhomLopModel> DanhSachPhanCongNhomLop(int BangPhanCongID, int? KhoaID, int? BoMonID )
        {
            List<PhanCongNhomLopModel> list = new List<PhanCongNhomLopModel>();
            try
            {
                List<SqlParameter> listParameter = new List<SqlParameter>();
                listParameter.Add(new SqlParameter("@BangPhanCongID", BangPhanCongID));
                listParameter.Add(new SqlParameter("@KhoaID", KhoaID));
                listParameter.Add(new SqlParameter("@BoMonID", BoMonID));
                list = DBUtils.ExecuteSPList<PhanCongNhomLopModel>("SP_PhanCongNhomLop_DanhSach", listParameter);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return list;
        }
        public PhanCongNhomLopModel ChiTietPhanCongNhomLop(int PhanCongNhomLopID)
        {
            PhanCongNhomLopModel model = null;
            try
            {
                List<SqlParameter> listParameter = new List<SqlParameter>();
                listParameter.Add(new SqlParameter("@PhanCongNhomLopID", PhanCongNhomLopID));
                model = DBUtils.ExecuteSP<PhanCongNhomLopModel>("SP_PhanCongNhomLop_ChiTiet", listParameter);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return model;
        }
        public ResponseResult ThemPhanCongNhomLop(PhanCongNhomLopModel model)
        {
            ResponseResult res = null;
            try
            {
                List<SqlParameter> listParameter = new List<SqlParameter>();
                listParameter.Add(new SqlParameter("@BangPhanCongID", model.BangPhanCongID));
                listParameter.Add(new SqlParameter("@KhoaID", model.KhoaID));
                listParameter.Add(new SqlParameter("@HocPhanLogID", model.HocPhanLogID));
                listParameter.Add(new SqlParameter("@SLSVNhomLop", model.SLSVNhomLop));
                listParameter.Add(new SqlParameter("@SoLuongNhomLopLT", model.SoLuongNhomLopLT));
                listParameter.Add(new SqlParameter("@SoLuongNhomLopTH", model.SoLuongNhomLopTH));
                listParameter.Add(new SqlParameter("@NguoiTao", model.NguoiTao));
                res = DBUtils.ExecuteSP<ResponseResult>("SP_PhanCongNhomLop_Them", listParameter);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return res;
        }
        public ResponseResult SuaPhanCongNhomLop(PhanCongNhomLopModel model)
        {
            ResponseResult res = null;
            try
            {
                List<SqlParameter> listParameter = new List<SqlParameter>();
                listParameter.Add(new SqlParameter("@PhanCongNhomLopID", model.PhanCongNhomLopID));
                listParameter.Add(new SqlParameter("@BangPhanCongID", model.BangPhanCongID));
                listParameter.Add(new SqlParameter("@KhoaID", model.KhoaID));
                listParameter.Add(new SqlParameter("@HocPhanLogID", model.HocPhanLogID));
                listParameter.Add(new SqlParameter("@SLSVNhomLop", model.SLSVNhomLop));
                listParameter.Add(new SqlParameter("@SoLuongNhomLopLT", model.SoLuongNhomLopLT));
                listParameter.Add(new SqlParameter("@SoLuongNhomLopTH", model.SoLuongNhomLopTH));
                listParameter.Add(new SqlParameter("@NguoiTao", model.NguoiTao));
                res = DBUtils.ExecuteSP<ResponseResult>("SP_PhanCongNhomLop_Sua", listParameter);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return res;
        }
        public ResponseResult XoaPhanCongNhomLop(int id, string NguoiTao)
        {
            ResponseResult res = null;
            try
            {
                List<SqlParameter> listParameter = new List<SqlParameter>();
                listParameter.Add(new SqlParameter("@PhanCongNhomLopID", id));
                listParameter.Add(new SqlParameter("@NguoiTao", NguoiTao));
                res = DBUtils.ExecuteSP<ResponseResult>("SP_PhanCongNhomLop_Xoa", listParameter);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return res;
        }
    }
}
