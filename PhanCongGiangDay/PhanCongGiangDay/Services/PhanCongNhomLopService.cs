﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using PhanCongGiangDay.IServices;
using Lib.Setting.Model;
using Lib.PhanCongNhomLop.DataAccess;
using Lib.PhanCongNhomLop.IDataAccess;
using Lib.PhanCongNhomLop.Model;
using PhanCongGiangDay.UtilityHelpers;

namespace PhanCongGiangDay.Services
{
    public class PhanCongNhomLopService: IPhanCongNhomLopService
    {
        private IPhanCongNhomLopDataAccess _PhanCongNhomLopDA;
        private IPhanCongNhomLopDataAccess PhanCongNhomLopDA
        {
            get { return _PhanCongNhomLopDA ?? (_PhanCongNhomLopDA = new PhanCongNhomLopDataAccess()); }
        }

        public IEnumerable<PhanCongNhomLopModel> DanhSachPhanCongNhomLop(int BangPhanCongID, int? KhoaID, int? BoMonID)
        {
            IEnumerable<PhanCongNhomLopModel> list = null;
            try
            {
                list= PhanCongNhomLopDA.DanhSachPhanCongNhomLop(BangPhanCongID,KhoaID,BoMonID);                
            }
            catch(Exception ex)
            {
                throw ex;
            }
            return list;
        }
        public IEnumerable<PhanCongNhomLopModel> DanhSachPhanCongNhomLopTuDong(int BangPhanCongID)
        {
            IEnumerable<PhanCongNhomLopModel> list = null;
            try
            {
                list = PhanCongNhomLopDA.DanhSachPhanCongNhomLopTuDong(BangPhanCongID);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return list;
        }
        public PhanCongNhomLopModel ChiTietPhanCongNhomLop(int PhanCongNhomLopID)
        {
            PhanCongNhomLopModel model = null;
            try
            {
                model = PhanCongNhomLopDA.ChiTietPhanCongNhomLop(PhanCongNhomLopID);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return model;
        }
        public ResponseResult ThemPhanCongNhomLop(PhanCongNhomLopModel model)
        {
            ResponseResult res = null;
            try
            {
                model.NguoiTao = AccountUtils.CurrentUsername();
                res = PhanCongNhomLopDA.ThemPhanCongNhomLop(model);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return res;
        }
        public ResponseResult SuaPhanCongNhomLop(PhanCongNhomLopModel model)
        {
            ResponseResult res = null;
            try
            {
                res = PhanCongNhomLopDA.SuaPhanCongNhomLop(model);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return res;
        }
        public ResponseResult XoaPhanCongNhomLop(int PhanCongNhomLopID, string NguoiTao)
        {
            ResponseResult res = null;
            try
            {
                res = PhanCongNhomLopDA.XoaPhanCongNhomLop(PhanCongNhomLopID,NguoiTao);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return res;
        }
    }
}