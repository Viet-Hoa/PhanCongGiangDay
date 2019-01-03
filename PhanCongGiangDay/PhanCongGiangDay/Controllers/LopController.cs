using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Lib.Setting.Model;
using Lib.Lop.Model;
using PhanCongGiangDay.IServices;
using PhanCongGiangDay.Models.ViewModel.Shared;
using PhanCongGiangDay.Infrastructure.Attributes;
using PhanCongGiangDay.Services;
using System.Xml;
using System.Reflection;
using System.IO;

namespace PhanCongGiangDay.Controllers
{
    [CustomLoginAuthorize]
    public class LopController : BizController
    {

        private IKhoaService _khoaService;
        private IKhoaService KhoaService => _khoaService ?? (_khoaService = new KhoaService());
        private IGiangVienService _giangVienService;
        private IGiangVienService GiangVienService => _giangVienService ?? (_giangVienService = new GiangVienService());
        private readonly ILopService LopService;
        private int loaiGV_CoHuu;

        public LopController(ILopService _lopService)
        {
            LopService = _lopService;
            /*
            XmlDocument xmlData = new XmlDocument();
            xmlData.Load(AppDomain.CurrentDomain.GetData("DataDirectory").ToString());
            loaiGV_CoHuu = int.Parse(xmlData.SelectSingleNode("/chucdanh/item[@text='Giảng viên cơ hữu']").Attributes["value"].Value);
            */
            // Chưa đọc được từ file XML do lỗi Access denied, tạm hard-code
            loaiGV_CoHuu = 2;
        }        // GET: Lop
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult DanhSachLop()
        {
            var viewModel = LopService.DanhSachLop();
            return Json(new { data = viewModel }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult ThemLop()
        {
            ViewBag.khoa_list = new SelectList(KhoaService.DanhSachKhoa(), "KhoaID", "TenKhoa");
            ViewBag.giangvien_list = new SelectList(GiangVienService.DanhSachGiangVienTheoLoai(loaiGV_CoHuu), "GiangVienID", "HoTen");
            return PartialView("_ThemLop");
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult ThemLop(LopModel model)
        {
            try
            {
                var result = LopService.ThemLop(model);
                if (result != null && result.ResponseCode == 1)
                {
                    return Json(JsonResponseViewModel.CreateSuccess("Thêm lớp thành công."));
                }
                else if (result != null && result.ResponseCode == -1)
                {
                    return Json(JsonResponseViewModel.CreateFail(result.ResponseMessage));
                }
                else
                    return Json(JsonResponseViewModel.CreateFail("Thêm lớp thất bại."));
            }
            catch (Exception ex)
            {
                return Json(JsonResponseViewModel.CreateFail(ex));
            }
        }

        [HttpGet]
        public ActionResult SuaLop(int id)
        {
            var viewModel = LopService.ChiTietLop(id);
            ViewBag.khoa_list = new SelectList(KhoaService.DanhSachKhoa(), "KhoaID", "TenKhoa");         
            ViewBag.giangvien_list = new SelectList(GiangVienService.DanhSachGiangVienTheoLoai(loaiGV_CoHuu), "GiangVienID", "HoTen");
            return PartialView("_SuaLop", viewModel);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult SuaLop(LopModel model)
        {
            try
            {
                var result = LopService.SuaLop(model);
                if (result != null && result.ResponseCode == 1)
                {
                    return Json(JsonResponseViewModel.CreateSuccess("Cập nhật lớp thành công."));
                }
                else if (result != null && result.ResponseCode == -1)
                {
                    return Json(JsonResponseViewModel.CreateFail(result.ResponseMessage));
                }
                else
                    return Json(JsonResponseViewModel.CreateFail("Cập nhật lớp thất bại."));
            }
            catch (Exception ex)
            {
                return Json(JsonResponseViewModel.CreateFail(ex));
            }
        }

        [HttpGet]
        public ActionResult XoaLop(int id)
        {
            return PartialView("_XoaLop", id);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult XoaLopConfirmed(int Lopid)
        {
            try
            {
                var result = LopService.XoaLop(Lopid, "");//làm xong phần accout sẽ bổ sung
                if (result != null && result.ResponseCode == 1)
                {
                    return Json(JsonResponseViewModel.CreateSuccess("Xoá lớp thành công."));
                }
                else if (result != null && result.ResponseCode == -1)
                {
                    return Json(JsonResponseViewModel.CreateFail(result.ResponseMessage));
                }
                else
                    return Json(JsonResponseViewModel.CreateFail("Xoá lớp thất bại."));
            }
            catch (Exception ex)
            {
                return Json(JsonResponseViewModel.CreateFail(ex));
            }
        }
    }
}