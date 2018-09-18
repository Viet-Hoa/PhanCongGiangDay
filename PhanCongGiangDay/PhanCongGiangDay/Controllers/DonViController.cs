using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Lib.Setting.Model;
using Lib.DonVi.Model;
using PhanCongGiangDay.IServices;
using PhanCongGiangDay.Models.ViewModel.Shared;

namespace PhanCongGiangDay.Controllers
{
    public class DonViController : BizController
    {
        private readonly IDonViService DonViService;
        public DonViController(IDonViService _donViService)
        {
            DonViService = _donViService;
        }
        // GET: DonVi
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult DanhSachDonvi()
        {
            var viewModel = DonViService.DanhSachDonvi();
            return Json(new { data = viewModel }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult ThemDonVi()
        {
            return PartialView("_ThemDonVi");
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult ThemDonVi(DonviModel model)
        {
            try
            {
                var result = DonViService.ThemDonvi(model);
                if (result != null && result.ResponseCode == 1)
                {
                    return Json(JsonResponseViewModel.CreateSuccess("Thêm đơn vị thành công."));
                }
                else if (result != null && result.ResponseCode == -1)
                {
                    return Json(JsonResponseViewModel.CreateFail(result.ResponseMessage));
                }
                else
                    return Json(JsonResponseViewModel.CreateFail("Thêm đơn vị thất bại."));
            }
            catch (Exception ex)
            {
                return Json(JsonResponseViewModel.CreateFail(ex));
            }
        }

        [HttpGet]
        public ActionResult SuaDonVi(int id)
        {
            var viewModel = DonViService.ChiTietDonvi(id);
            return PartialView("_SuaDonVi",viewModel);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult SuaDonVi(DonviModel model)
        {
            try
            {
                var result = DonViService.SuaDonvi(model);
                if (result != null && result.ResponseCode == 1)
                {
                    return Json(JsonResponseViewModel.CreateSuccess("Cập nhật đơn vị thành công."));
                }
                else if (result != null && result.ResponseCode == -1)
                {
                    return Json(JsonResponseViewModel.CreateFail(result.ResponseMessage));
                }
                else
                    return Json(JsonResponseViewModel.CreateFail("Cập nhật đơn vị thất bại."));
            }
            catch (Exception ex)
            {
                return Json(JsonResponseViewModel.CreateFail(ex));
            }
        }

        [HttpGet]
        public ActionResult XoaDonVi(int id)
        {
            return PartialView("_XoaDonVi",id);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult XoaDonViConfirmed(int id)
        {
            try
            {
                var result = DonViService.XoaDonvi(id, "");//làm xong phần accout sẽ bổ sung
                if (result != null && result.ResponseCode == 1)
                {
                    return Json(JsonResponseViewModel.CreateSuccess("Xoá đơn vị thành công."));
                }
                else if (result != null && result.ResponseCode == -1)
                {
                    return Json(JsonResponseViewModel.CreateFail(result.ResponseMessage));
                }
                else
                    return Json(JsonResponseViewModel.CreateFail("Xoá đơn vị thất bại."));
            }
            catch (Exception ex)
            {
                return Json(JsonResponseViewModel.CreateFail(ex));
            }
        }
    }
}