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
        IEnumerable<XuatExcelModel03> XuatExcelMau03(int BangPhanCongID);
        IEnumerable<XuatExcelModel02> XuatExcelMau02(int BangPhanCongID);
        IEnumerable<XuatExcelModel02> XuatExcelMauBM(int BangPhanCongID, int BoMonID);
    }
}
