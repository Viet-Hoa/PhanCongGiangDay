using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Lib.CTDT.Model;
using Lib.Setting.Model;

namespace Lib.CTDT.IDataAccess
{
    public interface ICTDTDataAccess
    {
        IEnumerable<CTDTModel> DanhSachCTDT();
        IEnumerable<CTDTModel> DanhSachCTDTTheoHocPhan(int HocPhanID);
        CTDTModel ChiTietCTDT(int CTDTID);
        ResponseResult ThemCTDT(CTDTModel model);
        ResponseResult SuaCTDT(CTDTModel model);
        ResponseResult XoaCTDT(int CTDTID, string NguoiTao);
    }
}
