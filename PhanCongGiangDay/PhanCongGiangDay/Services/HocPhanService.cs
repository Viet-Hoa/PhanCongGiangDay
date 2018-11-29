using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using PhanCongGiangDay.IServices;
using Lib.Setting.Model;
using Lib.HocPhan.DataAccess;
using Lib.HocPhan.IDataAccess;
using Lib.HocPhan.Model;

namespace PhanCongGiangDay.Services
{
    public class HocPhanService: IHocPhanService
    {
        private IHocPhanDataAccess _HocPhanDA;
        private IHocPhanDataAccess HocPhanDA
        {
            get { return _HocPhanDA ?? (_HocPhanDA = new HocPhanDataAccess()); }
        }

        public IEnumerable<HocPhanModel> DanhSachHocPhan()
        {
            IEnumerable<HocPhanModel> list = null;
            try
            {
                list= HocPhanDA.DanhSachHocPhan();                
            }
            catch(Exception ex)
            {
                throw ex;
            }
            return list;
        }
        public IEnumerable<HocPhanModel> DanhSachHocPhanTheoCTDT(int CTDTID)
        {
            IEnumerable<HocPhanModel> list = null;
            try
            {
                list = HocPhanDA.DanhSachHocPhanTheoCTDT(CTDTID);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return list;
        }
        public IEnumerable<HocPhanModel> DanhSachHocPhanTheoKhoa(int? Khoa)
        {
            IEnumerable<HocPhanModel> list = null;
            try
            {
                list = HocPhanDA.DanhSachHocPhanTheoKhoa(Khoa);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return list;
        }
        public IEnumerable<HocPhanModel> DanhSachHocPhanTheoBoMon(int BoMonID)
        {
            IEnumerable<HocPhanModel> list = null;
            try
            {
                list = HocPhanDA.DanhSachHocPhanTheoBoMon(BoMonID);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return list;
        }
        public HocPhanModel ChiTietHocPhan(int HocPhanID)
        {
            HocPhanModel model = null;
            try
            {
                model = HocPhanDA.ChiTietHocPhan(HocPhanID);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return model;
        }
        public HocPhanModel ChiTietHocPhanLog(int HocPhanLogID)
        {
            HocPhanModel model = null;
            try
            {
                model = HocPhanDA.ChiTietHocPhanLog(HocPhanLogID);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return model;
        }
        public ResponseResult ThemHocPhan(HocPhanModel model)
        {
            ResponseResult res = null;
            try
            {
                res = HocPhanDA.ThemHocPhan(model);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return res;
        }
        public ResponseResult SuaHocPhan(HocPhanModel model)
        {
            ResponseResult res = null;
            try
            {
                res = HocPhanDA.SuaHocPhan(model);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return res;
        }
        public ResponseResult XoaHocPhan(int HocPhanID, string NguoiTao)
        {
            ResponseResult res = null;
            try
            {
                res = HocPhanDA.XoaHocPhan(HocPhanID,NguoiTao);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return res;
        }
    }
}