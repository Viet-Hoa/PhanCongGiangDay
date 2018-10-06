using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Lib.Khoa.Model;
using Lib.Setting.Model;

namespace PhanCongGiangDay.IServices
{
    public interface IKhoaService
    {
        IEnumerable<KhoaModel> DanhSachKhoa();
        KhoaModel ChiTietKhoa(int KhoaID);
        ResponseResult ThemKhoa(KhoaModel model);
        ResponseResult SuaKhoa(KhoaModel model);
        ResponseResult XoaKhoa(int KhoaID, string NguoiTao);
    }
}
