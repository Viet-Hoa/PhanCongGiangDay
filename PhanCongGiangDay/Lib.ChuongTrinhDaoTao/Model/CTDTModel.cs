using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace Lib.CTDT.Model
{
    public class CTDTModel
    {
        public int STT { get; set; }
        public int CTDTID { get; set; }
        [Required(ErrorMessage = "Mã chương trình đào tạo không được để trống.")]
        public string MaCTDT { get; set; }
        [Required(ErrorMessage = "Tên chương trình đào tạo không được để trống.")]
        public string TenCTDT { get; set; }
        [Required(ErrorMessage = "Năm bắt đầu không được để trống.")]
        public string NamBatDau { get; set; }
        [Required(ErrorMessage = "Năm kết thúc không được để trống.")]
        public string NamKetThuc { get; set; }
        public string NguoiTao { get; set; }
    }
}
