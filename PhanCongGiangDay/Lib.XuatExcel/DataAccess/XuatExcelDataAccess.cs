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
        public IEnumerable<XuatExcelModel04> XuatExcelMau04(int BangPhanCongID)
        {
            List<XuatExcelModel04> list = new List<XuatExcelModel04>();
            try
            {
                List<SqlParameter> listParameter = new List<SqlParameter>();
                listParameter.Add(new SqlParameter("@BangPhanCongID", BangPhanCongID));
                list = DBUtils.ExecuteSPList<XuatExcelModel04>("SP_XuatExcel_Mau04", listParameter);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return list;
        }
        public IEnumerable<XuatExcelModel03> XuatExcelMau03(int BangPhanCongID)
        {
            List<XuatExcelModel03> list = new List<XuatExcelModel03>();
            try
            {
                List<SqlParameter> listParameter = new List<SqlParameter>();
                listParameter.Add(new SqlParameter("@BangPhanCongID", BangPhanCongID));
                list = DBUtils.ExecuteSPList<XuatExcelModel03>("SP_XuatExcel_Mau03", listParameter);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return list;
        }
        public IEnumerable<XuatExcelModel02> XuatExcelMau02(int BangPhanCongID)
        {
            List<XuatExcelModel02> list = new List<XuatExcelModel02>();
            try
            {
                List<SqlParameter> listParameter = new List<SqlParameter>();
                listParameter.Add(new SqlParameter("@BangPhanCongID", BangPhanCongID));
                list = DBUtils.ExecuteSPList<XuatExcelModel02>("SP_XuatExcel_Mau02", listParameter);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return list;
        }
        public IEnumerable<XuatExcelModel02> XuatExcelMauBM(int BangPhanCongID, int BoMonID)
        {
            List<XuatExcelModel02> list = new List<XuatExcelModel02>();
            try
            {
                List<SqlParameter> listParameter = new List<SqlParameter>();
                listParameter.Add(new SqlParameter("@BangPhanCongID", BangPhanCongID));
                listParameter.Add(new SqlParameter("@BoMonID", BoMonID));
                list = DBUtils.ExecuteSPList<XuatExcelModel02>("SP_XuatExcel_MauBM", listParameter);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return list;
        }
    }
}
