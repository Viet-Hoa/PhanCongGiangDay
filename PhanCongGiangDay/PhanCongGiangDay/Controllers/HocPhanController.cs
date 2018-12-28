using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Lib.Setting.Model;
using Lib.HocPhan.Model;
using PhanCongGiangDay.IServices;
using PhanCongGiangDay.Models.ViewModel.Shared;
using PhanCongGiangDay.Services;

namespace PhanCongGiangDay.Controllers
{
    public class HocPhanController : BizController
    {
        private readonly IHocPhanService HocPhanService;
        private IBoMonService BoMonService = new BoMonService();
        public HocPhanController(IHocPhanService _hocPhanService)
        {
            HocPhanService = _hocPhanService;
        }
        // GET: HocPhan
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult DanhSachHocPhan()
        {
            var viewModel = HocPhanService.DanhSachHocPhan();
            return Json(new { data = viewModel }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult ThemHocPhan()
        {
            ViewBag.bomon_list = new SelectList(BoMonService.DanhSachBoMon(), "BoMonID", "TenBoMon");
            return PartialView("_ThemHocPhan");
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult ThemHocPhan(HocPhanModel model)
        {
            try
            {
                var result = HocPhanService.ThemHocPhan(model);
                if (result != null && result.ResponseCode == 1)
                {
                    return Json(JsonResponseViewModel.CreateSuccess("Thêm học phần thành công."));
                }
                else if (result != null && result.ResponseCode == -1)
                {
                    return Json(JsonResponseViewModel.CreateFail(result.ResponseMessage));
                }
                else
                    return Json(JsonResponseViewModel.CreateFail("Thêm học phần thất bại."));
            }
            catch (Exception ex)
            {
                return Json(JsonResponseViewModel.CreateFail(ex));
            }
        }

        [HttpGet]
        public ActionResult SuaHocPhan(int id)
        {
            var viewModel = HocPhanService.ChiTietHocPhan(id);
            ViewBag.bomon_list = new SelectList(BoMonService.DanhSachBoMon(), "BoMonID", "TenBoMon");
            return PartialView("_SuaHocPhan",viewModel);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult SuaHocPhan(HocPhanModel model)
        {
            try
            {
                var result = HocPhanService.SuaHocPhan(model);
                if (result != null && result.ResponseCode == 1)
                {
                    return Json(JsonResponseViewModel.CreateSuccess("Cập nhật học phần thành công."));
                }
                else if (result != null && result.ResponseCode == -1)
                {
                    return Json(JsonResponseViewModel.CreateFail(result.ResponseMessage));
                }
                else
                    return Json(JsonResponseViewModel.CreateFail("Cập nhật học phần thất bại."));
            }
            catch (Exception ex)
            {
                return Json(JsonResponseViewModel.CreateFail(ex));
            }
        }

        [HttpGet]
        public ActionResult XoaHocPhan(int id)
        {
            return PartialView("_XoaHocPhan",id);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult XoaHocPhanConfirmed(int HocPhanId)
        {
            try
            {
                var result = HocPhanService.XoaHocPhan(HocPhanId, "");
                if (result != null && result.ResponseCode == 1)
                {
                    return Json(JsonResponseViewModel.CreateSuccess("Xoá học phần thành công."));
                }
                else if (result != null && result.ResponseCode == -1)
                {
                    return Json(JsonResponseViewModel.CreateFail(result.ResponseMessage));
                }
                else
                    return Json(JsonResponseViewModel.CreateFail("Xoá học phần thất bại."));
            }
            catch (Exception ex)
            {
                return Json(JsonResponseViewModel.CreateFail(ex));
            }
        }
    }
}