using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Lib.Setting;
using Lib.PhanCongNhomLop.Model;
using PhanCongGiangDay.IServices;
using PhanCongGiangDay.Services;
using PhanCongGiangDay.Models.ViewModel.Shared;
using PhanCongGiangDay.Infrastructure.Attributes;
using Lib.Setting.Model;
namespace PhanCongGiangDay.Controllers
{
    [CustomLoginAuthorize]
    public class PhanCongNhomLopController : BizController
    {
        private IHocPhanService _hocPhanService;
        private IHocPhanService HocPhanService => _hocPhanService ?? (_hocPhanService = new HocPhanService());
        private INamHocService _namHocService;
        private INamHocService NamHocService => _namHocService ?? (_namHocService = new NamHocService());
        private IKhoaService _khoaService;
        private IKhoaService KhoaService => _khoaService ?? (_khoaService = new KhoaService());
        private ICTDTService _cTDTService;
        private ICTDTService CTDTService => _cTDTService ?? (_cTDTService = new CTDTService());
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
        [EncryptedActionParameter]
        public ActionResult Khoa(string NamHoc)
        {
            var model = KhoaService.DanhSachKhoa();
            ViewBag.namhocID = int.Parse(NamHoc);
            ViewBag.namhoc = NamHocService.ChiTietNamHoc(int.Parse(NamHoc)).NamHoc;
            ViewBag.loai = new SelectList(XMLUtils.BindData("chedoxempcnl"), "value", "text");
            return View(model);
        }
        [EncryptedActionParameter]
        public ActionResult PhanCong(string NamHoc, string Khoa)
        {
            ViewBag.namhocID = int.Parse(NamHoc);
            ViewBag.namhoc = NamHocService.ChiTietNamHoc(int.Parse(NamHoc)).NamHoc;
            ViewBag.khoaID = Khoa;
            var k = KhoaService.ChiTietKhoa(int.Parse(Khoa));
            ViewBag.khoa = k.TenKhoa + " (" + k.SLSV + " SV)";
            return View();
        }
        public ActionResult DanhSachPhanCongNhomLop(int BangPhanCongID, int? KhoaID)
        {
            var viewModel = PhanCongNhomLopService.DanhSachPhanCongNhomLop(BangPhanCongID,KhoaID,null);
            return Json(new { data = viewModel }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult ThemPhanCongNhomLop(int BangPhanCongID, int? KhoaID)
        {
            var dshp = HocPhanService.DanhSachHocPhanTheoKhoa(KhoaID);
            ViewBag.bangpcIDvb = BangPhanCongID;
            ViewBag.khoaidvb = KhoaID;
            ViewBag.sv = KhoaService.ChiTietKhoa((int)KhoaID).TTSV;
            ViewBag.hocphanddl = new SelectList(dshp, "HocPhanLogID", "MaVaTenHP");
            ViewBag.hocphanlt = new SelectList(dshp, "HocPhanLogID", "SoTietLT");
            ViewBag.hocphanth = new SelectList(dshp, "HocPhanLogID", "SoTietTH");
            ViewBag.hocphantc = new SelectList(dshp, "HocPhanLogID", "SoTC");
            ViewBag.hocphanst = new SelectList(dshp, "HocPhanLogID", "SoTietHP");
            ViewBag.bomont = new SelectList(dshp, "HocPhanLogID", "TenBoMon");
            return PartialView("_ThemPhanCongNhomLop");
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult ThemPhanCongNhomLop(PhanCongNhomLopModel model)
        {
            try
            {
                var hp = HocPhanService.ChiTietHocPhanLog(model.HocPhanLogID);
                var c= PhanCongNhomLopService.DanhSachPhanCongNhomLop(model.BangPhanCongID, model.KhoaID,null).Where(x=>x.HocPhanID==hp.HocPhanID).FirstOrDefault();
                if(c!=null)
                {
                    ModelState.AddModelError("HocPhanLogID", "Học phần \""+model.TenHocPhan+"\" đã được phân công nhóm lớp");
                }
                if (ModelState.IsValid)
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
                    ViewBag.bomont = new SelectList(dshp, "HocPhanLogID", "TenBoMon");
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
            ViewBag.sv = KhoaService.ChiTietKhoa(viewModel.KhoaID).TTSV;
            ViewBag.hocphanddl = new SelectList(dshp, "HocPhanLogID", "MaVaTenHP");
            ViewBag.hocphanlt = new SelectList(dshp, "HocPhanLogID", "SoTietLT");
            ViewBag.hocphanth = new SelectList(dshp, "HocPhanLogID", "SoTietTH");
            ViewBag.hocphantc = new SelectList(dshp, "HocPhanLogID", "SoTC");
            ViewBag.hocphanst = new SelectList(dshp, "HocPhanLogID", "SoTietHP");
            ViewBag.bomont = new SelectList(dshp, "HocPhanLogID", "TenBoMon");
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

        [HttpGet]
        public ActionResult PhanCongNhomLopTuDong(int BangPhanCongID)
        {
            ViewBag.namhoc = BangPhanCongID;
            var viewModel = PhanCongNhomLopService.DanhSachPhanCongNhomLopTuDong(BangPhanCongID);
            var dshp = HocPhanService.DanhSachHocPhan();
            ViewBag.hocphanlt = new SelectList(dshp, "HocPhanLogID", "SoTietLT");
            ViewBag.hocphanth = new SelectList(dshp, "HocPhanLogID", "SoTietTH");
            ViewBag.hocphantc = new SelectList(dshp, "HocPhanLogID", "SoTC");
            return PartialView("_PhanCongNhomLopTuDong", viewModel.ToList());
        }

        public ActionResult ThemPhanCongNhomLopTuDong(int BangPhanCongID, int i)
        {
            ViewBag.namhoc = BangPhanCongID;
            ViewBag.thutu = i + 1;
            var khoa = KhoaService.DanhSachKhoa().Where(x => x.NamKetThuc >= DateTime.Now.Year);
            ViewBag.khoa_ddl = new SelectList(khoa, "KhoaID", "TenKhoa");
            ViewBag.hocphanddl = new SelectList(HocPhanService.DanhSachHocPhan(), "HocPhanLogID", "MaVaTenHP");
            return PartialView("_ThemPhanCongNhomLopTuDong");
        }

        [HttpPost]
        public ActionResult PhanCongNhomLopTuDong(List<PhanCongNhomLopModel> model)
        {
            try
            {
                ResponseResult result = null;
                model = model.Where(x => x.HocPhanLogID != 0 && x.TrangThai != -1).ToList();
                foreach (var item in model)
                {
                    result = PhanCongNhomLopService.ThemPhanCongNhomLop(item);

                    if (result == null)
                    {
                        return Json(JsonResponseViewModel.CreateFail("Thêm phân công nhóm lớp thất bại."));
                    }
                    else if (result != null && result.ResponseCode == -1)
                    {
                        return Json(JsonResponseViewModel.CreateFail(result.ResponseMessage));
                    }
                }
                return Json(JsonResponseViewModel.CreateSuccess("Thêm phân công nhóm lớp thành công."));

            }
            catch (Exception ex)
            {
                return Json(JsonResponseViewModel.CreateFail(ex));
            }
        }
        public ActionResult DanhSachHocPhan(int KhoaID)
        {
            var model = HocPhanService.DanhSachHocPhanTheoKhoa(KhoaID);
            return Json(model, JsonRequestBehavior.AllowGet);
        }
    }
}