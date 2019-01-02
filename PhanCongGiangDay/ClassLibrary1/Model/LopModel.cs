using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Lib.Lop.Model
{
    public class LopModel
    {
        public int STT { get; set; }
        public int LopID { get; set; }
        public string MaLop { get; set; }
        public int KhoaID { get; set; }
        public string TenKhoa { get; set; }
        public int GiangVienID { get; set; }
        public string HoTenGV { get; set; }
        public string NguoiTao { get; set; }
        public int TrangThai { get; set; }
    }
}
