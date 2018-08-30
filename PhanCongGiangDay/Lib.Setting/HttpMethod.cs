using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Lib.Setting
{
    public class HttpMethod
    {
        public static string HttpPost(string url, string parameters, string contentType)
        {
            System.Net.WebRequest req = System.Net.WebRequest.Create(url);
            //req.Proxy = new System.Net.WebProxy(ProxyString, true);
            //Add these, as we're doing a POST
            req.ContentType = contentType;
            req.Method = "POST";
            //We need to count how many bytes we're sending. 
            //Post'ed Faked Forms should be name=value&
            byte[] bytes = System.Text.Encoding.UTF8.GetBytes(parameters);
            req.ContentLength = bytes.Length;
            System.IO.Stream os = req.GetRequestStream();
            os.Write(bytes, 0, bytes.Length); //Push it out there
            os.Close();
            System.Net.WebResponse resp = req.GetResponse();
            if (resp == null) return null;
            System.IO.StreamReader sr =
                  new System.IO.StreamReader(resp.GetResponseStream());
            return sr.ReadToEnd().Trim();
        }

        public static string HttpPost(string url, string postData, string contentType, string authorization, ref int statusCode)
        {
            try
            {
                System.Net.WebRequest req = System.Net.WebRequest.Create(url);
                //req.Proxy = new System.Net.WebProxy(ProxyString, true);
                //Add these, as we're doing a POST
                req.ContentType = contentType;
                req.Method = "POST";
                //We need to count how many bytes we're sending. 
                //Post'ed Faked Forms should be name=value&
                byte[] bytes = System.Text.Encoding.UTF8.GetBytes(postData);
                req.ContentLength = bytes.Length;

                if (!string.IsNullOrEmpty(authorization))
                {
                    req.Headers.Add("Authorization", authorization);
                }

                System.IO.Stream os = req.GetRequestStream();
                os.Write(bytes, 0, bytes.Length); //Push it out there
                os.Close();

                System.Net.WebResponse resp = req.GetResponse();
                if (resp == null) return null;

                System.IO.StreamReader sr = new System.IO.StreamReader(resp.GetResponseStream());

                var response = (HttpWebResponse)req.GetResponse();
                statusCode = response.StatusCode.GetHashCode();

                return sr.ReadToEnd().Trim();
            }
            catch (WebException ex)
            {
                statusCode = ((HttpWebResponse)ex.Response).StatusCode.GetHashCode();

                throw ex;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static string HttpGet(string url)
        {
            var request = (HttpWebRequest)WebRequest.Create(url);

            var response = (HttpWebResponse)request.GetResponse();

            var responseString = new StreamReader(response.GetResponseStream()).ReadToEnd();

            return responseString;
        }
    }
}
