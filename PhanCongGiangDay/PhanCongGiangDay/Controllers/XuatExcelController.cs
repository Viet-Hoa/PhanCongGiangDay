using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using PhanCongGiangDay.IServices;
using PhanCongGiangDay.Services;

namespace PhanCongGiangDay.Controllers
{
    public class XuatExcelController : BizController
    {
        private IXuatExcelService _XuatExcelService;
        private IXuatExcelService XuatExcelService => _XuatExcelService ?? (_XuatExcelService = new XuatExcelService());

        private INamHocService _namHocService;
        private INamHocService NamHocService => _namHocService ?? (_namHocService = new NamHocService());
        private IBoMonService _boMonService;
        private IBoMonService BoMonService => _boMonService ?? (_boMonService = new BoMonService());
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
            var fileName = "KeHoachThinhGiang_Mau04_" + DateTime.Now.ToString("ddMMyyyyhhmmssfff") + ".xlsx";
            return File(content, "application/vnd.ms-excel", fileName);
        }
        public ActionResult XuatExcelMau03(int BangPhanCongID)
        {
            var content = XuatExcelService.XuatExcelMau03(BangPhanCongID);
            var fileName = "KeHoachMoiGiang_Mau03_" + DateTime.Now.ToString("ddMMyyyyhhmmssfff") + ".xlsx";
            return File(content, "application/vnd.ms-excel", fileName);
        }
        public ActionResult XuatExcelMau02(int BangPhanCongID)
        {
            var content = XuatExcelService.XuatExcelMau02(BangPhanCongID);
            var fileName = "BangPhanCongCongTacCanBoGiangVienCoHuu_Mau02_" + DateTime.Now.ToString("ddMMyyyyhhmmssfff") + ".xlsx";
            return File(content, "application/vnd.ms-excel", fileName);
        }
        public ActionResult XuatExcelMau01_HK1(int BangPhanCongID)
        {
            var content = XuatExcelService.XuatExcelMau01(BangPhanCongID,1);
            var fileName = "KeHoachMoMonChuyenNganh_Mau01_HK1_" + DateTime.Now.ToString("ddMMyyyyhhmmssfff") + ".xlsx";
            return File(content, "application/vnd.ms-excel", fileName);
        }
        public ActionResult XuatExcelMau01_HK2(int BangPhanCongID)
        {
            var content = XuatExcelService.XuatExcelMau01(BangPhanCongID,2);
            var fileName = "KeHoachMoMonChuyenNganh_Mau01_HK2_" + DateTime.Now.ToString("ddMMyyyyhhmmssfff") + ".xlsx";
            return File(content, "application/vnd.ms-excel", fileName);
        }
        public ActionResult XuatExcelMauBoMon(int BangPhanCongID)
        {
            var content = XuatExcelService.XuatExcelMauBoMon(BangPhanCongID);
            var fileName = "BangPhanCongCongTacCanBoGiangVienCoHuu_MauBoMon_" + DateTime.Now.ToString("ddMMyyyyhhmmssfff") + ".xlsx";
            return File(content, "application/vnd.ms-excel", fileName);
        }
        public ActionResult XuatExcelMauGiangVien(int BangPhanCongID)
        {
            var ds = GiangVienService.DanhSachGiangVienTheoLoai(2);
            return PartialView("_MauGiangVien", ds);
        }
        public ActionResult XuatExcelMauGV(int BangPhanCongID, List<int> listid)
        {
            var content = XuatExcelService.XuatExcelMauGiangVien(BangPhanCongID, listid.First());
            var fileName = "BangPhanCongCongTacCanBoGiangVienCoHuu_MauGiangVien_" + DateTime.Now.ToString("ddMMyyyyhhmmssfff") + ".xlsx";
            return File(content, "application/vnd.ms-excel", fileName);
        }
    }
}