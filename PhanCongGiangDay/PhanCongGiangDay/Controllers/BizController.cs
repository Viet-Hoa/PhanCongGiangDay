using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using PhanCongGiangDay.UtilityHelpers;
using ReportManagement;

namespace PhanCongGiangDay.Controllers
{
    //[CustomAuthorize]
    public class BizController : PdfViewController
    {        
        public void Success(string message)
        {
            if (TempData[Alerts.Success] != null)
            {
                TempData[Alerts.Success] = message;
            }
            else
            {
                TempData.Add(Alerts.Success, message);
            }
        }

        public void Warning(string message)
        {
            if (TempData[Alerts.Warning] != null)
            {
                TempData[Alerts.Warning] = message;
            }
            else
            {
                TempData.Add(Alerts.Warning, message);
            }
        }

        public void Error(string message)
        {
            if (TempData[Alerts.Error] != null)
            {
                TempData[Alerts.Error] = message;
            }
            else
            {
                TempData.Add(Alerts.Error, message);
            }
        }

        public static class Alerts
        {
            public const string Success = "success";
            public const string Error = "danger";
            public const string Warning = "warning";

            public static readonly IEnumerable<string> AllAlerts = new[] { Success, Error, Warning };
        }

        public ActionResult UploadDocument(DropzoneOptions model)
        {
            return PartialView("_UploadDocument", model);
        }
    }
}