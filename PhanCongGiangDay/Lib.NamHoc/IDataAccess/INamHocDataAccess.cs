using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Lib.NamHoc.Model;
using Lib.Setting.Model;

namespace Lib.NamHoc.IDataAccess
{
    public interface INamHocDataAccess
    {
        IEnumerable<NamHocModel> DanhSachNamHoc();
        NamHocModel ChiTietNamHoc(int BangPhanCongID);
        ResponseResult ThemNamHoc(NamHocModel model);
        ResponseResult SuaNamHoc(NamHocModel model);
        ResponseResult XoaNamHoc(int BangPhanCongID);
    }
}
