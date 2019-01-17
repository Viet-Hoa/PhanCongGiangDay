using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Lib.HocPhanTheoCTDT.Model;
using System.Data.SqlClient;
using Lib.Setting.Model;
using Lib.Setting;
using Lib.HocPhanTheoCTDT.IDataAccess;

namespace Lib.HocPhanTheoCTDT.DataAccess
{
    public class HocPhanTheoCTDTDataAccess: IHocPhanTheoCTDTDataAccess
    {
        public IEnumerable<HocPhanTheoCTDTModel> DanhSachHocPhanTheoCTDT(int ChuongTrinhDaoTaoID)
        {
            IEnumerable<HocPhanTheoCTDTModel> list = null;
            try
            {
                List<SqlParameter> listParameter = new List<SqlParameter>();
                listParameter.Add(new SqlParameter("@CTDTID", ChuongTrinhDaoTaoID));
                list = DBUtils.ExecuteSPList<HocPhanTheoCTDTModel>("SP_HocPhanTheoCTDT_DanhSach", listParameter);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return list;
        }
        public ResponseResult ThemHocPhanTheoCTDT(HocPhanTheoCTDTModel model)
        {
            ResponseResult res = null;
            try
            {
                List<SqlParameter> listParameter = new List<SqlParameter>();
                listParameter.Add(new SqlParameter("@CTDTID", model.ChuongTrinhDaoTaoID));
                listParameter.Add(new SqlParameter("@MaHP", model.MaHP));
                listParameter.Add(new SqlParameter("@HocKi", model.HocKi));
                listParameter.Add(new SqlParameter("@NguoiTao", model.NguoiTao));
                res = DBUtils.ExecuteSP<ResponseResult>("SP_HocPhanTheoCTDT_Them", listParameter);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return res;
        }
        public ResponseResult XoaHocPhanTheoCTDT(int id, string NguoiTao)
        {
            ResponseResult res = null;
            try
            {
                List<SqlParameter> listParameter = new List<SqlParameter>();
                listParameter.Add(new SqlParameter("@HocPhanTheoCTDT_ID", id));
                listParameter.Add(new SqlParameter("@NguoiTao", NguoiTao));
                res = DBUtils.ExecuteSP<ResponseResult>("SP_HocPhanTheoCTDT_Xoa", listParameter);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return res;
        }
    }
}
