using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Lib.Setting.Model;
using Lib.PhanCongNhomLop.Model;
using PhanCongGiangDay.IServices;
using PhanCongGiangDay.Services;
using PhanCongGiangDay.Models.ViewModel.Shared;

namespace PhanCongGiangDay.Controllers
{
    public class PhanCongNhomLopController : BizController
    {
        private IHocPhanService _hocPhanService;
        private IHocPhanService HocPhanService => _hocPhanService ?? (_hocPhanService = new HocPhanService());
        private INamHocService _namHocService;
        private INamHocService NamHocService => _namHocService ?? (_namHocService = new NamHocService());
        private IKhoaService _khoaService;
        private IKhoaService KhoaService => _khoaService ?? (_khoaService = new KhoaService());
        private readonly IPhanCongNhomLopService PhanCongNhomLopService;
        public PhanCongNhomLopController(IPhanCongNhomLopService _PhanCongNhomLopService)
        {
            PhanCongNhomLopService = _PhanCongNhomLopService;
        }
        // GET: PhanCongNhomLop
        public ActionResult Index()
        {
            var model = NamHocService.DanhSachNamHoc().ToList();
            return View(model);
        }
        public ActionResult Khoa(int NamHoc)
        {
            var model = KhoaService.DanhSachKhoa();
            ViewBag.namhocID = NamHoc;
            ViewBag.namhoc = NamHocService.ChiTietNamHoc(NamHoc).NamHoc;
            return View(model);
        }
        public ActionResult PhanCong(int NamHoc, int Khoa)
        {            
            ViewBag.namhocID = NamHoc;
            ViewBag.namhoc = NamHocService.ChiTietNamHoc(NamHoc).NamHoc;
            ViewBag.khoaID = Khoa;
            var k = KhoaService.ChiTietKhoa(Khoa);
            ViewBag.khoa = k.TenKhoa + " (" + k.SLSV + " SV)";
            return View();
        }
        public ActionResult DanhSachPhanCongNhomLop(int BangPhanCongID, int? KhoaID)
        {
            var viewModel = PhanCongNhomLopService.DanhSachPhanCongNhomLop(BangPhanCongID,KhoaID);
            return Json(new { data = viewModel }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult ThemPhanCongNhomLop(int BangPhanCongID, int? KhoaID)
        {
            var dshp = HocPhanService.DanhSachHocPhanTheoKhoa(KhoaID);
            ViewBag.bangpcIDvb = BangPhanCongID;
            ViewBag.khoaidvb = KhoaID;
            ViewBag.hocphanddl = new SelectList(dshp, "HocPhanLogID", "MaVaTenHP");
            ViewBag.hocphanlt = new SelectList(dshp, "HocPhanLogID", "SoTietLT");
            ViewBag.hocphanth = new SelectList(dshp, "HocPhanLogID", "SoTietTH");
            ViewBag.hocphantc = new SelectList(dshp, "HocPhanLogID", "SoTC");
            ViewBag.hocphanst = new SelectList(dshp, "HocPhanLogID", "SoTietHP");
            return PartialView("_ThemPhanCongNhomLop");
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult ThemPhanCongNhomLop(PhanCongNhomLopModel model)
        {
            try
            {
               if(ModelState.IsValid)
               {
                    var result = PhanCongNhomLopService.ThemPhanCongNhomLop(model);
                    if (result != null && result.ResponseCode == 1)
                    {
                        return Json(JsonResponseViewModel.CreateSuccess("Thêm phân công nhóm lớp thành công."));
                    }
                    else if (result != null && result.ResponseCode == -1)
                    {
                        return Json(JsonResponseViewModel.CreateFail(result.ResponseMessage));
                    }
                    else
                        return Json(JsonResponseViewModel.CreateFail("Thêm phân công nhóm lớp thất bại."));
               }
               else
               {
                    var dshp = HocPhanService.DanhSachHocPhanTheoKhoa(model.KhoaID);
                    ViewBag.bangpcIDvb = model.BangPhanCongID;
                    ViewBag.khoaidvb = model.KhoaID;
                    ViewBag.hocphanddl = new SelectList(dshp, "HocPhanLogID", "MaVaTenHP");
                    ViewBag.hocphanlt = new SelectList(dshp, "HocPhanLogID", "SoTietLT");
                    ViewBag.hocphanth = new SelectList(dshp, "HocPhanLogID", "SoTietTH");
                    ViewBag.hocphantc = new SelectList(dshp, "HocPhanLogID", "SoTC");
                    ViewBag.hocphanst = new SelectList(dshp, "HocPhanLogID", "SoTietHP");
                    return PartialView("_ThemPhanCongNhomLop");
               }
            }
            catch (Exception ex)
            {
                return Json(JsonResponseViewModel.CreateFail(ex));
            }
        }

        [HttpGet]
        public ActionResult SuaPhanCongNhomLop(int id)
        {
            var viewModel = PhanCongNhomLopService.ChiTietPhanCongNhomLop(id);
            var dshp = HocPhanService.DanhSachHocPhanTheoKhoa(viewModel.KhoaID);
            ViewBag.hocphanddl = new SelectList(dshp, "HocPhanLogID", "MaVaTenHP");
            ViewBag.hocphanlt = new SelectList(dshp, "HocPhanLogID", "SoTietLT");
            ViewBag.hocphanth = new SelectList(dshp, "HocPhanLogID", "SoTietTH");
            ViewBag.hocphantc = new SelectList(dshp, "HocPhanLogID", "SoTC");
            ViewBag.hocphanst = new SelectList(dshp, "HocPhanLogID", "SoTietHP");
            return PartialView("_SuaPhanCongNhomLop",viewModel);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult SuaPhanCongNhomLop(PhanCongNhomLopModel model)
        {
            try
            {
                var result = PhanCongNhomLopService.SuaPhanCongNhomLop(model);
                if (result != null && result.ResponseCode == 1)
                {
                    return Json(JsonResponseViewModel.CreateSuccess("Cập nhật phân công nhóm lớp thành công."));
                }
                else if (result != null && result.ResponseCode == -1)
                {
                    return Json(JsonResponseViewModel.CreateFail(result.ResponseMessage));
                }
                else
                    return Json(JsonResponseViewModel.CreateFail("Cập nhật phân công nhóm lớp thất bại."));
            }
            catch (Exception ex)
            {
                return Json(JsonResponseViewModel.CreateFail(ex));
            }
        }

        [HttpGet]
        public ActionResult XoaPhanCongNhomLop(int id)
        {
            return PartialView("_XoaPhanCongNhomLop",id);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult XoaPhanCongNhomLopConfirmed(int PhanCongNhomLopid)
        {
            try
            {
                var result = PhanCongNhomLopService.XoaPhanCongNhomLop(PhanCongNhomLopid, "");//làm xong phần accout sẽ bổ sung
                if (result != null && result.ResponseCode == 1)
                {
                    return Json(JsonResponseViewModel.CreateSuccess("Xoá phân công nhóm lớp thành công."));
                }
                else if (result != null && result.ResponseCode == -1)
                {
                    return Json(JsonResponseViewModel.CreateFail(result.ResponseMessage));
                }
                else
                    return Json(JsonResponseViewModel.CreateFail("Xoá phân công nhóm lớp thất bại."));
            }
            catch (Exception ex)
            {
                return Json(JsonResponseViewModel.CreateFail(ex));
            }
        }
    }
}