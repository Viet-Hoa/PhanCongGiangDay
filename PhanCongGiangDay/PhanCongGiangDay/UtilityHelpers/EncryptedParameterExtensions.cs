using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Lib.Setting;
using System.Web.Routing;
using System.Text;
using System.Web;

namespace PhanCongGiangDay.UtilityHelpers
{
    public static class EncryptedParameterExtensions
    {
        public static string EncodedActionLink(this UrlHelper urlHelper, string actionName, string controllerName, object routeValues)
        {
            string queryString = string.Empty;
            string htmlAttributesString = string.Empty;
            if (routeValues != null)
            {
                RouteValueDictionary d = new RouteValueDictionary(routeValues);
                for (int i = 0; i < d.Keys.Count; i++)
                {                    
                    if(d.Values.ElementAt(i)!=null)
                    {
                        if (i > 0)
                        {
                            queryString += "?";
                        }
                        queryString += d.Keys.ElementAt(i) + "$" + Cryptography.EncryptBase64(d.Values.ElementAt(i).ToString(), "secret");
                    }                        
                }
            }

            //What is Entity Framework??
            StringBuilder ancor = new StringBuilder();            
            if (controllerName != string.Empty)
            {
                ancor.Append("/" + controllerName);
            }
            if (actionName != "Index")
            {
                ancor.Append("/" + actionName);
            }
            else
            {
                ancor.Append("/");
            }
            if (queryString != string.Empty)
            {
                ancor.Append("?q=" + queryString);
            }
            return ancor.ToString();
        }

        
    }
}
