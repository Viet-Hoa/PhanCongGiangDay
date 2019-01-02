using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Lib.Lop.Model;
using Lib.Setting.Model;

namespace PhanCongGiangDay.IServices
{
    public interface ILopService
    {
        IEnumerable<LopModel> DanhSachLop();
        LopModel ChiTietLop(int LopID);
        ResponseResult ThemLop(LopModel model);
        ResponseResult SuaLop(LopModel model);
        ResponseResult XoaLop(int LopID, string NguoiTao);
    }
}
