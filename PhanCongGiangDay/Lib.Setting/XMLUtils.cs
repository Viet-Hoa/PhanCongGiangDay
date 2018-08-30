using System;
using System.Data;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Xml.Linq;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Xml;
using System.Xml.XPath;

namespace Lib.Setting
{
    public class DataItemModel
    {
        public DataItemModel()
        { }

        public string text
        {
            get;
            set;
        }
        public string value
        {
            get;
            set;
        }
    }
    public class XMLUtils
    {
        public static List<DataItemModel> BindData(string pGroupNodeName)
        {
            return BindData(pGroupNodeName, false);
        }
        public static List<DataItemModel> BindData(string pGroupNodeName, bool pEmptyAsDefault)
        {
            List<DataItemModel> types = new List<DataItemModel>();
            DataItemModel itemInfo;
            if (pEmptyAsDefault)
            {
                itemInfo = new DataItemModel();
                itemInfo.text = "--Choose--";
                itemInfo.value = string.Empty;
                types.Add(itemInfo);
            }

            XmlDocument doc = new XmlDocument();
            doc.Load(HttpContext.Current.Server.MapPath("~/App_Data/XMLData.xml"));
            if (doc != null)
            {
                XmlNodeList nodes = doc.SelectNodes("/autobind/" + pGroupNodeName + "/item");
                if (nodes != null)
                {
                    int nodeCount = nodes.Count;
                    for (int nodeIndex = 0; nodeIndex < nodeCount; nodeIndex++)
                    {
                        itemInfo = new DataItemModel();
                        itemInfo.text = Protect.ToString(nodes[nodeIndex].Attributes["text"].Value);
                        itemInfo.value = Protect.ToString(nodes[nodeIndex].Attributes["value"].Value);
                        types.Add(itemInfo);
                    }
                }
            }
            return types;
        }

        public static string GetNodeDataByValue(string node, string value)
        {
            string result = string.Empty;
            XmlDocument doc = new XmlDocument();
            doc.Load(HttpContext.Current.Server.MapPath("~/App_Data/XMLData.xml"));
            if (doc != null)
            {
                XmlNode xNode = doc.SelectSingleNode(string.Format("/autobind/{0}/item[@value='{1}']", node, value));
                if (xNode != null)
                {
                    if (xNode.Attributes["text"] != null)
                    {
                        result = Protect.ToString(xNode.Attributes["text"].Value);
                    }
                }
            }
            return result;
        }
    }
}
