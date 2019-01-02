using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Lib.Lop.Model;

namespace Lib.Lop.IDataAccess
{
    public interface ILopDataAccess
    {
        IEnumerable<LopModel> DanhSachLop();
        LopModel ChiTietLop(int CTDTID);
        ResponseResult ThemLop(LopModel model);
        ResponseResult SuaLop(LopModel model);
        ResponseResult XoaLop(int LopID, string NguoiTao);
    }
}
