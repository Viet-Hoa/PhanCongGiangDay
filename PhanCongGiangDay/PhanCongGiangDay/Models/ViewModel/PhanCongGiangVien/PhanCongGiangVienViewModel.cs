using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Lib.PhanCongGiangVien.Model;

namespace PhanCongGiangDay.Models.ViewModel.PhanCongGiangVien
{
    public class PhanCongGiangVienViewModel
    {
        public int STT { get; set; }
        public string HoTenGV { get; set; }
        public int GiangVienLogID { get; set; }
        public string LoaiGV { get; set; }
        public int TongSoTiet { get; set; }
        public int SoTietThucTe { get; set; }
        public List<PhanCongGiangVienModel> NhomLopPhanCong { get; set; }
        public List<PhanCongCongTacModel> CongTacKhac { get; set; }
        public string CongTac { get; set; }
    }
}