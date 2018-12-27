using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Lib.Setting.Model;
using Lib.NamHoc.Model;
using PhanCongGiangDay.IServices;
using PhanCongGiangDay.Models.ViewModel.Shared;
using Lib.Setting;
using PhanCongGiangDay.Infrastructure.Attributes;
namespace PhanCongGiangDay.Controllers
{
    [CustomLoginAuthorize]
    public class NamHocController : BizController
    {
        private readonly INamHocService NamHocService;
        public NamHocController(INamHocService _NamHocService)
        {
            NamHocService = _NamHocService;
        }
        // GET: NamHoc
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult DanhSachNamHoc()
        {
            var viewModel = NamHocService.DanhSachNamHoc();
            return Json(new { data = viewModel }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult ThemNamHoc()
        {
            var listyear = new List<string>();
            for (int i = (DateTime.Now.Year - 5); i <= (DateTime.Now.Year + 5); i++)
                listyear.Add(i+" - "+(i+1));
            ViewBag.year = new SelectList(listyear, (DateTime.Now.Year+" - "+(DateTime.Now.Year+1)));
            return PartialView("_ThemNamHoc");
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult ThemNamHoc(NamHocModel model)
        {
            try
            {
                var result = NamHocService.ThemNamHoc(model);
                if (result != null && result.ResponseCode == 1)
                {
                    return Json(JsonResponseViewModel.CreateSuccess("Thêm năm học thành công."));
                }
                else if (result != null && result.ResponseCode == -1)
                {
                    return Json(JsonResponseViewModel.CreateFail(result.ResponseMessage));
                }
                else
                    return Json(JsonResponseViewModel.CreateFail("Thêm năm học thất bại."));
            }
            catch (Exception ex)
            {
                return Json(JsonResponseViewModel.CreateFail(ex));
            }
        }

        [HttpGet]
        public ActionResult SuaNamHoc(int id)
        {
            var viewModel = NamHocService.ChiTietNamHoc(id);
            var listyear = new List<string>();
            for (int i = (DateTime.Now.Year - 5); i <= (DateTime.Now.Year + 5); i++)
                listyear.Add(i + " - " + (i + 1));
            ViewBag.year = new SelectList(listyear);
            ViewBag.active = new SelectList(XMLUtils.BindData("trangthaihoatdong"), "value", "text");
            return PartialView("_SuaNamHoc",viewModel);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult SuaNamHoc(NamHocModel model)
        {
            try
            {
                var result = NamHocService.SuaNamHoc(model);
                if (result != null && result.ResponseCode == 1)
                {
                    return Json(JsonResponseViewModel.CreateSuccess("Cập nhật năm học thành công."));
                }
                else if (result != null && result.ResponseCode == -1)
                {
                    return Json(JsonResponseViewModel.CreateFail(result.ResponseMessage));
                }
                else
                    return Json(JsonResponseViewModel.CreateFail("Cập nhật năm học thất bại."));
            }
            catch (Exception ex)
            {
                return Json(JsonResponseViewModel.CreateFail(ex));
            }
        }

                
    }
}