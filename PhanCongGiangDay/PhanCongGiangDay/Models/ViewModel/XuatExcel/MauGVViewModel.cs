using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PhanCongGiangDay.Models.ViewModel.XuatExcel
{
    public class MauGVViewModel
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
}