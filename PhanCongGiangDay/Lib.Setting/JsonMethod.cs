using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.Serialization.Json;
using System.Text;
using System.Threading.Tasks;
using System.Web.Script.Serialization;

namespace Lib.Setting
{
    public class JsonMethod
    {
        public static string JsonSerializer<T>(T t)
        {
            DataContractJsonSerializer ser = new DataContractJsonSerializer(typeof(T));
            MemoryStream ms = new MemoryStream();
            ser.WriteObject(ms, t);
            string jsonString = Encoding.UTF8.GetString(ms.ToArray());
            ms.Close();
            return jsonString;
        }

        public static T JsonDeserialize<T>(string jsonString)
        {
            DataContractJsonSerializer ser = new DataContractJsonSerializer(typeof(T));
            MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jsonString));
            T obj = (T)ser.ReadObject(ms);
            return obj;
        }

        public static string JSSerializer<T>(T t)
        {
            JavaScriptSerializer ser = new JavaScriptSerializer();
            string jsonString = ser.Serialize(t);

            return jsonString;
        }
        public static T JSDeserialize<T>(string jsonString)
        {
            JavaScriptSerializer ser = new JavaScriptSerializer();
            T obj = (T)ser.Deserialize<T>(jsonString);

            return obj;
        }

    }
}
