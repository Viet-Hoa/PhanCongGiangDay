using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Lib.XuatExcel.Model
{
    public class XuatExcelModel04
    {
        public int STT { get; set; }
        public int BangPhanCongID { get; set; }
        public string HoVaTen { get; set; }
        public string ChuyenNganhDaoTao { get; set; }
        public string ChucDanh { get; set; }
        public string HocVi { get; set; }
        public string TenDonVi { get; set; }
        public string TenHocPhan { get; set; }
        public string MaHP { get; set; }
        public int SoTC { get; set; }
        public int SoTietLT { get; set; }
        public int SoTietTH { get; set; }
        public int TongSoTiet
        {
            get
            {
                return SoTietLT + SoTietTH / 2;
            }
        }
        public int HK1LT { get; set; }
        public int HK1TH { get; set; }
        public int HK2LT { get; set; }
        public int HK2TH { get; set; }
        public int SoTiet { get; set; }
    }
}
