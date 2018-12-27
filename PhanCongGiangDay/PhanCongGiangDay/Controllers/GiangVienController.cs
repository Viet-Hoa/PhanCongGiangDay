using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Lib.Setting.Model;
using Lib.GiangVien.Model;
using PhanCongGiangDay.IServices;
using PhanCongGiangDay.Models.ViewModel.Shared;

namespace PhanCongGiangDay.Controllers
{
    public class GiangVienController : BizController
    {
        private readonly IGiangVienService GiangVienService;
        public GiangVienController(IGiangVienService _giangVienService)
        {
            GiangVienService = _giangVienService;
        }
        // GET: GiangVien
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult DanhSachGiangVien()
        {
            var viewModel = GiangVienService.DanhSachGiangVien();
            return Json(new { data = viewModel }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult ThemGiangVien()
        {
            return PartialView("_ThemGiangVien");
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult ThemGiangVien(GiangVienModel model)
        {
            try
            {
                var result = GiangVienService.ThemGiangVien(model);
                if (result != null && result.ResponseCode == 1)
                {
                    return Json(JsonResponseViewModel.CreateSuccess("Thêm giảng viên thành công."));
                }
                else if (result != null && result.ResponseCode == -1)
                {
                    return Json(JsonResponseViewModel.CreateFail(result.ResponseMessage));
                }
                else
                    return Json(JsonResponseViewModel.CreateFail("Thêm giảng viên thất bại."));
            }
            catch (Exception ex)
            {
                return Json(JsonResponseViewModel.CreateFail(ex));
            }
        }

        [HttpGet]
        public ActionResult SuaGiangVien(int id)
        {
            var viewModel = GiangVienService.ChiTietGiangVien(id);
            return PartialView("_SuaGiangVien",viewModel);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult SuaGiangVien(GiangVienModel model)
        {
            try
            {
                var result = GiangVienService.SuaGiangVien(model);
                if (result != null && result.ResponseCode == 1)
                {
                    return Json(JsonResponseViewModel.CreateSuccess("Cập nhật giảng viên thành công."));
                }
                else if (result != null && result.ResponseCode == -1)
                {
                    return Json(JsonResponseViewModel.CreateFail(result.ResponseMessage));
                }
                else
                    return Json(JsonResponseViewModel.CreateFail("Cập nhật giảng viên thất bại."));
            }
            catch (Exception ex)
            {
                return Json(JsonResponseViewModel.CreateFail(ex));
            }
        }

        [HttpGet]
        public ActionResult XoaGiangVien(int id)
        {
            return PartialView("_XoaGiangVien",id);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult XoaGiangVienConfirmed(int GiangVienId)
        {
            try
            {
                var result = GiangVienService.XoaGiangVien(GiangVienId, "");
                if (result != null && result.ResponseCode == 1)
                {
                    return Json(JsonResponseViewModel.CreateSuccess("Xoá giảng viên thành công."));
                }
                else if (result != null && result.ResponseCode == -1)
                {
                    return Json(JsonResponseViewModel.CreateFail(result.ResponseMessage));
                }
                else
                    return Json(JsonResponseViewModel.CreateFail("Xoá giảng viên thất bại."));
            }
            catch (Exception ex)
            {
                return Json(JsonResponseViewModel.CreateFail(ex));
            }
        }
    }
}