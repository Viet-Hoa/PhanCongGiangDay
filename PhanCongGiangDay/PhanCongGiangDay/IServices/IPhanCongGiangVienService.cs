using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Lib.PhanCongGiangVien.Model;
using Lib.Setting.Model;
using Lib.GiangVien.Model;
using PhanCongGiangDay.Models.ViewModel.PhanCongGiangVien;

namespace PhanCongGiangDay.IServices
{
    public interface IPhanCongGiangVienService
    {
        IEnumerable<PhanCongGiangVienModel> DanhSachPhanCongGiangVien(int BangPhanCongID, int GiangVienID);
        ResponseResult ThemPhanCongGiangVien(PhanCongGiangVienModel model);
        ResponseResult SuaPhanCongGiangVien(PhanCongGiangVienModel model);
        ResponseResult XoaPhanCongGiangVien(int PhanCongGiangVienID, string NguoiTao);

        IEnumerable<PhanCongCongTacModel> DanhSachPhanCongCongTac(int BangPhanCongID, int GiangVienID);
        ResponseResult ThemPhanCongCongTac(PhanCongCongTacModel model);
        ResponseResult SuaPhanCongCongTac(PhanCongCongTacModel model);

        IEnumerable<PhanCongGiangVienViewModel> DanhSachGiangVienPhanCong(int BangPhanCongID,int Loc);
        PhanCongGiangVienViewModel ChiTietGiangVienPhanCong(int BangPhanCongID, int GiangVienID);
    }
}
