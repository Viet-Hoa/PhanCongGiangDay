using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using PhanCongGiangDay.IServices;
using Lib.Setting.Model;
using Lib.DonVi.DataAccess;
using Lib.DonVi.IDataAccess;
using Lib.DonVi.Model;

namespace PhanCongGiangDay.Services
{
    public class DonViService: IDonViService
    {
        private IDonViDataAccess _donViDA;
        private IDonViDataAccess DonViDA
        {
            get { return _donViDA ?? (_donViDA = new DonViDataAccess()); }
        }

        public IEnumerable<DonviModel> DanhSachDonvi()
        {
            IEnumerable<DonviModel> list = null;
            try
            {
                list= DonViDA.DanhSachDonvi();                
            }
            catch(Exception ex)
            {
                throw ex;
            }
            return list;
        }
        public DonviModel ChiTietDonvi(int DonViID)
        {
            DonviModel model = null;
            try
            {
                model = DonViDA.ChiTietDonvi(DonViID);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return model;
        }
        public ResponseResult ThemDonvi(DonviModel model)
        {
            ResponseResult res = null;
            try
            {
                res = DonViDA.ThemDonvi(model);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return res;
        }
        public ResponseResult SuaDonvi(DonviModel model)
        {
            ResponseResult res = null;
            try
            {
                res = DonViDA.SuaDonvi(model);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return res;
        }
        public ResponseResult XoaDonvi(int DonViID, string NguoiTao)
        {
            ResponseResult res = null;
            try
            {
                res = DonViDA.XoaDonvi(DonViID,NguoiTao);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return res;
        }
    }
}