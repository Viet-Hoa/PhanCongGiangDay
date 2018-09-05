using Lib.Setting;
using PhanCongGiangDay.Infrastructure.Caching;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
namespace PhanCongGiangDay.Infrastructure.Extensions
{
    public static class HtmlExtensions
    {
        public static string CssClassIfRouteActive(this HtmlHelper html, string action, string controller, string area = null)
        {
            return IsRouteActive(action, controller, area) ? "active" : String.Empty;
        }

        public static string CssClassIfRouteActive(this HtmlHelper html, string[] actions, string controller, string area = null)
        {
            bool active = false;

            foreach (var action in actions)
            {
                if (IsRouteActive(action, controller, area))
                {
                    active = true;
                }
            }

            return active ? "active" : String.Empty;
        }

        public static string UrlCongDoanHoSo(int congDoan, int hoSoVuAnID)
        {
            UrlHelper u = new UrlHelper(HttpContext.Current.Request.RequestContext);
            string url = u.Action("ChiTietHoSo", "NhanDon", new { id = hoSoVuAnID });

            switch (congDoan)
            {
                case 2:
                    url = u.Action("Index", "ThuLy", new { id = hoSoVuAnID });
                    break;
                case 3:
                    url = u.Action("Index", "ChuanBiXetXu", new { id = hoSoVuAnID });
                    break;
                case 4:
                    url = u.Action("Index", "KetQuaXetXu", new { id = hoSoVuAnID });
                    break;
                case 5:
                    url = u.Action("Index", "SauXetXu", new { id = hoSoVuAnID });
                    break;
                case -1:
                    url = u.Action("Index", "SauXetXu", new { id = hoSoVuAnID });
                    break;
            }

            return url;
        }

        public static string ClassSortOrder(string field, string sortOrder)
        {
            string className = "sorting";


            if (sortOrder != null && sortOrder.Contains(field))
            {
                className = "sorting_asc";

                if (sortOrder.Contains("desc"))
                {
                    className = "sorting_desc";
                }
            }
            

            return className;
        }

        private static bool IsRouteActive(string action, string controller, string area)
        {
            var requestContext = HttpContext.Current.Request.RequestContext;
            var currentAction = requestContext.RouteData.Values["action"].ToString();
            var currentController = requestContext.RouteData.Values["controller"].ToString();

            var currentArea = "";
            if (requestContext.RouteData.DataTokens["area"] != null)
            {
                currentArea = requestContext.RouteData.DataTokens["area"].ToString();
            }

            if (String.IsNullOrEmpty(area))
            {
                area = currentArea;
            }

            if (String.IsNullOrEmpty(controller))
            {
                controller = currentController;
            }

            if (String.IsNullOrEmpty(action))
            {
                action = currentAction;
            }

            return controller == currentController && action == currentAction && area == currentArea;
        }
    }
}