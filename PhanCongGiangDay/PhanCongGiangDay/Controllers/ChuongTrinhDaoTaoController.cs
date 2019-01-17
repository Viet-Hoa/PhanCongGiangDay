using System;
using System.Web.Mvc;
using Lib.CTDT.Model;
using PhanCongGiangDay.IServices;
using PhanCongGiangDay.Models.ViewModel.Shared;
using PhanCongGiangDay.Infrastructure.Attributes;
using PhanCongGiangDay.Services;
using System.Web;

namespace PhanCongGiangDay.Controllers
{
    [CustomLoginAuthorize]
    public class ChuongTrinhDaoTaoController : BizController
    {
        private readonly ICTDTService ChuongTrinhDaoTaoService;
        private IDonViService DonViService = new DonViService();
        private IHocPhanService _hocPhanService;
        private IHocPhanService HocPhanService => _hocPhanService ?? (_hocPhanService = new HocPhanService());
        private IHocPhanTheoCTDTService _hocPhanTheoCTDTService;
        private IHocPhanTheoCTDTService HocPhanTheoCTDTService => _hocPhanTheoCTDTService ?? (_hocPhanTheoCTDTService = new HocPhanTheoCTDTService());

        public ChuongTrinhDaoTaoController(ICTDTService _ChuongTrinhDaoTaoService)
        {
            ChuongTrinhDaoTaoService = _ChuongTrinhDaoTaoService;
        }
        // GET: ChuongTrinhDaoTao
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult DanhSachChuongTrinhDaoTao()
        {
            var viewModel = ChuongTrinhDaoTaoService.DanhSachCTDT();
            return Json(new { data = viewModel }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult ThemChuongTrinhDaoTao()
        {
            return PartialView("_ThemChuongTrinhDaoTao");
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult ThemChuongTrinhDaoTao(CTDTModel model)
        {
            try
            {
                var result = ChuongTrinhDaoTaoService.ThemCTDT(model);
                if (result != null && result.ResponseCode == 1)
                {
                    return Json(JsonResponseViewModel.CreateSuccess("Thêm chương trình đào tạo thành công."));
                }
                else if (result != null && result.ResponseCode == -1)
                {
                    return Json(JsonResponseViewModel.CreateFail(result.ResponseMessage));
                }
                else
                    return Json(JsonResponseViewModel.CreateFail("Thêm chương trình đào tạo thất bại."));
            }
            catch (Exception ex)
            {
                return Json(JsonResponseViewModel.CreateFail(ex));
            }
        }

        [HttpGet]
        public ActionResult SuaChuongTrinhDaoTao(int id)
        {
            var viewModel = ChuongTrinhDaoTaoService.ChiTietCTDT(id);
            return PartialView("_SuaChuongTrinhDaoTao", viewModel);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult SuaChuongTrinhDaoTao(CTDTModel model)
        {
            try
            {
                var result = ChuongTrinhDaoTaoService.SuaCTDT(model);
                if (result != null && result.ResponseCode == 1)
                {
                    return Json(JsonResponseViewModel.CreateSuccess("Cập nhật chương trình đào tạo thành công."));
                }
                else if (result != null && result.ResponseCode == -1)
                {
                    return Json(JsonResponseViewModel.CreateFail(result.ResponseMessage));
                }
                else
                    return Json(JsonResponseViewModel.CreateFail("Cập nhật chương trình đào tạo thất bại."));
            }
            catch (Exception ex)
            {
                return Json(JsonResponseViewModel.CreateFail(ex));
            }
        }

        [HttpGet]
        public ActionResult XoaChuongTrinhDaoTao(int id)
        {
            return PartialView("_XoaChuongTrinhDaoTao", id);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult XoaChuongTrinhDaoTaoConfirmed(int ChuongTrinhDaoTaoid)
        {
            try
            {
                var result = ChuongTrinhDaoTaoService.XoaCTDT(ChuongTrinhDaoTaoid, "");//làm xong phần accout sẽ bổ sung
                if (result != null && result.ResponseCode == 1)
                {
                    return Json(JsonResponseViewModel.CreateSuccess("Xoá chương trình đào tạo thành công."));
                }
                else if (result != null && result.ResponseCode == -1)
                {
                    return Json(JsonResponseViewModel.CreateFail(result.ResponseMessage));
                }
                else
                    return Json(JsonResponseViewModel.CreateFail("Xoá chương trình đào tạo thất bại."));
            }
            catch (Exception ex)
            {
                return Json(JsonResponseViewModel.CreateFail(ex));
            }
        }

        [HttpGet]
        public ActionResult ChiTietChuongTrinhDaoTao(int id)
        {
            ViewBag.TenCTDT = ChuongTrinhDaoTaoService.ChiTietCTDT(id).TenCTDT;
            return View(id);
        }

        public ActionResult DanhSachHocPhanTheoCTDT(int id)
        {
            var viewModel = HocPhanTheoCTDTService.DanhSachHocPhanTheoCTDT(id);
            return Json(new { data = viewModel }, JsonRequestBehavior.AllowGet);
        }
        /*
             [HttpPost]
             [ValidateAntiForgeryToken]
             public ActionResult XoaChuongTrinhDaoTaoConfirmed(int ChuongTrinhDaoTaoid)
             {
                 try
                 {
                     var result = ChuongTrinhDaoTaoService.XoaCTDT(ChuongTrinhDaoTaoid, "");//làm xong phần accout sẽ bổ sung
                     if (result != null && result.ResponseCode == 1)
                     {
                         return Json(JsonResponseViewModel.CreateSuccess("Xoá chương trình đào tạo thành công."));
                     }
                     else if (result != null && result.ResponseCode == -1)
                     {
                         return Json(JsonResponseViewModel.CreateFail(result.ResponseMessage));
                     }
                     else
                         return Json(JsonResponseViewModel.CreateFail("Xoá chương trình đào tạo thất bại."));
                 }
                 catch (Exception ex)
                 {
                     return Json(JsonResponseViewModel.CreateFail(ex));
                 }
             }
         }
         */
        public ActionResult Import(int CTDTID)
        {
            ViewBag.id = CTDTID;
            return PartialView("_Import");
        }

        [HttpPost]
        //[ValidateAntiForgeryToken]
        public ActionResult Import(HttpPostedFileBase file_imp, int CTDTID)
        {
            try
            {
                var c = Request.Files[0];

                var result = HocPhanTheoCTDTService.Import(c, CTDTID);
                if (result == null)
                {
                    return Json(JsonResponseViewModel.CreateFail("Import học phần theo CTDT không thành công."));
                }
                else if(!String.IsNullOrEmpty(result.ResponseMessage))
                    return Json(JsonResponseViewModel.CreateSuccess("Import học phần theo CTDT thành công. \r\nMã học phần không tìm thấy trong database: "+result.ResponseMessage+"."));
                return Json(JsonResponseViewModel.CreateSuccess("Import học phần theo CTDT thành công."));

            }
            catch (Exception ex)
            {
                return Json(JsonResponseViewModel.CreateFail(ex));
            }
        }
    }
}