using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Lib.XuatExcel.Model;
using Lib.Setting.Model;
using System.IO;

namespace PhanCongGiangDay.IServices
{
    public interface IXuatExcelService
    {
        Stream XuatExcelMau04(int BangPhanCongID);
        Stream XuatExcelMau03(int BangPhanCongID);
        Stream XuatExcelMau02(int BangPhanCongID);
        Stream XuatExcelMau01(int BangPhanCongID, int HocKi);
        Stream XuatExcelMauBoMon(int BangPhanCongID);
        Stream XuatExcelMauGiangVien(int BangPhanCongID, List<int> GiangVienID);

        Stream XuatExcelPhanCong(int BangPhanCongID);
    }
}
