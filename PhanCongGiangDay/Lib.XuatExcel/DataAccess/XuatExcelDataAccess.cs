using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Lib.Setting;
using Lib.Setting.Model;
using System.Data.SqlClient;
using Lib.XuatExcel.IDataAccess;
using Lib.XuatExcel.Model;

namespace Lib.XuatExcel.DataAccess
{
    public class XuatExcelDataAccess: IXuatExcelDataAccess
    {
        public IEnumerable<XuatExcelModel> DanhSachXuatExcel()
        {
            List<XuatExcelModel> list = new List<XuatExcelModel>();
            try
            {
                list = DBUtils.ExecuteSPList<XuatExcelModel>("SP_BangPhanCong_DanhSach", null);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return list;
        }
        public XuatExcelModel ChiTietXuatExcel(int BangPhanCongID)
        {
            XuatExcelModel model = null;
            try
            {
                List<SqlParameter> listParameter = new List<SqlParameter>();
                listParameter.Add(new SqlParameter("@BangPhanCongID", BangPhanCongID));
                model = DBUtils.ExecuteSP<XuatExcelModel>("SP_BangPhanCong_ChiTiet", listParameter);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return model;
        }
        public ResponseResult ThemXuatExcel(XuatExcelModel model)
        {
            ResponseResult res = null;
            try
            {
                List<SqlParameter> listParameter = new List<SqlParameter>();
                listParameter.Add(new SqlParameter("@XuatExcel", model.XuatExcel));
                listParameter.Add(new SqlParameter("@NguoiTao", model.NguoiTao));
                res = DBUtils.ExecuteSP<ResponseResult>("SP_BangPhanCong_Them", listParameter);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return res;
        }
        public ResponseResult SuaXuatExcel(XuatExcelModel model)
        {
            ResponseResult res = null;
            try
            {
                List<SqlParameter> listParameter = new List<SqlParameter>();
                listParameter.Add(new SqlParameter("@BangPhanCongID", model.BangPhanCongID));
                listParameter.Add(new SqlParameter("@XuatExcel", model.XuatExcel));
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
