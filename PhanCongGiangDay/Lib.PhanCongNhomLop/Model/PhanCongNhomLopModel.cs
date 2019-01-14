using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace Lib.PhanCongNhomLop.Model
{
    public class PhanCongNhomLopModel
    {
        public int STT { get; set; }
        public int PhanCongNhomLopID { get; set; }
        public int BangPhanCongID { get; set; }
        public int KhoaID { get; set; }

        [Required(ErrorMessage = "Học phần không được để trống.")]
        [Range(0, 100)]
        public int HocPhanLogID { get; set; }

        [Required(ErrorMessage = "Số lượng nhóm lớp lý thuyết không được để trống.")]
        [Range(0, 100)]
        public int SoLuongNhomLopLT { get; set; }

        [Required(ErrorMessage = "Số lượng nhóm lớp thực hành không được để trống.")]
        [Range(0, 100)]
        public int SoLuongNhomLopTH { get; set; }

        [Required(ErrorMessage = "Số lượng SV trên nhóm lớp không được để trống.")]
        [Range(0, 200)]
        public int SLSVNhomLop { get; set; }

        public int SoLuongConLaiLT { get; set; }
        public int SoLuongConLaiTH { get; set; }
        public string NguoiTao { get; set; }
        public int TrangThai { get; set; }

        public int HocPhanID { get; set; }
        public string MaHP { get; set; }
        public string TenHocPhan { get; set; }
        public string MaVaTenHP
        {
            get
            {
                return "(" + MaHP + ") " + TenHocPhan;
            }
        }
        public int SoTC { get; set; }
        public int SoTietLT { get; set; }
        public int SoTietTH { get; set; }
        public int SoTietTC
        {
            get
            {
                return SoTietLT + SoTietTH / 2;
            }
        }
        public string TenBoMon { get; set; }
        public int BoMonID { get; set; }
        public string HocKi { get; set; }
        public string TenKhoa { get; set; }
        public string CTDT { get; set; }
        public string SLSVKhoa { get; set; }
        public int SLSV { get; set; }
        public int SLCN { get; set; }
        public string TenCTDT { get; set; }

    }
}
