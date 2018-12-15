using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Lib.GiangVien.Model;
using Lib.Setting.Model;

namespace PhanCongGiangDay.IServices
{
    public interface IGiangVienService
    {
        IEnumerable<GiangVienModel> DanhSachGiangVien();
        IEnumerable<GiangVienModel> DanhSachGiangVienTheoLoai(int loai);
        IEnumerable<GiangVienModel> DanhSachGiangVienTheoBoMon(int BoMonID);
        GiangVienModel ChiTietGiangVien(int GiangVienID);
        ResponseResult ThemGiangVien(GiangVienModel model);
        ResponseResult SuaGiangVien(GiangVienModel model);
        ResponseResult XoaGiangVien(int id, string NguoiTao);
    }
}
