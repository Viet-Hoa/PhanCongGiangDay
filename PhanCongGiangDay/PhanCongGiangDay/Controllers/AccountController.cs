using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Lib.Account.Model;
using PhanCongGiangDay.Models.ViewModel.Shared;
using PhanCongGiangDay.IServices;
using Lib.Setting;

namespace PhanCongGiangDay.Controllers
{
    public class AccountController : BizController
    {

        private readonly IAccountService AccountService;
        public AccountController(IAccountService _accountService)
        {
            AccountService = _accountService;
        }

        public ActionResult Login(string returnUrl)
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Login(AccountModel userViewModel)
        {
            var user = AccountService.Login(userViewModel.UserName, Cryptography.EncryptMD5(userViewModel.Password));

            if (user != null)
            {
                Sessions.AddObject<AccountModel>("AccountSessionObject",user);
                if(!string.IsNullOrEmpty(userViewModel.ReturnUrl))
                    return Json(JsonResponseViewModel.CreateSuccess(userViewModel.ReturnUrl));
                return Json(JsonResponseViewModel.CreateSuccess("/Home/Index"));
            }
            else
                return Json(JsonResponseViewModel.CreateFail("Tên đăng nhập hoặc mật khẩu không chính xác!"));
        }

      

        public ActionResult LogOff()
        {
            Sessions.Remove();
            return RedirectToAction("Login");
        }

        public ActionResult UnAuthorize()
        {
            return View();
        }

        public JsonResult DoEncrypt(string strInput)
        {
            string strOut = Cryptography.EncryptBase64(strInput);

            return Json(new { strOut }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult ChangePassword()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult ChangePassword(string oldPassword, string newPassword)
        {
            try
            {
                var res = AccountService.ChangePassord(Cryptography.EncryptMD5(oldPassword), Cryptography.EncryptMD5(newPassword));
                if (res != null && res.ResponseCode == 1)
                    return Json(JsonResponseViewModel.CreateSuccess("Đổi mật khẩu thành công!"));
                else
                    return Json(JsonResponseViewModel.CreateFail("Đổi mật khẩu thất bại!"));
            }
            catch(Exception ex)
            {
                return Json(JsonResponseViewModel.CreateFail(ex));
            }
        }

        public ActionResult ListAccount()
        {
            return View();
        }

        public ActionResult ListAccountModel()
        {
            var viewModel = AccountService.ListAccount();
            return Json(new { data = viewModel }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult CreateAccount()
        {
            return PartialView("_CreateAccount");
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult CreateAccount(AccountModel viewModel)
        {
            try
            {
                viewModel.Password = Cryptography.EncryptMD5(viewModel.Password);
                var res = AccountService.CreateAccount(viewModel);
                if (res != null && res.ResponseCode == 1)
                    return Json(JsonResponseViewModel.CreateSuccess("Tạo tài khoản thành công!"));
                else
                    return Json(JsonResponseViewModel.CreateFail("Tạo tài khoản thất bại!"));
            }
            catch (Exception ex)
            {
                return Json(JsonResponseViewModel.CreateFail(ex));
            }
        }

        public ActionResult EditAccount()
        {
            return PartialView("_EditAccount");
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult EditAccount(AccountModel viewModel)
        {
            try
            {
                var res = AccountService.EditAccount(viewModel);
                if (res != null && res.ResponseCode == 1)
                    return Json(JsonResponseViewModel.CreateSuccess("Sửa tài khoản thành công!"));
                else
                    return Json(JsonResponseViewModel.CreateFail("Sửa tài khoản thất bại!"));
            }
            catch (Exception ex)
            {
                return Json(JsonResponseViewModel.CreateFail(ex));
            }
        }
    }
}