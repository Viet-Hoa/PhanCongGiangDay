using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Lib.Lop.IDataAccess;
using Lib.Lop.Model;

namespace Lib.Lop.DataAccess
{
    public class LopDataAccess : ILopDataAccess
    {
        LopModel ILopDataAccess.ChiTietLop(int CTDTID)
        {
            throw new NotImplementedException();
        }

        IEnumerable<LopModel> ILopDataAccess.DanhSachLop()
        {
            throw new NotImplementedException();
        }

        ResponseResult ILopDataAccess.SuaLop(LopModel model)
        {
            throw new NotImplementedException();
        }

        ResponseResult ILopDataAccess.ThemLop(LopModel model)
        {
            throw new NotImplementedException();
        }

        ResponseResult ILopDataAccess.XoaLop(int LopID, string NguoiTao)
        {
            throw new NotImplementedException();
        }
    }
}
