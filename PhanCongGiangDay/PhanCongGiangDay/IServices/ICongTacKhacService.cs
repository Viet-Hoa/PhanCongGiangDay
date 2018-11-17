using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Lib.CongTacKhac.Model;
using Lib.Setting.Model;

namespace PhanCongGiangDay.IServices
{
    public interface ICongTacKhacService
    {
        IEnumerable<CongTacKhacModel> DanhSachCongTacKhac();
        CongTacKhacModel ChiTietCongTacKhac(int CongTacKhacID);
        ResponseResult ThemCongTacKhac(CongTacKhacModel model);
        ResponseResult SuaCongTacKhac(CongTacKhacModel model);
        ResponseResult XoaCongTacKhac(int CongTacKhacID, string NguoiTao);
    }
}
