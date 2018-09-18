using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace Lib.DonVi.Model
{
    public class DonviModel
    {
        public int STT { get; set; }
        public int DonViID { get; set; }
        [Required(ErrorMessage = "Mã đơn vị không được để trống.")]
        public string MaDonVi { get; set; }
        [Required(ErrorMessage = "Tên đơn vị không được để trống.")]
        public string TenDonVi { get; set; }
        public string NguoiTao { get; set; }
    }
}
