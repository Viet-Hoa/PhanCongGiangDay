using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using PhanCongGiangDay.Infrastructure.Attributes;

namespace PhanCongGiangDay.Controllers
{
    public class HomeController : BizController
    {
        [CustomLoginAuthorize]
        public ActionResult Index()
        {
            return View();
        }

        
    }
}