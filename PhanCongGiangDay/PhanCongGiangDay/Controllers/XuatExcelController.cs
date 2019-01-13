using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using PhanCongGiangDay.IServices;
using PhanCongGiangDay.Services;
using PhanCongGiangDay.Models.ViewModel.XuatExcel;
using PhanCongGiangDay.Infrastructure.Attributes;
namespace PhanCongGiangDay.Controllers
{
    [CustomLoginAuthorize]
    public class XuatExcelController : BizController
    {
        private IXuatExcelService _XuatExcelService;
        private IXuatExcelService XuatExcelService => _XuatExcelService ?? (_XuatExcelService = new XuatExcelService());

        private INamHocService _namHocService;
        private INamHocService NamHocService => _namHocService ?? (_namHocService = new NamHocService());
        private IGiangVienService _giangVienService;
        private IGiangVienService GiangVienService => _giangVienService ?? (_giangVienService = new GiangVienService());

        public ActionResult Index()
        {
            ViewBag.namhocddl = new SelectList(NamHocService.DanhSachNamHoc(), "BangPhanCOngID", "NamHoc");
            return View();
        }

        public ActionResult XuatExcelMau04(int BangPhanCongID)
        {
            var content = XuatExcelService.XuatExcelMau04(BangPhanCongID);
            var fileName = "KeHoachThinhGiang_Mau04_" + DateTime.Now.ToString("ddMMyyyyhhmmss") + ".xlsx";
            return File(content, "application/vnd.ms-excel", fileName);
        }
        public ActionResult XuatExcelMau03(int BangPhanCongID)
        {
            var content = XuatExcelService.XuatExcelMau03(BangPhanCongID);
            var fileName = "KeHoachMoiGiang_Mau03_" + DateTime.Now.ToString("ddMMyyyyhhmmss") + ".xlsx";
            return File(content, "application/vnd.ms-excel", fileName);
        }
        public ActionResult XuatExcelMau02(int BangPhanCongID)
        {
            var content = XuatExcelService.XuatExcelMau02(BangPhanCongID);
            var fileName = "BangPhanCongCongTacCanBoGiangVienCoHuu_Mau02_" + DateTime.Now.ToString("ddMMyyyyhhmmss") + ".xlsx";
            return File(content, "application/vnd.ms-excel", fileName);
        }
        public ActionResult XuatExcelMau01_HK1(int BangPhanCongID)
        {
            var content = XuatExcelService.XuatExcelMau01(BangPhanCongID,1);
            var fileName = "KeHoachMoMonChuyenNganh_Mau01_HK1_" + DateTime.Now.ToString("ddMMyyyyhhmmss") + ".xlsx";
            return File(content, "application/vnd.ms-excel", fileName);
        }
        public ActionResult XuatExcelMau01_HK2(int BangPhanCongID)
        {
            var content = XuatExcelService.XuatExcelMau01(BangPhanCongID,2);
            var fileName = "KeHoachMoMonChuyenNganh_Mau01_HK2_" + DateTime.Now.ToString("ddMMyyyyhhmmss") + ".xlsx";
            return File(content, "application/vnd.ms-excel", fileName);
        }
        public ActionResult XuatExcelMauBoMon(int BangPhanCongID)
        {
            var content = XuatExcelService.XuatExcelMauBoMon(BangPhanCongID);
            var fileName = "BangPhanCongCongTacCanBoGiangVienCoHuu_MauBoMon_" + DateTime.Now.ToString("ddMMyyyyhhmmss") + ".xlsx";
            return File(content, "application/vnd.ms-excel", fileName);
        }
        public ActionResult XuatExcelPhanCong(int BangPhanCongID, string NamHoc)
        {
            var content = XuatExcelService.XuatExcelPhanCong(BangPhanCongID);
            var fileName = "BangPhanCongCongTac_" + NamHoc + "_" + DateTime.Now.ToString("ddMMyyyyhhmmss") + ".xlsx";
            return File(content, "application/vnd.ms-excel", fileName);
        }
        [HttpGet]
        public ActionResult XuatExcelMauGiangVien()
        {
            var ds = GiangVienService.DanhSachGiangVienTheoLoai(2).ToList().OrderBy(x=>x.MaCB);
            var viewmodel = new List<GiangVienCheckViewModel>();
            foreach(var item in ds)
            {
                var add = new GiangVienCheckViewModel();
                add.GiangVienID = item.GiangVienID;
                add.GiangVien = item.MaCB + " - " + item.Ho + " " + item.Ten;
                viewmodel.Add(add);
            }
            return PartialView("_MauGiangVien", viewmodel);
        }
        [HttpPost]
        public ActionResult XuatExcelMauGiangVien(int BangPhanCongID, List<GiangVienCheckViewModel> model)
        {
            List<int> list = new List<int>();
            foreach (var item in model)
            {
                if (item.check)
                    list.Add(item.GiangVienID);
            }
            var content = XuatExcelService.XuatExcelMauGiangVien(BangPhanCongID, list);
            string fileName = "";
            if(list.Count==1)
            {
                fileName = "BangPhanCongCongTacCanBoGiangVienCoHuu_MauGiangVien_" + DateTime.Now.ToString("ddMMyyyyhhmmss") + ".xlsx";
                return File(content, "application/vnd.ms-excel", fileName);
            }
            fileName = "BangPhanCongCongTacCanBoGiangVienCoHuu_MauGiangVien_" + DateTime.Now.ToString("ddMMyyyyhhmmss") + ".zip";
            return File(content, "application/octetstream", fileName);
        }
    }
}