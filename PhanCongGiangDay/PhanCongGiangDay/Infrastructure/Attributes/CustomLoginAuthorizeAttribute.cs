using System;
using System.Web;
using System.Web.Mvc;
using Lib.Setting;
using System.Web.Routing;
using Lib.Account.DataAccess;
using Lib.Account.IDataAccess;
using PhanCongGiangDay.UtilityHelpers;
namespace PhanCongGiangDay.Infrastructure.Attributes
{
    public class CustomLoginAuthorizeAttribute : FilterAttribute,IAuthorizationFilter
    {
        private IAccountDataAccess _AccountDA;
        private IAccountDataAccess AccountDA
        {
            get { return _AccountDA ?? (_AccountDA = new AccountDataAccess()); }
        }

        private void CacheValidateHandler(HttpContext context, object data, ref HttpValidationStatus validationStatus)
        {
            validationStatus = OnCacheAuthorization(new HttpContextWrapper(context));
        }

        public virtual void OnAuthorization(AuthorizationContext filterContext)
        {
            if (filterContext == null)
            {
                throw new ArgumentNullException("filterContext");
            }

            if (AuthorizeCore(filterContext.HttpContext))
            {
                // ** IMPORTANT **
                // Since we're performing authorization at the action level, the authorization code runs
                // after the output caching module. In the worst case this could allow an authorized user
                // to cause the page to be cached, then an unauthorized user would later be served the
                // cached page. We work around this by telling proxies not to cache the sensitive page,
                // then we hook our custom authorization code into the caching mechanism so that we have
                // the final say on whether a page should be served from the cache.

                HttpCachePolicyBase cachePolicy = filterContext.HttpContext.Response.Cache;
                cachePolicy.SetProxyMaxAge(new TimeSpan(0));
                cachePolicy.AddValidationCallback(CacheValidateHandler, null /* data */);
            }
            else
            {
                //// auth failed, redirect to login page
                //filterContext.Result = new HttpUnauthorizedResult();

                // custom redirect to another page
                var context = new RequestContext(new HttpContextWrapper(System.Web.HttpContext.Current), new RouteData());
                var urlHelper = new UrlHelper(context);
                var url = urlHelper.Action("Index", "Home");
                string returnUrl = string.Empty;

                //if(HttpContext.Current.Request.HttpMethod == "GET")
                returnUrl = HttpContext.Current.Request.Url.PathAndQuery;

                int statusCode = 200;

                if (!string.IsNullOrEmpty(Sessions.GetMessage("SessionExpired")))
                {
                    url = urlHelper.Action("Login", "Account", new { returnUrl = returnUrl });
                    statusCode = 308;
                }

                if (filterContext.HttpContext.Request.IsAjaxRequest())
                {
                    filterContext.Result = new JsonResult
                    {
                        Data = new
                        {
                            status = statusCode
                        },
                        JsonRequestBehavior = JsonRequestBehavior.AllowGet
                    };

                    //xhr status code 401 to redirect
                    filterContext.HttpContext.Response.StatusCode = statusCode;

                    return;
                }

                //System.Web.HttpContext.Current.Response.Redirect(url);
                filterContext.Result = new RedirectResult(url);
            }
        }
        // This method must be thread-safe since it is called by the caching module.
        protected virtual HttpValidationStatus OnCacheAuthorization(HttpContextBase httpContext)
        {
            if (httpContext == null)
            {
                throw new ArgumentNullException("httpContext");
            }

            bool isAuthorized = AuthorizeCore(httpContext);
            return (isAuthorized) ? HttpValidationStatus.Valid : HttpValidationStatus.IgnoreThisRequest;
        }

        protected virtual bool AuthorizeCore(HttpContextBase httpContext)
        {
            if (httpContext == null) throw new ArgumentNullException("httpContext");

            string controller = Protect.ToString(httpContext.Request.RequestContext.RouteData.Values["controller"]).Trim();
            string action = Protect.ToString(httpContext.Request.RequestContext.RouteData.Values["action"]).Trim();            
            // check LoginSessionKey
            var loginSessionKey = Sessions.GetMessage("LoginKey");
            var res = AccountDA.CheckSession(AccountUtils.CurrentSessionKey());
            // invalid session
            if (res.ResponseCode == 0)
            {
                Sessions.AddMessage("SessionExpired", "Hết hạn lượt truy cập.");
                return false;
            }

            return true;
        }
    }
}
