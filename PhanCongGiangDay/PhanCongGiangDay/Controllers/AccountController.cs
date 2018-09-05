using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PhanCongGiangDay.Controllers
{
    public class AccountController : BizController
    {
        // GET: Account
        public ActionResult Login()
        {
            return View();
        }
    }
}