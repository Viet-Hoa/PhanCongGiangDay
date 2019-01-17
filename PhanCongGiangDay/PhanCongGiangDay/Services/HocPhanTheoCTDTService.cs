using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Lib.HocPhanTheoCTDT.IDataAccess;
using Lib.HocPhanTheoCTDT.DataAccess;
using Lib.HocPhanTheoCTDT.Model;
using PhanCongGiangDay.IServices;
using Lib.Setting.Model;
using ClosedXML;
using System.IO;
using ClosedXML.Excel;
using PhanCongGiangDay.UtilityHelpers;
namespace PhanCongGiangDay.Services
{
    public class HocPhanTheoCTDTService: IHocPhanTheoCTDTService
    {
        private IHocPhanTheoCTDTDataAccess _hocPhanTheoCTDT_DA;
        private IHocPhanTheoCTDTDataAccess HocPhanTheoCTDT_DA {
            get { return _hocPhanTheoCTDT_DA ?? (_hocPhanTheoCTDT_DA = new HocPhanTheoCTDTDataAccess()); }
        }

        public IEnumerable<HocPhanTheoCTDTModel> DanhSachHocPhanTheoCTDT(int ChuongTrinhDaoTaoID)
        {
            IEnumerable<HocPhanTheoCTDTModel> list = null;
            try
            {
                list = HocPhanTheoCTDT_DA.DanhSachHocPhanTheoCTDT(ChuongTrinhDaoTaoID);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return list;
        }
        public ResponseResult ThemHocPhanTheoCTDT(HocPhanTheoCTDTModel model)
        {
            ResponseResult res = null;
            try
            {
                model.NguoiTao = AccountUtils.CurrentUsername();
                res = HocPhanTheoCTDT_DA.ThemHocPhanTheoCTDT(model);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return res;
        }
        public ResponseResult XoaHocPhanTheoCTDT(int id, string NguoiTao)
        {
            ResponseResult res = null;
            try
            {
                res = HocPhanTheoCTDT_DA.XoaHocPhanTheoCTDT(id, NguoiTao);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return res;
        }

        public ResponseResult Import(HttpPostedFileBase file, int CTDTID)
        {
            ResponseResult res = null;
            string s = "";
            try
            {
                file.InputStream.Position = 0;
                var memoryStream = new MemoryStream();
                file.InputStream.CopyTo(memoryStream);
                using (XLWorkbook workBook = new XLWorkbook(memoryStream))
                {
                    //Read the first Sheet from Excel file.
                    IXLWorksheet workSheet = workBook.Worksheet(1);
                    List<HocPhanTheoCTDTModel> dt = new List<HocPhanTheoCTDTModel>();
                    foreach (IXLRow row in workSheet.Rows())
                    {
                        int i = 0;
                        if (!String.IsNullOrEmpty(row.Cell(3).ToString()) && int.TryParse(row.Cell(3).ToString(), out i))
                        {
                            var a = new HocPhanTheoCTDTModel();
                            a.ChuongTrinhDaoTaoID = CTDTID;
                            a.MaHP = row.Cell(3).ToString();
                            a.HocKi = "";
                            if (!String.IsNullOrEmpty(row.Cell(5).ToString()))
                                a.HocKi += "1,";
                            if (!String.IsNullOrEmpty(row.Cell(6).ToString()))
                                a.HocKi += "2,";
                            if (!String.IsNullOrEmpty(row.Cell(7).ToString()))
                                a.HocKi += "3,";
                            if (!String.IsNullOrEmpty(row.Cell(8).ToString()))
                                a.HocKi += "4,";
                            if (!String.IsNullOrEmpty(row.Cell(9).ToString()))
                                a.HocKi += "5,";
                            if (!String.IsNullOrEmpty(row.Cell(10).ToString()))
                                a.HocKi += "6,";
                            if (!String.IsNullOrEmpty(row.Cell(11).ToString()))
                                a.HocKi += "7,";
                            if (!String.IsNullOrEmpty(row.Cell(12).ToString()))
                                a.HocKi += "8,";
                            if (!String.IsNullOrEmpty(row.Cell(13).ToString()))
                                a.HocKi += "9,";
                            a.HocKi = a.HocKi.Remove(a.HocKi.LastIndexOf(','));
                            a.NguoiTao = AccountUtils.CurrentUsername();

                            if (dt.Where(x => x.MaHP == a.MaHP) != null)
                                dt.Add(a);
                            foreach(var item in dt)
                            {
                                if (dt.Where(x => x.MaHP == a.MaHP) != null)
                                {
                                    item.HocKi = a.HocKi;
                                    break;
                                }
                            }
                        }
                        foreach(var item in dt)
                        {
                            res = HocPhanTheoCTDT_DA.ThemHocPhanTheoCTDT(item);
                            if (res.ResponseMessage != null)
                                s += res.ResponseMessage + ", ";
                            else if (res == null)
                                break;
                        }
                    }
                    if (s != "")
                    {
                        s = s.Remove(s.LastIndexOf(','));
                        if (res != null)
                            res.ResponseMessage = s;
                    }
                }                
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return res;
        }
    }
}