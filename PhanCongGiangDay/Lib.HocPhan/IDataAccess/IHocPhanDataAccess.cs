using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Lib.HocPhan.Model;
using Lib.Setting.Model;

namespace Lib.HocPhan.IDataAccess
{
    public interface IHocPhanDataAccess
    {
        IEnumerable<HocPhanModel> DanhSachHocPhan();
        IEnumerable<HocPhanModel> DanhSachHocPhanTheoCTDT(int CTDTID);
        IEnumerable<HocPhanModel> DanhSachHocPhanTheoKhoa(int? KhoaID);
        IEnumerable<HocPhanModel> DanhSachHocPhanTheoBoMon(int BoMonID);
        HocPhanModel ChiTietHocPhan(int HocPhanID);
        HocPhanModel ChiTietHocPhanLog(int HocPhanLogID);
        ResponseResult ThemHocPhan(HocPhanModel model);
        ResponseResult SuaHocPhan(HocPhanModel model);
        ResponseResult XoaHocPhan(int HocPhanID, string NguoiTao);
    }
}
