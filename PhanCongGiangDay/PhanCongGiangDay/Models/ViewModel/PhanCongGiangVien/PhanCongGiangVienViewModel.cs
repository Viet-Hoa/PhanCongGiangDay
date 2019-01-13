using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Lib.PhanCongGiangVien.Model;

namespace PhanCongGiangDay.Models.ViewModel.PhanCongGiangVien
{
    public class PhanCongGiangVienViewModel
    {
        public int STT { get; set; }
        public string HoTenGV { get; set; }
        public string ChucVu { get; set; }
        public string ChucDanh { get; set; }
        public string HocVi { get; set; }
        public string LopPhuTrach { get; set; }
        public int GiangVienLogID { get; set; }
        public string LoaiGV { get; set; }
        public int TongSoTiet { get; set; }
        public int SoTietThucTe { get; set; }
        public int SoTietCongTac
        {
            get
            {
                return SoTietThucTe - TongSoTiet;
            }
        }
        public List<PhanCongGiangVienModel> NhomLopPhanCong { get; set; }
        public List<PhanCongCongTacModel> CongTacKhac { get; set; }
        public string CongTac { get; set; }
        public string Truong { get; set; }
        public string TenDonVi { get; set; }
        public string TenBoMon { get; set; }
        public int BoMonID { get; set; }
    }

    public class PhanCongGiangVienTheoNhomLopViewModel
    {
        public int PhanCongNhomLopID { get; set; }
        public int BangPhanCongID { get; set; }
        public int KhoaID { get; set; }
        public int HocPhanLogID { get; set; }
        public int SoLuongNhomLopLT { get; set; }
        public int SoLuongNhomLopTH { get; set; }
        public int SLSVNhomLop { get; set; }
        public int SoLuongConLaiLT { get; set; }
        public int SoLuongConLaiTH { get; set; }
        public string MaHP { get; set; }
        public string TenHocPhan { get; set; }
        public string HocKi { get; set; }
        public string TenCTDT { get; set; }
        public string MaVaTenHP
        {
            get
            {
                return "(" + MaHP + ") " + TenHocPhan;
            }
        }
        public int SoTietLT { get; set; }
        public int SoTietTH { get; set; }
        public string TenBoMon { get; set; }
        public int BoMonID { get; set; }
        public List<PhanCongGiangVienModel> GiangVienPhanCong { get; set; }
    }
}