﻿using System;
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
        
    }
}
