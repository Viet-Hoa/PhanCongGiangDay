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
        public string HoVaTen { get; set; }
        public string ChuyenNganhDaoTao { get; set; }
        public string ChucDanhHocVi { get; set; }
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
        public int SLLT
        {
            get
            {
                return HK1LT + HK2LT;
            }
        }
        public int SLTH
        {
            get
            {
                return HK1TH + HK2TH;
            }
        }
        public int HK1LT { get; set; }
        public int HK1TH { get; set; }
        public int HK2LT { get; set; }
        public int HK2TH { get; set; }
        public int SoTiet { get; set; }
    }

    public class XuatExcelModel03
    {
        public int STT { get; set; }
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
        public int SLLT
        {
            get
            {
                return HK1LT + HK2LT;
            }
        }
        public int SLTH
        {
            get
            {
                return HK1TH + HK2TH;
            }
        }
        public int HK1LT { get; set; }
        public int HK1TH { get; set; }
        public int HK2LT { get; set; }
        public int HK2TH { get; set; }
        public int SoTiet { get; set; }
        public string MaCB { get; set; }
        public string HoVaTen { get; set; }
        public string ChucDanhHocVi { get; set; }
        public string TenDonVi { get; set; }
        
    }
    public class XuatExcelModel02
    {
        public int STT { get; set; }
        public string MaCB { get; set; }
        public string Ho { get; set; }
        public string Ten { get; set; }
        public string ChucDanhHocVi { get; set; }
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
        public int SLLT
        {
            get
            {
                return HK1LT + HK2LT;
            }
        }
        public int SLTH
        {
            get
            {
                return HK1TH + HK2TH;
            }
        }
        public int HK1LT { get; set; }
        public int HK1TH { get; set; }
        public int HK2LT { get; set; }
        public int HK2TH { get; set; }
        public int SoTiet { get; set; }
        public string CongTacKhac { get; set; }
        public int TongCongGD { get; set; }
        public int TongCongCT { get; set; }
        public int TongCong
        {
            get
            {
                return TongCongGD + TongCongCT;
            }
        }
        public int TongCongShow
        {
            get
            {
                return TongCongGD + TongCongCT;
            }
        }
    }
    public class XuatExcelModelGV
    {
        public int STT { get; set; }
        public string MaCB { get; set; }
        public string Ho { get; set; }
        public string Ten { get; set; }
        public string ChucDanh { get; set; }
        public string HocVi { get; set; }
        public string ChucVu { get; set; }
        public string TenBoMon { get; set; }
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
        public int SLLT
        {
            get
            {
                return HK1LT + HK2LT;
            }
        }
        public int SLTH
        {
            get
            {
                return HK1TH + HK2TH;
            }
        }
        public int HK1LT { get; set; }
        public int HK1TH { get; set; }
        public int HK2LT { get; set; }
        public int HK2TH { get; set; }
        public int SoTiet { get; set; }
        public string CongTacKhac { get; set; }
        public int TongCongGD { get; set; }
        public int TongCongCT { get; set; }
        public int TongCong
        {
            get
            {
                return TongCongGD + TongCongCT;
            }
        }
        public int TongCongShow
        {
            get
            {
                return TongCongGD + TongCongCT;
            }
        }
    }
    public class XuatExcelModel01
    {
        public int STT { get; set; }
        public string MaHP { get; set; }
        public string TenHocPhan { get; set; }
        public int SoTC { get; set; }
        public string Khoa { get; set; }
        public int SoTietLT { get; set; }
        public int SoTietTH { get; set; }
        public int TongSoTiet
        {
            get
            {
                return SoTietLT + SoTietTH / 2;
            }
        }
        public float HeSo
        {
            get
            {
                return (SoTietLT + SoTietTH / 2) / (SoTietLT + SoTietTH);
            }
        }
        public int SNLLT { get; set; }
        public int SNLTH { get; set; }
        public int SLSVNhomLop { get; set; }
        public int HKLT { get; set; }
        public int HKTH { get; set; }
        public string MaCB { get; set; }
        public string HoVaTen { get; set; }
        public int SoTietThucHien
        {
            get
            {
                return SoTietLT * HKLT + (SoTietTH * HKTH) / 2;
            }
        }
    }
}
