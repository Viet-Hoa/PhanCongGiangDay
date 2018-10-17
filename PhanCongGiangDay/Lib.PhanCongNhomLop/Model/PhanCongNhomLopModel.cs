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
        public int HocPhanLogID { get; set; }
        [Required(ErrorMessage = "Số lượng nhóm lớp không được để trống.")]
        public int SoLuongNhomLop { get; set; }
        [Required(ErrorMessage = "LT còn lại không được để trống.")]
        public int SoLuongConLaiLT { get; set; }
        [Required(ErrorMessage = "TH còn lại không được để trống.")]
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
    }
}
