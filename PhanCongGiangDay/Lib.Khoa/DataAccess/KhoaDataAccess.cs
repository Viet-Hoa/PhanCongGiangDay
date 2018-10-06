using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Lib.Setting;
using Lib.Setting.Model;
using System.Data.SqlClient;
using Lib.Khoa.IDataAccess;
using Lib.Khoa.Model;

namespace Lib.Khoa.DataAccess
{
    public class KhoaDataAccess: IKhoaDataAccess
    {
        public IEnumerable<KhoaModel> DanhSachKhoa()
        {
            List<KhoaModel> list = new List<KhoaModel>();
            try
            {
                list = DBUtils.ExecuteSPList<KhoaModel>("SP_Khoa_DanhSach", null);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return list;
        }
        public KhoaModel ChiTietKhoa(int KhoaID)
        {
            KhoaModel model = null;
            try
            {
                List<SqlParameter> listParameter = new List<SqlParameter>();
                listParameter.Add(new SqlParameter("@KhoaID", KhoaID));
                model = DBUtils.ExecuteSP<KhoaModel>("SP_Khoa_ChiTiet", listParameter);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return model;
        }
        public ResponseResult ThemKhoa(KhoaModel model)
        {
            ResponseResult res = null;
            try
            {
                List<SqlParameter> listParameter = new List<SqlParameter>();
                listParameter.Add(new SqlParameter("@TenKhoa", model.TenKhoa));
                listParameter.Add(new SqlParameter("@NamBatDau", model.NamBatDau));
                listParameter.Add(new SqlParameter("@NamKetThuc", model.NamKetThuc));
                listParameter.Add(new SqlParameter("@CTDTID", model.CTDTID));
                listParameter.Add(new SqlParameter("@NguoiTao", model.NguoiTao));
                res = DBUtils.ExecuteSP<ResponseResult>("SP_Khoa_Them", listParameter);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return res;
        }
        public ResponseResult SuaKhoa(KhoaModel model)
        {
            ResponseResult res = null;
            try
            {
                List<SqlParameter> listParameter = new List<SqlParameter>();
                listParameter.Add(new SqlParameter("@KhoaID", model.KhoaID));
                listParameter.Add(new SqlParameter("@TenKhoa", model.TenKhoa));
                listParameter.Add(new SqlParameter("@NamBatDau", model.NamBatDau));
                listParameter.Add(new SqlParameter("@NamKetThuc", model.NamKetThuc));
                listParameter.Add(new SqlParameter("@CTDTID", model.CTDTID));
                listParameter.Add(new SqlParameter("@NguoiTao", model.NguoiTao));
                res = DBUtils.ExecuteSP<ResponseResult>("SP_Khoa_Sua", listParameter);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return res;
        }
        public ResponseResult XoaKhoa(int KhoaID, string NguoiTao)
        {
            ResponseResult res = null;
            try
            {
                List<SqlParameter> listParameter = new List<SqlParameter>();
                listParameter.Add(new SqlParameter("@KhoaID", KhoaID));
                listParameter.Add(new SqlParameter("@NguoiTao", NguoiTao));
                res = DBUtils.ExecuteSP<ResponseResult>("SP_Khoa_Xoa", listParameter);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return res;
        }
    }
}
