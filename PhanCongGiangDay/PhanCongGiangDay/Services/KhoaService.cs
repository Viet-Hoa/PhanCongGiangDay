using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using PhanCongGiangDay.IServices;
using Lib.Setting.Model;
using Lib.Khoa.DataAccess;
using Lib.Khoa.IDataAccess;
using Lib.Khoa.Model;

namespace PhanCongGiangDay.Services
{
    public class KhoaService: IKhoaService
    {
        private IKhoaDataAccess _KhoaDA;
        private IKhoaDataAccess KhoaDA
        {
            get { return _KhoaDA ?? (_KhoaDA = new KhoaDataAccess()); }
        }

        public IEnumerable<KhoaModel> DanhSachKhoa()
        {
            IEnumerable<KhoaModel> list = null;
            try
            {
                list= KhoaDA.DanhSachKhoa();                
            }
            catch(Exception ex)
            {
                throw ex;
            }
            return list;
        }
        public KhoaModel ChiTietKhoa(int KhoaID)
        {
            KhoaModel model = null;
            try
            {
                model = KhoaDA.ChiTietKhoa(KhoaID);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return model;
        }
        public ResponseResult ThemKhoa(KhoaModel model)
        {
            ResponseResult res = null;
            try
            {
                res = KhoaDA.ThemKhoa(model);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return res;
        }
        public ResponseResult SuaKhoa(KhoaModel model)
        {
            ResponseResult res = null;
            try
            {
                res = KhoaDA.SuaKhoa(model);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return res;
        }
        public ResponseResult XoaKhoa(int KhoaID, string NguoiTao)
        {
            ResponseResult res = null;
            try
            {
                res = KhoaDA.XoaKhoa(KhoaID,NguoiTao);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return res;
        }
    }
}