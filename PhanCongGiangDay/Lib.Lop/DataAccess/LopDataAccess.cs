using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Lib.Lop.IDataAccess;
using Lib.Lop.Model;
using Lib.Setting;
using Lib.Setting.Model;
using System.Data.SqlClient;

namespace Lib.Lop.DataAccess
{
    public class LopDataAccess : ILopDataAccess
    {
        public IEnumerable<LopModel> DanhSachLop()
        {
            List<LopModel> list = new List<LopModel>();
            try
            {
                list = DBUtils.ExecuteSPList<LopModel>("SP_Lop_DanhSach", null);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return list;
        }
        public LopModel ChiTietLop(int LopID)
        {
            LopModel model = null;
            try
            {
                List<SqlParameter> listParameter = new List<SqlParameter>();
                listParameter.Add(new SqlParameter("@LopID", LopID));
                model = DBUtils.ExecuteSP<LopModel>("SP_Lop_ChiTiet", listParameter);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return model;
        }
        public ResponseResult ThemLop(LopModel model)
        {
            ResponseResult res = null;
            try
            {
                List<SqlParameter> listParameter = new List<SqlParameter>();
                listParameter.Add(new SqlParameter("@MaLop", model.MaLop));
                listParameter.Add(new SqlParameter("@KhoaID", model.KhoaID));
                listParameter.Add(new SqlParameter("@GiangVienID", model.GiangVienID));
                listParameter.Add(new SqlParameter("@NguoiTao", model.NguoiTao));
                res = DBUtils.ExecuteSP<ResponseResult>("SP_Lop_Them", listParameter);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return res;
        }
        public ResponseResult SuaLop(LopModel model)
        {
            ResponseResult res = null;
            try
            {
                List<SqlParameter> listParameter = new List<SqlParameter>();
                listParameter.Add(new SqlParameter("@LopID", model.LopID));
                listParameter.Add(new SqlParameter("@MaLop", model.MaLop));
                listParameter.Add(new SqlParameter("@KhoaID", model.KhoaID));
                listParameter.Add(new SqlParameter("@GiangVienID", model.GiangVienID));
                listParameter.Add(new SqlParameter("@NguoiTao", model.NguoiTao));
                res = DBUtils.ExecuteSP<ResponseResult>("SP_Lop_Sua", listParameter);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return res;
        }
        public ResponseResult XoaLop(int LopID, string NguoiTao)
        {
            ResponseResult res = null;
            try
            {
                List<SqlParameter> listParameter = new List<SqlParameter>();
                listParameter.Add(new SqlParameter("@LopID", LopID));
                listParameter.Add(new SqlParameter("@NguoiTao", NguoiTao));
                res = DBUtils.ExecuteSP<ResponseResult>("SP_Lop_Xoa", listParameter);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return res;
        }
    }
}
