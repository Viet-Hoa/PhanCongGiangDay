﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Lib.Setting;
using Lib.PhanCongGiangVien.Model;
using Lib.Setting.Model;
using PhanCongGiangDay.IServices;
using PhanCongGiangDay.Services;
using PhanCongGiangDay.Models.ViewModel.Shared;
using PhanCongGiangDay.Models.ViewModel.PhanCongGiangVien;
using PhanCongGiangDay.Infrastructure.Attributes;
namespace PhanCongGiangDay.Controllers
{
    [CustomLoginAuthorize]
    public class PhanCongGiangVienController : BizController
    {
        private IPhanCongNhomLopService _phanCongNhomLopService;
        private IPhanCongNhomLopService PhanCongNhomLopService => _phanCongNhomLopService ?? (_phanCongNhomLopService = new PhanCongNhomLopService());
        private IBoMonService _boMonService;
        private IBoMonService BoMonService => _boMonService ?? (_boMonService = new BoMonService());
        private INamHocService _namHocService;
        private INamHocService NamHocService => _namHocService ?? (_namHocService = new NamHocService());
        private ICongTacKhacService _congTacKhacService;
        private ICongTacKhacService CongTacKhacService => _congTacKhacService ?? (_congTacKhacService = new CongTacKhacService());
        private readonly IPhanCongGiangVienService PhanCongGiangVienService;

        public PhanCongGiangVienController(IPhanCongGiangVienService _PhanCongGiangVienService)
        {
            PhanCongGiangVienService = _PhanCongGiangVienService;
        }

        // GET: PhanCongGiangVien
        public ActionResult Index()
        {
            var model = NamHocService.DanhSachNamHoc().ToList();
            return View(model);
        }
        [EncryptedActionParameter]
        public ActionResult PhanCong(string NamHoc)
        {
            ViewBag.loai = new SelectList(XMLUtils.BindData("loaigiangvien"), "value", "text");
            ViewBag.hienthi = new SelectList(XMLUtils.BindData("hienthiphancong"), "value", "text");
            ViewBag.bomon = new SelectList(BoMonService.DanhSachBoMon(), "BoMonID", "TenBoMon");
            ViewBag.namhoctext = NamHocService.ChiTietNamHoc(int.Parse(NamHoc)).NamHoc;
            ViewBag.namhocID = int.Parse(NamHoc);
            return View();
        }

