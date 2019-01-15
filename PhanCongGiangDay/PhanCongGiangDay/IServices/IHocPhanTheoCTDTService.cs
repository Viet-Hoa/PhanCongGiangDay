using Lib.HocPhanTheoCTDT.Model;
using Lib.Setting.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PhanCongGiangDay.IServices
{
    public interface IHocPhanTheoCTDTService
    {
        IEnumerable<HocPhanTheoCTDTModel> DanhSachHocPhanTheoCTDT(int ChuongTrinhDaoTaoID);
        ResponseResult ThemHocPhanTheoCTDT(HocPhanTheoCTDTModel model);
        ResponseResult XoaHocPhanTheoCTDT(int id, string NguoiTao);
    }
}
