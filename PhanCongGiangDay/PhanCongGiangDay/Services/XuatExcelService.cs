using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using PhanCongGiangDay.IServices;
using Lib.Setting.Model;
using Lib.XuatExcel.DataAccess;
using Lib.XuatExcel.IDataAccess;
using Lib.XuatExcel.Model;

namespace PhanCongGiangDay.Services
{
    public class XuatExcelService: IXuatExcelService
    {
        private IXuatExcelDataAccess _XuatExcelDA;
        private IXuatExcelDataAccess XuatExcelDA
        {
            get { return _XuatExcelDA ?? (_XuatExcelDA = new XuatExcelDataAccess()); }
        }

       
    }
}