        public ActionResult DanhSachGiangVien(int NamHoc, int? Loc)
        {
            var viewModel = PhanCongGiangVienService.DanhSachGiangVienPhanCong(NamHoc,Loc ?? 0);
            return Json(new { data = viewModel }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult DanhSachNhomLop(int NamHoc, int? BoMonID)
        {
            var viewModel = PhanCongNhomLopService.DanhSachPhanCongNhomLop(NamHoc,null,BoMonID);
            return Json(new { data = viewModel }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult ChiTietPhanCongCuaGiangVien(int BangPhanCongID, int GiangVienID)
        {
            var viewModel = PhanCongGiangVienService.ChiTietGiangVienPhanCong(BangPhanCongID, GiangVienID);
            return PartialView("_ChiTietPhanCongGiangVien", viewModel);
        }
        
        [HttpGet]
        public ActionResult ThemPhanCongGiangVien(int BangPhanCongID, int GiangVienID, int i)
        {
            ViewBag.thutu = i + 1;
            ViewBag.gvID = GiangVienID;
            ViewBag.namhoc = BangPhanCongID;
            var pcnl = PhanCongNhomLopService.DanhSachPhanCongNhomLop(BangPhanCongID, null, null);
            ViewBag.hocphanddl = new SelectList(pcnl, "PhanCongNhomLopID", "MaVaTenHP");
            return PartialView("_ThemPhanCongGiangVien");
        }

        [HttpGet]
        public ActionResult ThemPhanCongCongTac(int BangPhanCongID, int GiangVienID, int i)
        {
            ViewBag.thutu = i + 1;
            ViewBag.namhoc = BangPhanCongID;
            ViewBag.gvID = GiangVienID;
            var pcct = CongTacKhacService.DanhSachCongTacKhac().OrderBy(x=>x.CongTacKhacID);
            ViewBag.congtac = new SelectList(pcct, "CongTacKhacLogID", "TenVaSoTiet");
            return PartialView("_ThemPhanCongCongTac");
        }

        [HttpGet]
        public ActionResult CapNhatPhanCongGiangVien(int BangPhanCongID, int GiangVienID)
        {
            var pcnl = PhanCongNhomLopService.DanhSachPhanCongNhomLop(BangPhanCongID,null, null);
            var pcct = CongTacKhacService.DanhSachCongTacKhac().OrderBy(x=>x.CongTacKhacID);
            ViewBag.congtac = new SelectList(pcct, "CongTacKhacLogID", "TenVaSoTiet");
            ViewBag.sotietct = new SelectList(pcct, "CongTacKhacLogID", "SoTiet");
            ViewBag.pcnlddl = new SelectList(pcnl, "PhanCongNhomLopID", "MaVaTenHP");
            ViewBag.conlaiLT = new SelectList(pcnl, "PhanCongNhomLopID", "SoLuongConLaiLT");
            ViewBag.conlaiTH = new SelectList(pcnl, "PhanCongNhomLopID", "SoLuongConLaiTH");
            ViewBag.hocphanlt = new SelectList(pcnl, "PhanCongNhomLopID", "SoTietLT");
            ViewBag.hocphanth = new SelectList(pcnl, "PhanCongNhomLopID", "SoTietTH");
            ViewBag.bomont = new SelectList(pcnl, "PhanCongNhomLopID", "TenBoMon");
            ViewBag.namhoc = BangPhanCongID;
            var viewModel = PhanCongGiangVienService.ChiTietGiangVienPhanCong(BangPhanCongID, GiangVienID);
            if (viewModel.NhomLopPhanCong == null)
                viewModel.NhomLopPhanCong = new List<PhanCongGiangVienModel>();
            if (viewModel.CongTacKhac == null)
                viewModel.CongTacKhac = new List<PhanCongCongTacModel>();
            return PartialView("_CapNhatPhanCongGiangVien", viewModel);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult CapNhatPhanCongGiangVien(PhanCongGiangVienViewModel model)
        {
            try
            {
                ResponseResult result = null;
                model.NhomLopPhanCong = model.NhomLopPhanCong.Where(x => x.PhanCongNhomLopID != 0).ToList();
                foreach(var item in model.NhomLopPhanCong)
                {
                    if (item.TrangThai == 2)
                        result = PhanCongGiangVienService.ThemPhanCongGiangVien(item);
                    else if (item.TrangThai == -1)
                        result = PhanCongGiangVienService.XoaPhanCongGiangVien(item.PhanCongID, "");
                    else
                        result = PhanCongGiangVienService.SuaPhanCongGiangVien(item);

                    if (result == null)
                    {
                        return Json(JsonResponseViewModel.CreateFail("Cập nhật phân công nhóm lớp cho giảng viên thất bại."));
                    }
                    else if (result != null && result.ResponseCode == -1)
                    {
                        return Json(JsonResponseViewModel.CreateFail(result.ResponseMessage));
                    }  
                }
                if(model.CongTacKhac!=null)
                {
                    model.CongTacKhac = model.CongTacKhac.Where(x => x.CongTacKhacLogID != 0).ToList();
                    foreach (var item in model.CongTacKhac)
                    {
                        if (item.TrangThai == 2)
                            result = PhanCongGiangVienService.ThemPhanCongCongTac(item);
                        else
                            result = PhanCongGiangVienService.SuaPhanCongCongTac(item);

                        if (result == null)
                        {
                            return Json(JsonResponseViewModel.CreateFail("Cập nhật phân công nhóm lớp cho giảng viên thất bại."));
                        }
                        else if (result != null && result.ResponseCode == -1)
                        {
                            return Json(JsonResponseViewModel.CreateFail(result.ResponseMessage));
                        }
                    }
                }                
                return Json(JsonResponseViewModel.CreateSuccess("Cập nhật phân công nhóm lớp cho giảng viên thành công."));
            }
            catch (Exception ex)
            {
                return Json(JsonResponseViewModel.CreateFail(ex));
            }
        }

        [HttpGet]
        public ActionResult CapNhatPhanCongGiangVienNhomLop(int BangPhanCongID, int PhanCongNhomLopID)
        {
            var viewModel = PhanCongGiangVienService.ChiTietNhomLopPhanCong(BangPhanCongID, PhanCongNhomLopID);
            var gv = PhanCongGiangVienService.DanhSachGiangVienPhanCong(BangPhanCongID, 0);
            //ViewBag.gvbomonddl = new SelectList(gv.Where(x=>x.BoMonID==viewModel.BoMonID), "GiangVienLogID", "HoTenGV");
            ViewBag.giangvienddl = new SelectList(gv,"GiangVienLogID", "HoTenGV");
            ViewBag.namhoc = BangPhanCongID;
            return PartialView("_CapNhatPhanCongGiangVienNhomLop", viewModel);
        }
        [HttpGet]
        public ActionResult ThemPhanCongGiangVienNhomLop(int BangPhanCongID, int i)
        {
            ViewBag.thutu = i + 1;
            var gv = PhanCongGiangVienService.DanhSachGiangVienPhanCong(BangPhanCongID, 0);
            ViewBag.giangvienddl = new SelectList(gv, "GiangVienLogID", "HoTenGV");
            return PartialView("_ThemPhanCongGiangVienNhomLop");
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult CapNhatPhanCongGiangVienNhomLop(PhanCongGiangVienTheoNhomLopViewModel model)
        {
            try
            {
                ResponseResult result = null;
                model.GiangVienPhanCong = model.GiangVienPhanCong.Where(x => x.GiangVienLogID != 0).ToList();
                foreach (var item in model.GiangVienPhanCong)
                {
                    item.PhanCongNhomLopID = model.PhanCongNhomLopID;
                    if (item.TrangThai == 2)
                        result = PhanCongGiangVienService.ThemPhanCongGiangVien(item);
                    else if (item.TrangThai == -1)
                        result = PhanCongGiangVienService.XoaPhanCongGiangVien(item.PhanCongID, "");
                    else
                        result = PhanCongGiangVienService.SuaPhanCongGiangVien(item);

                    if (result == null)
                    {
                        return Json(JsonResponseViewModel.CreateFail("Cập nhật phân công giảng viên cho nhóm lớp thất bại."));
                    }
                    else if (result != null && result.ResponseCode == -1)
                    {
                        return Json(JsonResponseViewModel.CreateFail(result.ResponseMessage));
                    }
                }
                return Json(JsonResponseViewModel.CreateSuccess("Cập nhật phân công giản viên cho nhóm lớp thành công."));

            }
            catch (Exception ex)
            {
                return Json(JsonResponseViewModel.CreateFail(ex));
            }
        }
    }
}