using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace Lib.Khoa.Model
{
    public class KhoaModel
    {
        public int STT { get; set; }
        public int KhoaID { get; set; }
        [Required(ErrorMessage = "Tên khoá không được để trống.")]
        public string TenKhoa { get; set; }
        [Required(ErrorMessage = "Năm bắt đầu không được để trống.")]
        public int NamBatDau { get; set; }
        [Required(ErrorMessage = "Năm kết thúc không được để trống.")]
        public int NamKetThuc { get; set; }
        public int CTDTID { get; set; }
        public string ChuongTrinhDaoTao { get; set; }
        [Required(ErrorMessage = "Số lượng sinh viên không được để trống.")]
        public int SLSV { get; set; }
        public string NguoiTao { get; set; }

        public string TTSV { get; set; }
    }
}
