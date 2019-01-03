using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Lib.PhanCongNhomLop.Model;
using Lib.Setting.Model;

namespace PhanCongGiangDay.IServices
{
    public interface IPhanCongNhomLopService
    {
        IEnumerable<PhanCongNhomLopModel> DanhSachPhanCongNhomLop(int BangPhanCongID, int? KhoaID, int? BoMonID);
        PhanCongNhomLopModel ChiTietPhanCongNhomLop(int PhanCongNhomLopID);
        ResponseResult ThemPhanCongNhomLop(PhanCongNhomLopModel model);
        ResponseResult SuaPhanCongNhomLop(PhanCongNhomLopModel model);
        ResponseResult XoaPhanCongNhomLop(int PhanCongNhomLopID, string NguoiTao);
    }
}
