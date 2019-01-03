using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Lib.PhanCongGiangVien.Model;
using Lib.GiangVien.Model;
using Lib.Setting.Model;

namespace Lib.PhanCongGiangVien.IDataAccess
{
    public interface IPhanCongGiangVienDataAccess
    {
        IEnumerable<PhanCongGiangVienModel> DanhSachPhanCongGiangVien(int BangPhanCongID, int GiangVienID);
        IEnumerable<PhanCongGiangVienModel> DanhSachPhanCongGiangVienTheoNhomLop(int BangPhanCongID, int PhanCongNhomLopID);
        ResponseResult ThemPhanCongGiangVien(PhanCongGiangVienModel model);
        ResponseResult SuaPhanCongGiangVien(PhanCongGiangVienModel model);
        ResponseResult XoaPhanCongGiangVien(int id, string NguoiTao);

        IEnumerable<PhanCongCongTacModel> DanhSachPhanCongCongTac(int BangPhanCongID, int GiangVienID);
        ResponseResult ThemPhanCongCongTac(PhanCongCongTacModel model);
        ResponseResult SuaPhanCongCongTac(PhanCongCongTacModel model);

        IEnumerable<GiangVienModel> DanhSachGiangVienPhanCong(int BangPhanCongID, int Loc);
        GiangVienModel ChiTietGiangVienPhanCong(int BangPhanCongID, int GiangVienID);
    }
}
