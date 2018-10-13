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
        public int SoLuongNhomLop { get; set; }
        public int SoLuongConLaiLT { get; set; }
        public int SoLuongConLaiTH { get; set; }
        public string NguoiTao { get; set; }
        public int TrangThai { get; set; }


        public string MaHocPhan { get; set; }
        public string TenHocPhan { get; set; }
        public string MaVaTenHP
        {
            get
            {
                return "(" + MaHocPhan + ") " + TenHocPhan;
            }
        }
    }
}
