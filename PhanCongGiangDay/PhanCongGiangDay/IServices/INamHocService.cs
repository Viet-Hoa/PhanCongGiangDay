using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Lib.NamHoc.Model;
using Lib.Setting.Model;

namespace PhanCongGiangDay.IServices
{
    public interface INamHocService
    {
        IEnumerable<NamHocModel> DanhSachNamHoc();
        NamHocModel ChiTietNamHoc(int BangPhanCongID);
        ResponseResult ThemNamHoc(NamHocModel model);
        ResponseResult SuaNamHoc(NamHocModel model);
    }
}
