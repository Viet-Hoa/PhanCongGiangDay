using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using PhanCongGiangDay.IServices;
using Lib.Setting.Model;
using Lib.NamHoc.DataAccess;
using Lib.NamHoc.IDataAccess;
using Lib.NamHoc.Model;

namespace PhanCongGiangDay.Services
{
    public class NamHocService: INamHocService
    {
        private INamHocDataAccess _NamHocDA;
        private INamHocDataAccess NamHocDA
        {
            get { return _NamHocDA ?? (_NamHocDA = new NamHocDataAccess()); }
        }

        public IEnumerable<NamHocModel> DanhSachNamHoc()
        {
            IEnumerable<NamHocModel> list = null;
            try
            {
                list= NamHocDA.DanhSachNamHoc();                
            }
            catch(Exception ex)
            {
                throw ex;
            }
            return list;
        }
        public NamHocModel ChiTietNamHoc(int BangPhanCongID)
        {
            NamHocModel model = null;
            try
            {
                model = NamHocDA.ChiTietNamHoc(BangPhanCongID);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return model;
        }
        public ResponseResult ThemNamHoc(NamHocModel model)
        {
            ResponseResult res = null;
            try
            {
                res = NamHocDA.ThemNamHoc(model);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return res;
        }
        public ResponseResult SuaNamHoc(NamHocModel model)
        {
            ResponseResult res = null;
            try
            {
                res = NamHocDA.SuaNamHoc(model);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return res;
        }
        public ResponseResult XoaNamHoc(int BangPhanCongID)
        {
            ResponseResult res = null;
            try
            {
                res = NamHocDA.XoaNamHoc(BangPhanCongID);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return res;
        }
    }
}