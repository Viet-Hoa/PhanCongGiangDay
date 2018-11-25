using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Lib.XuatExcel.Model;
using Lib.Setting.Model;

namespace Lib.XuatExcel.IDataAccess
{
    public interface IXuatExcelDataAccess
    {
        IEnumerable<XuatExcelModel04> XuatExcelMau04(int BangPhanCongID);
    }
}
