using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace Lib.GiangVien.Model
{
    public class GiangVienModel
    {
        public int STT { get; set; }
        public int GiangVienID { get; set; }
        public string MaCB { get; set; }
        public string Ho { get; set; }
        public string Ten { get; set; }
        public int NamSinh { get; set; }
        public string ChucDanh { get; set; }
        public string HocVi { get; set; }
        public string ChucVu { get; set; }
        public int DonViID { get; set; }
        public int BoMonID { get; set; }
        public string Truong { get; set; }
        public string NguoiTao { get; set; }
        public int TrangThai { get; set; }
        public int TongSoTiet { get; set; }
        public int TongSoTietThucTe { get; set; }
        public int GiangVienLogID { get; set; }

        public string LoaiGV { get; set; }
    }
}
