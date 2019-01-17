using Lib.HocPhanTheoCTDT.Model;
using Lib.Setting.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace PhanCongGiangDay.IServices
{
    public interface IHocPhanTheoCTDTService
    {
        IEnumerable<HocPhanTheoCTDTModel> DanhSachHocPhanTheoCTDT(int ChuongTrinhDaoTaoID);
        ResponseResult ThemHocPhanTheoCTDT(HocPhanTheoCTDTModel model);
        ResponseResult XoaHocPhanTheoCTDT(int id, string NguoiTao);
        ResponseResult Import(HttpPostedFileBase file, int CTDTID);

    }
}
