﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PhanCongGiangDay.Controllers
{
    public class HomeController : BizController
    {
        public ActionResult Index()
        {
            return View();
        }

        
    }
}