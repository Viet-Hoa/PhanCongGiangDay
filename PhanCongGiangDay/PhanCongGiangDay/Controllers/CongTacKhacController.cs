using System;
using System.Web.Mvc;
using Lib.CongTacKhac.Model;
using PhanCongGiangDay.IServices;
using PhanCongGiangDay.Models.ViewModel.Shared;
using PhanCongGiangDay.Infrastructure.Attributes;
using PhanCongGiangDay.Services;

namespace PhanCongGiangDay.Controllers
{
    [CustomLoginAuthorize]
    public class CongTacKhacController : BizController
    {
        private readonly ICongTacKhacService CongTacKhacService;
        public CongTacKhacController(ICongTacKhacService _CongTacKhacService)
        {
            CongTacKhacService = _CongTacKhacService;
        }
        // GET: CongTacKhac
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult DanhSachCongTacKhac()
        {
            var viewModel = CongTacKhacService.DanhSachCongTacKhac();
            return Json(new { data = viewModel }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult ThemCongTacKhac()
        {
            return PartialView("_ThemCongTacKhac");
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult ThemCongTacKhac(CongTacKhacModel model)
        {
            try
            {
                var result = CongTacKhacService.ThemCongTacKhac(model);
                if (result != null && result.ResponseCode == 1)
                {
                    return Json(JsonResponseViewModel.CreateSuccess("Thêm công tác khác thành công."));
                }
                else if (result != null && result.ResponseCode == -1)
                {
                    return Json(JsonResponseViewModel.CreateFail(result.ResponseMessage));
                }
                else
                    return Json(JsonResponseViewModel.CreateFail("Thêm công tác khác thất bại."));
            }
            catch (Exception ex)
            {
                return Json(JsonResponseViewModel.CreateFail(ex));
            }
        }

        [HttpGet]
        public ActionResult SuaCongTacKhac(int id)
        {
            var viewModel = CongTacKhacService.ChiTietCongTacKhac(id);
            return PartialView("_SuaCongTacKhac",viewModel);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult SuaCongTacKhac(CongTacKhacModel model)
        {
            try
            {
                var result = CongTacKhacService.SuaCongTacKhac(model);
                if (result != null && result.ResponseCode == 1)
                {
                    return Json(JsonResponseViewModel.CreateSuccess("Cập nhật công tác khác thành công."));
                }
                else if (result != null && result.ResponseCode == -1)
                {
                    return Json(JsonResponseViewModel.CreateFail(result.ResponseMessage));
                }
                else
                    return Json(JsonResponseViewModel.CreateFail("Cập nhật công tác khác thất bại."));
            }
            catch (Exception ex)
            {
                return Json(JsonResponseViewModel.CreateFail(ex));
            }
        }

        [HttpGet]
        public ActionResult XoaCongTacKhac(int id)
        {
            return PartialView("_XoaCongTacKhac",id);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult XoaCongTacKhacConfirmed(int CongTacKhacid)
        {
            try
            {
                var result = CongTacKhacService.XoaCongTacKhac(CongTacKhacid, "");//làm xong phần accout sẽ bổ sung
                if (result != null && result.ResponseCode == 1)
                {
                    return Json(JsonResponseViewModel.CreateSuccess("Xoá công tác khác thành công."));
                }
                else if (result != null && result.ResponseCode == -1)
                {
                    return Json(JsonResponseViewModel.CreateFail(result.ResponseMessage));
                }
                else
                    return Json(JsonResponseViewModel.CreateFail("Xoá công tác khác thất bại."));
            }
            catch (Exception ex)
            {
                return Json(JsonResponseViewModel.CreateFail(ex));
            }
        }
    }
}