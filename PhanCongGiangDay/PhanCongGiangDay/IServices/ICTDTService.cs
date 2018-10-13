using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Lib.CTDT.Model;
using Lib.Setting.Model;

namespace PhanCongGiangDay.IServices
{
    public interface ICTDTService
    {
        IEnumerable<CTDTModel> DanhSachCTDT();
        CTDTModel ChiTietCTDT(int CTDTID);
        ResponseResult ThemCTDT(CTDTModel model);
        ResponseResult SuaCTDT(CTDTModel model);
        ResponseResult XoaCTDT(int CTDTID, string NguoiTao);
    }
}
