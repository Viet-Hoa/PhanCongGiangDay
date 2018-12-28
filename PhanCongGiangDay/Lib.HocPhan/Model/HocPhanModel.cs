using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace Lib.HocPhan.Model
{
    public class HocPhanModel
    {
        public int STT { get; set; }
        public int HocPhanID { get; set; }
        public int HocPhanLogID { get; set; }
        [Required(ErrorMessage = "Mã học phần không được để trống.")]
        public string MaHP { get; set; }
        [Required(ErrorMessage = "Tên học phần không được để trống.")]
        public string TenHocPhan { get; set; }
        [Required(ErrorMessage = "Số tín chỉ không được để trống.")]
        public int SoTC { get; set; }
        [Required(ErrorMessage = "Số tiết lý thuyết không được để trống.")]
        public int SoTietLT { get; set; }
        [Required(ErrorMessage = "Số tiết thực hành không được để trống.")]
        public int SoTietTH { get; set; }
        public int? BoMonID { get; set; }
        public string NguoiTao { get; set; }

        public string MaVaTenHP
        {
            get
            {
                return "(" + MaHP + ") " + TenHocPhan;
            }
        }

        public int SoTietHP
        {
            get
            {
                return (int)(SoTietLT+SoTietTH/2);
            }
        }

        public string TenBoMon { get; set; }
    }
}
