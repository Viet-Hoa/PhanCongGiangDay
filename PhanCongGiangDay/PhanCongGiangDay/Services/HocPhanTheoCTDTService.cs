using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Lib.HocPhanTheoCTDT.IDataAccess;
using Lib.HocPhanTheoCTDT.DataAccess;
using Lib.HocPhanTheoCTDT.Model;
using PhanCongGiangDay.IServices;
using Lib.Setting.Model;

namespace PhanCongGiangDay.Services
{
    public class HocPhanTheoCTDTService: IHocPhanTheoCTDTService
    {
        private IHocPhanTheoCTDTDataAccess _hocPhanTheoCTDT_DA;
        private IHocPhanTheoCTDTDataAccess HocPhanTheoCTDT_DA {
            get { return _hocPhanTheoCTDT_DA ?? (_hocPhanTheoCTDT_DA = new HocPhanTheoCTDTDataAccess()); }
        }

        public IEnumerable<HocPhanTheoCTDTModel> DanhSachHocPhanTheoCTDT(int ChuongTrinhDaoTaoID)
        {
            IEnumerable<HocPhanTheoCTDTModel> list = null;
            try
            {
                list = HocPhanTheoCTDT_DA.DanhSachHocPhanTheoCTDT(ChuongTrinhDaoTaoID);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return list;
        }
        public ResponseResult ThemHocPhanTheoCTDT(HocPhanTheoCTDTModel model)
        {
            ResponseResult res = null;
            try
            {
                res = HocPhanTheoCTDT_DA.ThemHocPhanTheoCTDT(model);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return res;
        }
        public ResponseResult XoaHocPhanTheoCTDT(int id, string NguoiTao)
        {
            ResponseResult res = null;
            try
            {
                res = HocPhanTheoCTDT_DA.XoaHocPhanTheoCTDT(id, NguoiTao);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return res;
        }
    }
}