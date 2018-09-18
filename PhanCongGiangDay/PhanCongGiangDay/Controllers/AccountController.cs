using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Lib.Account.Model;
using PhanCongGiangDay.Models.ViewModel.Shared;

namespace PhanCongGiangDay.Controllers
{
    public class AccountController : BizController
    {
        // GET: Account
        public ActionResult Login()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Login(AccountModel acc)
        {
            return Json(JsonResponseViewModel.CreateSuccess("/Home/Index"));
        }
    }
}