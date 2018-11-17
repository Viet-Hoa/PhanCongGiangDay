using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace Lib.NamHoc.Model
{
    public class NamHocModel
    {
        public int STT { get; set; }
        public int BangPhanCongID { get; set; }
        [Required(ErrorMessage = "Năm học không được để trống.")]
        public string NamHoc { get; set; }
        public string NguoiTao { get; set; }
        public int TrangThai { get; set; }
    }
}
