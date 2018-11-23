using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace Lib.PhanCongGiangVien.Model
{
    public class PhanCongGiangVienModel
    {
        public int STT { get; set; }
        public int PhanCongID { get; set; }
        [Required(ErrorMessage = "Học phần không được để trống.")]
        public int PhanCongNhomLopID { get; set; }
        public int GiangVienLogID { get; set; }
        [Required(ErrorMessage = "HK1 lý thuyết không được để trống.")]
        public int HK1LT { get; set; }
        [Required(ErrorMessage = "HK1 thực hành không được để trống.")]
        public int HK1TH { get; set; }
        [Required(ErrorMessage = "HK2 lý thuyết không được để trống.")]
        public int HK2LT { get; set; }
        [Required(ErrorMessage = "HK2 thực hành không được để trống.")]
        public int HK2TH { get; set; }
        public int SoTiet { get; set; }
        public string NguoiTao { get; set; }
        public int TrangThai { get; set; }

        public string MaHP { get; set; }
        public string TenHocPhan { get; set; }
        public string MaVaTenHP
        {
            get
            {
                return "(" + MaHP + ") " + TenHocPhan;
            }
        }
        public int SoTietLT { get; set; }
        public int SoTietTH { get; set; }
        public int SoLuongConLaiLT { get; set; }
        public int SoLuongConLaiTH { get; set; }
    }
    public class PhanCongCongTacModel
    {
        public int PhanCongCongTacID { get; set; }
        public int CongTacKhacLogID { get; set; }
        public int BangPhanCongID { get; set; }
        public int GiangVienLogID { get; set; }
        public string NguoiTao { get; set; }
        public int TrangThai { get; set; }

        public string TenCongTac { get; set; }
        public int SoTiet { get; set; }
        public string TenVaSoTiet
        {
            get
            {
                return  TenCongTac+ "(" + SoTiet + ") ";
            }
        }
    }
}
