using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using PhanCongGiangDay.IServices;
using Lib.Setting.Model;
using Lib.GiangVien.DataAccess;
using Lib.GiangVien.IDataAccess;
using Lib.GiangVien.Model;
using PhanCongGiangDay.UtilityHelpers;

namespace PhanCongGiangDay.Services
{
    public class GiangVienService: IGiangVienService
    {
        private IGiangVienDataAccess _GiangVienDA;
        private IGiangVienDataAccess GiangVienDA
        {
            get { return _GiangVienDA ?? (_GiangVienDA = new GiangVienDataAccess()); }
        }

        public IEnumerable<GiangVienModel> DanhSachGiangVien()
        {
            IEnumerable<GiangVienModel> list = null;
            try
            {
                list= GiangVienDA.DanhSachGiangVien();                
            }
            catch(Exception ex)
            {
                throw ex;
            }
            return list;
        }
        public IEnumerable<GiangVienModel> DanhSachGiangVienTheoLoai(int loai)
        {
            IEnumerable<GiangVienModel> list = null;
            try
            {
                list = GiangVienDA.DanhSachGiangVienTheoLoai(loai);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return list;
        }
        public IEnumerable<GiangVienModel> DanhSachGiangVienTheoBoMon(int BoMonID)
        {
            IEnumerable<GiangVienModel> list = null;
            try
            {
                list = GiangVienDA.DanhSachGiangVienTheoBoMon(BoMonID);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return list;
        }
        public GiangVienModel ChiTietGiangVien(int GiangVienID)
        {
            GiangVienModel model = null;
            try
            {
                model = GiangVienDA.ChiTietGiangVien(GiangVienID);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return model;
        }
        public ResponseResult ThemGiangVien(GiangVienModel model)
        {
            ResponseResult res = null;
            try
            {
                model.NguoiTao = AccountUtils.CurrentUsername();
                res = GiangVienDA.ThemGiangVien(model);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return res;
        }
        public ResponseResult SuaGiangVien(GiangVienModel model)
        {
            ResponseResult res = null;
            try
            {
                res = GiangVienDA.SuaGiangVien(model);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return res;
        }
        public ResponseResult XoaGiangVien(int GiangVienID, string NguoiTao)
        {
            ResponseResult res = null;
            try
            {
                res = GiangVienDA.XoaGiangVien(GiangVienID,NguoiTao);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return res;
        }
    }
}