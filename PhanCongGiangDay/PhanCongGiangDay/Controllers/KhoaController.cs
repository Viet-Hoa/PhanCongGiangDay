using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Lib.Setting.Model;
using Lib.Khoa.Model;
using PhanCongGiangDay.Services;
using PhanCongGiangDay.IServices;
using PhanCongGiangDay.Models.ViewModel.Shared;

namespace PhanCongGiangDay.Controllers
{
    public class KhoaController : BizController
    {
        private ICTDTService _cTDTService;
        private ICTDTService CTDTService => _cTDTService ?? (_cTDTService = new CTDTService());

        private readonly IKhoaService KhoaService;
        public KhoaController(IKhoaService _KhoaService)
        {
            KhoaService = _KhoaService;
        }
        // GET: Khoa
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult DanhSachKhoa()
        {
            var viewModel = KhoaService.DanhSachKhoa();
            return Json(new { data = viewModel }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult ThemKhoa()
        {
            ViewBag.ctdt = new SelectList(CTDTService.DanhSachCTDT(), "CTDTID", "TenCTDT");
            return PartialView("_ThemKhoa");
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult ThemKhoa(KhoaModel model)
        {
            try
            {
                var result = KhoaService.ThemKhoa(model);
                if (result != null && result.ResponseCode == 1)
                {
                    return Json(JsonResponseViewModel.CreateSuccess("Thêm khoá thành công."));
                }
                else if (result != null && result.ResponseCode == -1)
                {
                    return Json(JsonResponseViewModel.CreateFail(result.ResponseMessage));
                }
                else
                    return Json(JsonResponseViewModel.CreateFail("Thêm khoá thất bại."));
            }
            catch (Exception ex)
            {
                return Json(JsonResponseViewModel.CreateFail(ex));
            }
        }

        [HttpGet]
        public ActionResult SuaKhoa(int id)
        {
            ViewBag.ctdt = new SelectList(CTDTService.DanhSachCTDT(), "CTDTID", "TenCTDT");
            var viewModel = KhoaService.ChiTietKhoa(id);
            return PartialView("_SuaKhoa",viewModel);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult SuaKhoa(KhoaModel model)
        {
            try
            {
                var result = KhoaService.SuaKhoa(model);
                if (result != null && result.ResponseCode == 1)
                {
                    return Json(JsonResponseViewModel.CreateSuccess("Cập nhật khoá thành công."));
                }
                else if (result != null && result.ResponseCode == -1)
                {
                    return Json(JsonResponseViewModel.CreateFail(result.ResponseMessage));
                }
                else
                    return Json(JsonResponseViewModel.CreateFail("Cập nhật khoá thất bại."));
            }
            catch (Exception ex)
            {
                return Json(JsonResponseViewModel.CreateFail(ex));
            }
        }

        [HttpGet]
        public ActionResult XoaKhoa(int id)
        {
            return PartialView("_XoaKhoa",id);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult XoaKhoaConfirmed(int id)
        {
            try
            {
                var result = KhoaService.XoaKhoa(id, "");//làm xong phần accout sẽ bổ sung
                if (result != null && result.ResponseCode == 1)
                {
                    return Json(JsonResponseViewModel.CreateSuccess("Xoá khoá thành công."));
                }
                else if (result != null && result.ResponseCode == -1)
                {
                    return Json(JsonResponseViewModel.CreateFail(result.ResponseMessage));
                }
                else
                    return Json(JsonResponseViewModel.CreateFail("Xoá khoá thất bại."));
            }
            catch (Exception ex)
            {
                return Json(JsonResponseViewModel.CreateFail(ex));
            }
        }
    }
}