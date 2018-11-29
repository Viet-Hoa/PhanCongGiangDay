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
    }
}