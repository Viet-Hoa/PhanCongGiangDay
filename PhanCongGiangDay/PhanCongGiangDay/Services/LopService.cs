using Lib.Lop.IDataAccess;
using Lib.Lop.LopDataAccess;
using Lib.Lop.Model;
using Lib.Setting.Model;
using System;
using System.Collections.Generic;
using PhanCongGiangDay.IServices;

namespace PhanCongGiangDay.Services
{
    public class LopService: ILopService
    {
        private ILopDataAccess _LopDA;
        private ILopDataAccess LopDA
        {
            get { return _LopDA ?? (_LopDA = new LopDataAccess()); }
        }

        public IEnumerable<LopModel> DanhSachLop()
        {
            IEnumerable<LopModel> list = null;
            try
            {
                list = LopDA.DanhSachLop();
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return list;
        }
        public LopModel ChiTietLop(int LopID)
        {
            LopModel model = null;
            try
            {
                model = LopDA.ChiTietLop(LopID);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return model;
        }
        public ResponseResult ThemLop(LopModel model)
        {
            ResponseResult res = null;
            try
            {
                res = LopDA.ThemLop(model);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return res;
        }
        public ResponseResult SuaLop(LopModel model)
        {
            ResponseResult res = null;
            try
            {
                res = LopDA.SuaLop(model);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return res;
        }
        public ResponseResult XoaLop(int LopID, string NguoiTao)
        {
            ResponseResult res = null;
            try
            {
                res = LopDA.XoaLop(LopID, NguoiTao);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return res;
        }
    }
}