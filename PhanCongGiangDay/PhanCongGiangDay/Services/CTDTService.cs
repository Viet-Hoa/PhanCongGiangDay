using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using PhanCongGiangDay.IServices;
using Lib.Setting.Model;
using Lib.CTDT.DataAccess;
using Lib.CTDT.IDataAccess;
using Lib.CTDT.Model;


namespace PhanCongGiangDay.Services
{
    public class CTDTService: ICTDTService
    {
        private ICTDTDataAccess _CTDTDA;
        private ICTDTDataAccess CTDTDA
        {
            get { return _CTDTDA ?? (_CTDTDA = new CTDTDataAccess()); }
        }

        public IEnumerable<CTDTModel> DanhSachCTDT()
        {
            IEnumerable<CTDTModel> list = null;
            try
            {
                list= CTDTDA.DanhSachCTDT();                
            }
            catch(Exception ex)
            {
                throw ex;
            }
            return list;
        }
        public CTDTModel ChiTietCTDT(int CTDTID)
        {
            CTDTModel model = null;
            try
            {
                model = CTDTDA.ChiTietCTDT(CTDTID);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return model;
        }
        public ResponseResult ThemCTDT(CTDTModel model)
        {
            ResponseResult res = null;
            try
            {
                res = CTDTDA.ThemCTDT(model);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return res;
        }
        public ResponseResult SuaCTDT(CTDTModel model)
        {
            ResponseResult res = null;
            try
            {
                res = CTDTDA.SuaCTDT(model);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return res;
        }
        public ResponseResult XoaCTDT(int CTDTID, string NguoiTao)
        {
            ResponseResult res = null;
            try
            {
                res = CTDTDA.XoaCTDT(CTDTID,NguoiTao);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return res;
        }

        
    }
}