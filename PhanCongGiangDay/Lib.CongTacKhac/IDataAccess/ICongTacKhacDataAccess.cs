using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Lib.CongTacKhac.Model;
using Lib.Setting.Model;

namespace Lib.CongTacKhac.IDataAccess
{
    public interface ICongTacKhacDataAccess
    {
        IEnumerable<CongTacKhacModel> DanhSachCongTacKhac();
        CongTacKhacModel ChiTietCongTacKhac(int CongTacKhacID);
        ResponseResult ThemCongTacKhac(CongTacKhacModel model);
        ResponseResult SuaCongTacKhac(CongTacKhacModel model);
        ResponseResult XoaCongTacKhac(int id, string NguoiTao);
    }
}
