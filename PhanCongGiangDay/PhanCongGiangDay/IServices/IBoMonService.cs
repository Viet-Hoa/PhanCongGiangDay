using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Lib.BoMon.Model;
using Lib.Setting.Model;

namespace PhanCongGiangDay.IServices
{
    public interface IBoMonService
    {
        IEnumerable<BoMonModel> DanhSachBoMon();
        BoMonModel ChiTietBoMon(int BoMonID);
        ResponseResult ThemBoMon(BoMonModel model);
        ResponseResult SuaBoMon(BoMonModel model);
        ResponseResult XoaBoMon(int BoMonID, string NguoiTao);
    }
}
