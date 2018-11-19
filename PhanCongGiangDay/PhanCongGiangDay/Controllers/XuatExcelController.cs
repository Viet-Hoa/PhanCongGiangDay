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
        private INamHocService _namHocService;
        private INamHocService NamHocService => _namHocService ?? (_namHocService = new NamHocService());

        public ActionResult Index()
        {
            ViewBag.namhocddl = new SelectList(NamHocService.DanhSachNamHoc(), "BangPhanCOngID", "NamHoc");
            return View();
        }
    }
}