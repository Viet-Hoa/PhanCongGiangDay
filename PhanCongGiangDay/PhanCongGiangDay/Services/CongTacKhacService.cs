using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using PhanCongGiangDay.IServices;
using Lib.Setting.Model;
using Lib.CongTacKhac.DataAccess;
using Lib.CongTacKhac.IDataAccess;
using Lib.CongTacKhac.Model;

namespace PhanCongGiangDay.Services
{
    public class CongTacKhacService: ICongTacKhacService
    {
        private ICongTacKhacDataAccess _CongTacKhacDA;
        private ICongTacKhacDataAccess CongTacKhacDA
        {
            get { return _CongTacKhacDA ?? (_CongTacKhacDA = new CongTacKhacDataAccess()); }
        }

        public IEnumerable<CongTacKhacModel> DanhSachCongTacKhac()
        {
            IEnumerable<CongTacKhacModel> list = null;
            try
            {
                list= CongTacKhacDA.DanhSachCongTacKhac();                
            }
            catch(Exception ex)
            {
                throw ex;
            }
            return list;
        }        
        public CongTacKhacModel ChiTietCongTacKhac(int CongTacKhacID)
        {
            CongTacKhacModel model = null;
            try
            {
                model = CongTacKhacDA.ChiTietCongTacKhac(CongTacKhacID);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return model;
        }
        public ResponseResult ThemCongTacKhac(CongTacKhacModel model)
        {
            ResponseResult res = null;
            try
            {
                res = CongTacKhacDA.ThemCongTacKhac(model);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return res;
        }
        public ResponseResult SuaCongTacKhac(CongTacKhacModel model)
        {
            ResponseResult res = null;
            try
            {
                res = CongTacKhacDA.SuaCongTacKhac(model);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return res;
        }
        public ResponseResult XoaCongTacKhac(int CongTacKhacID, string NguoiTao)
        {
            ResponseResult res = null;
            try
            {
                res = CongTacKhacDA.XoaCongTacKhac(CongTacKhacID,NguoiTao);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return res;
        }
    }
}