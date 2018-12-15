using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Lib.Setting;

namespace PhanCongGiangDay.Infrastructure.Attributes
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class EncryptedActionParameter: ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {

            Dictionary<string, object> decryptedParameters = new Dictionary<string, object>();
            if (HttpContext.Current.Request.QueryString.Get("q") != null)
            {
                string encryptedQueryString = HttpContext.Current.Request.QueryString.Get("q").Replace(" ","+");
                List<string> paramsArrs = new List<string>();
                if (encryptedQueryString.Contains("?"))
                    paramsArrs = encryptedQueryString.Split('?').ToList();
                else
                {
                    paramsArrs.Add(encryptedQueryString);
                }
                for (int i = 0; i < paramsArrs.Count; i++)
                {
                    List<string> paramArr = paramsArrs[i].Split('$').ToList();
                    decryptedParameters.Add(paramArr[0], (Cryptography.DecryptBase64(paramArr[1],"secret")));// pass two string parameters
                }
            }
            for (int i = 0; i < decryptedParameters.Count; i++)
            {
                filterContext.ActionParameters[decryptedParameters.Keys.ElementAt(i)] = decryptedParameters.Values.ElementAt(i);
            }
            base.OnActionExecuting(filterContext);

        }
    }
}