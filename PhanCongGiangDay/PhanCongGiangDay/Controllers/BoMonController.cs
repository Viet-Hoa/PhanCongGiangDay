using System;
using System.Web.Mvc;
using Lib.BoMon.Model;
using PhanCongGiangDay.IServices;
using PhanCongGiangDay.Models.ViewModel.Shared;
using PhanCongGiangDay.Infrastructure.Attributes;
using PhanCongGiangDay.Services;

namespace PhanCongGiangDay.Controllers
{
    [CustomLoginAuthorize]
    public class BoMonController : BizController
    {
        private readonly IBoMonService BoMonService;
        private IDonViService DonViService = new DonViService();
        public BoMonController(IBoMonService _boMonService)
        {
            BoMonService = _boMonService;
        }
        // GET: BoMon
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult DanhSachBoMon()
        {
            var viewModel = BoMonService.DanhSachBoMon();
            return Json(new { data = viewModel }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult ThemBoMon()
        {
            ViewBag.donvi_list = new SelectList(DonViService.DanhSachDonvi(), "DonViID", "TenDonVi");
            return PartialView("_ThemBoMon");
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult ThemBoMon(BoMonModel model)
        {
            try
            {
                var result = BoMonService.ThemBoMon(model);
                if (result != null && result.ResponseCode == 1)
                {
                    return Json(JsonResponseViewModel.CreateSuccess("Thêm bộ môn thành công."));
                }
                else if (result != null && result.ResponseCode == -1)
                {
                    return Json(JsonResponseViewModel.CreateFail(result.ResponseMessage));
                }
                else
                    return Json(JsonResponseViewModel.CreateFail("Thêm bộ môn thất bại."));
            }
            catch (Exception ex)
            {
                return Json(JsonResponseViewModel.CreateFail(ex));
            }
        }

        [HttpGet]
        public ActionResult SuaBoMon(int id)
        {
            var viewModel = BoMonService.ChiTietBoMon(id);
            ViewBag.donvi_list = new SelectList(DonViService.DanhSachDonvi(), "DonViID", "TenDonVi");
            return PartialView("_SuaBoMon",viewModel);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult SuaBoMon(BoMonModel model)
        {
            try
            {
                var result = BoMonService.SuaBoMon(model);
                if (result != null && result.ResponseCode == 1)
                {
                    return Json(JsonResponseViewModel.CreateSuccess("Cập nhật bộ môn thành công."));
                }
                else if (result != null && result.ResponseCode == -1)
                {
                    return Json(JsonResponseViewModel.CreateFail(result.ResponseMessage));
                }
                else
                    return Json(JsonResponseViewModel.CreateFail("Cập nhật bộ môn thất bại."));
            }
            catch (Exception ex)
            {
                return Json(JsonResponseViewModel.CreateFail(ex));
            }
        }

        [HttpGet]
        public ActionResult XoaBoMon(int id)
        {
            return PartialView("_XoaBoMon",id);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult XoaBoMonConfirmed(int BoMonid)
        {
            try
            {
                var result = BoMonService.XoaBoMon(BoMonid, "");//làm xong phần accout sẽ bổ sung
                if (result != null && result.ResponseCode == 1)
                {
                    return Json(JsonResponseViewModel.CreateSuccess("Xoá bộ môn thành công."));
                }
                else if (result != null && result.ResponseCode == -1)
                {
                    return Json(JsonResponseViewModel.CreateFail(result.ResponseMessage));
                }
                else
                    return Json(JsonResponseViewModel.CreateFail("Xoá bộ môn thất bại."));
            }
            catch (Exception ex)
            {
                return Json(JsonResponseViewModel.CreateFail(ex));
            }
        }
    }
}