using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Lib.DonVi.Model;
using Lib.Setting.Model;

namespace PhanCongGiangDay.IServices
{
    public interface IDonViService
    {
        IEnumerable<DonviModel> DanhSachDonvi();
        DonviModel ChiTietDonvi(int DonViID);
        ResponseResult ThemDonvi(DonviModel model);
        ResponseResult SuaDonvi(DonviModel model);
        ResponseResult XoaDonvi(int DonViID, string NguoiTao);
    }
}
