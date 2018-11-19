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
        [Range(0, 100)]
        public int SLSVNhomLop { get; set; }

        public int SoLuongConLaiLT { get; set; }
        public int SoLuongConLaiTH { get; set; }
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
    }
}
