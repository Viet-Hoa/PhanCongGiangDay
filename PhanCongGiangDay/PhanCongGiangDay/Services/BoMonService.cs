using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using PhanCongGiangDay.IServices;
using Lib.Setting.Model;
using Lib.BoMon.DataAccess;
using Lib.BoMon.IDataAccess;
using Lib.BoMon.Model;

namespace PhanCongGiangDay.Services
{
    public class BoMonService: IBoMonService
    {
        private IBoMonDataAccess _BoMonDA;
        private IBoMonDataAccess BoMonDA
        {
            get { return _BoMonDA ?? (_BoMonDA = new BoMonDataAccess()); }
        }

        public IEnumerable<BoMonModel> DanhSachBoMon()
        {
            IEnumerable<BoMonModel> list = null;
            try
            {
                list= BoMonDA.DanhSachBoMon();                
            }
            catch(Exception ex)
            {
                throw ex;
            }
            return list;
        }        
        public BoMonModel ChiTietBoMon(int BoMonID)
        {
            BoMonModel model = null;
            try
            {
                model = BoMonDA.ChiTietBoMon(BoMonID);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return model;
        }
        public ResponseResult ThemBoMon(BoMonModel model)
        {
            ResponseResult res = null;
            try
            {
                res = BoMonDA.ThemBoMon(model);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return res;
        }
        public ResponseResult SuaBoMon(BoMonModel model)
        {
            ResponseResult res = null;
            try
            {
                res = BoMonDA.SuaBoMon(model);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return res;
        }
        public ResponseResult XoaBoMon(int BoMonID, string NguoiTao)
        {
            ResponseResult res = null;
            try
            {
                res = BoMonDA.XoaBoMon(BoMonID,NguoiTao);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return res;
        }
    }
}