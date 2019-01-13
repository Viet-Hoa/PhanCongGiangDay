using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using PhanCongGiangDay.IServices;
using Lib.Setting.Model;
using Lib.PhanCongGiangVien.DataAccess;
using Lib.PhanCongGiangVien.IDataAccess;
using Lib.PhanCongGiangVien.Model;
using Lib.PhanCongNhomLop.Model;
using PhanCongGiangDay.Models.ViewModel.PhanCongGiangVien;

namespace PhanCongGiangDay.Services
{
    public class PhanCongGiangVienService: IPhanCongGiangVienService
    {
        private IPhanCongGiangVienDataAccess _PhanCongGiangVienDA;
        private IPhanCongGiangVienDataAccess PhanCongGiangVienDA
        {
            get { return _PhanCongGiangVienDA ?? (_PhanCongGiangVienDA = new PhanCongGiangVienDataAccess()); }
        }
        private IPhanCongNhomLopService _phanCongNhomLopService;
        private IPhanCongNhomLopService PhanCongNhomLopService => _phanCongNhomLopService ?? (_phanCongNhomLopService = new PhanCongNhomLopService());

        public IEnumerable<PhanCongGiangVienModel> DanhSachPhanCongGiangVien(int BangPhanCongID, int GiangVienID)
        {
            IEnumerable<PhanCongGiangVienModel> list = null;
            try
            {
                list= PhanCongGiangVienDA.DanhSachPhanCongGiangVien(BangPhanCongID, GiangVienID);                
            }
            catch(Exception ex)
            {
                throw ex;
            }
            return list;
        }

        public ResponseResult ThemPhanCongGiangVien(PhanCongGiangVienModel model)
        {
            ResponseResult res = null;
            try
            {
                res = PhanCongGiangVienDA.ThemPhanCongGiangVien(model);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return res;
        }
        public ResponseResult SuaPhanCongGiangVien(PhanCongGiangVienModel model)
        {
            ResponseResult res = null;
            try
            {
                res = PhanCongGiangVienDA.SuaPhanCongGiangVien(model);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return res;
        }
        public ResponseResult XoaPhanCongGiangVien(int PhanCongGiangVienID, string NguoiTao)
        {
            ResponseResult res = null;
            try
            {
                res = PhanCongGiangVienDA.XoaPhanCongGiangVien(PhanCongGiangVienID,NguoiTao);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return res;
        }

        public IEnumerable<PhanCongCongTacModel> DanhSachPhanCongCongTac(int BangPhanCongID, int GiangVienID)
        {
            IEnumerable<PhanCongCongTacModel> list = null;
            try
            {
                list = PhanCongGiangVienDA.DanhSachPhanCongCongTac(BangPhanCongID, GiangVienID);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return list;
        }
        public ResponseResult ThemPhanCongCongTac(PhanCongCongTacModel model)
        {
            ResponseResult res = null;
            try
            {
                res = PhanCongGiangVienDA.ThemPhanCongCongTac(model);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return res;
        }
        public ResponseResult SuaPhanCongCongTac(PhanCongCongTacModel model)
        {
            ResponseResult res = null;
            try
            {
                res = PhanCongGiangVienDA.SuaPhanCongCongTac(model);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return res;
        }

        public IEnumerable<PhanCongGiangVienViewModel> DanhSachGiangVienPhanCong(int BangPhanCongID, int Loc)
        {
            List<PhanCongGiangVienViewModel> list = new List<PhanCongGiangVienViewModel>();
            try
            {
                var dbModel = PhanCongGiangVienDA.DanhSachGiangVienPhanCong(BangPhanCongID,Loc);
                foreach(var item in dbModel)
                {
                    var gv = new PhanCongGiangVienViewModel
                    {
                        STT = item.STT,
                        HoTenGV = item.Ho + " " + item.Ten,
                        GiangVienLogID = item.GiangVienLogID,
                        TongSoTiet = item.TongSoTiet,
                        SoTietThucTe = item.TongSoTietThucTe
                    };
                    list.Add(gv);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return list;
        }

        public PhanCongGiangVienTheoNhomLopViewModel ChiTietNhomLopPhanCong(int BangPhanCongID, int PhanCongNhomLopID)
        {
            PhanCongGiangVienTheoNhomLopViewModel viewModel = null;
            try
            {
                var model = PhanCongNhomLopService.ChiTietPhanCongNhomLop(PhanCongNhomLopID);
                var pc = PhanCongGiangVienDA.DanhSachPhanCongGiangVienTheoNhomLop(BangPhanCongID, PhanCongNhomLopID).ToList();
                viewModel = new PhanCongGiangVienTheoNhomLopViewModel
                {
                    PhanCongNhomLopID = model.PhanCongNhomLopID,
                    MaHP = model.MaHP,
                    TenHocPhan = model.TenHocPhan,
                    TenBoMon = model.TenBoMon,
                    BangPhanCongID = model.BangPhanCongID,
                    HocPhanLogID = model.HocPhanLogID,
                    KhoaID = model.KhoaID,
                    SLSVNhomLop = model.SLSVNhomLop,
                    SoLuongNhomLopLT = model.SoLuongNhomLopLT,
                    SoLuongNhomLopTH = model.SoLuongNhomLopTH,
                    SoLuongConLaiLT = model.SoLuongConLaiLT,
                    SoLuongConLaiTH = model.SoLuongConLaiTH,
                    SoTietLT = model.SoTietLT,
                    SoTietTH = model.SoTietTH,
                    BoMonID = model.BoMonID,
                    HocKi=model.HocKi,
                    TenCTDT=model.TenCTDT,
                    GiangVienPhanCong = pc.ToList()
                };
            }
            catch(Exception ex)
            {
                throw ex;
            }
            return viewModel;
        }

        public PhanCongGiangVienViewModel ChiTietGiangVienPhanCong(int BangPhanCongID, int GiangVienID)
        {
            PhanCongGiangVienViewModel viewmodel = null;
            try
            {
                var model = PhanCongGiangVienDA.ChiTietGiangVienPhanCong(BangPhanCongID, GiangVienID);
                var ct = PhanCongGiangVienDA.DanhSachPhanCongCongTac(BangPhanCongID, GiangVienID).ToList();
                string s = "";
                if (ct != null && ct.Any())
                {
                    foreach(var item in ct)
                    {
                        s += item.TenVaSoTiet + ", ";
                    }
                    s=s.Remove(s.LastIndexOf(","));
                }

                viewmodel = new PhanCongGiangVienViewModel
                {
                    HoTenGV = model.Ho + " " + model.Ten,
                    ChucVu = model.ChucVu,
                    LopPhuTrach = model.LopPhuTrach,
                    GiangVienLogID = model.GiangVienLogID,
                    TongSoTiet = model.TongSoTiet,
                    SoTietThucTe = model.TongSoTietThucTe,
                    LoaiGV = model.LoaiGV,
                    NhomLopPhanCong = PhanCongGiangVienDA.DanhSachPhanCongGiangVien(BangPhanCongID, GiangVienID).ToList(),
                    CongTacKhac = ct,
                    CongTac = s,
                    Truong = model.Truong,
                    TenBoMon = model.TenBoMon,
                    TenDonVi = model.TenDonVi,
                    ChucDanh = model.ChucDanh,
                    HocVi = model.HocVi
                };
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return viewmodel;
        }
    }
}