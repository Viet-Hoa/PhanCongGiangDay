using System;
using System.Globalization;
using System.Security.Cryptography;
using System.Text;

namespace Lib.Setting
{
    public class Protect
    {
        public static object ToDataType(object pData, Type pType, object pDefaultValue)
        {
            return ToDataType(pData, pType, pDefaultValue, CultureInfo.CurrentCulture);
        }

        public static object ToDataType(object pData, Type pType)
        {
            if (pData == null)
                return null;
            try
            {
                return Convert.ChangeType(pData, pType);
            }
            catch
            {
                return null;
            }
        }

        public static object ToDataType(object pData, Type pType, object pDefaultValue, IFormatProvider pProvider)
        {
            if (pData == null)
                return pDefaultValue;
            try
            {
                return Convert.ChangeType(pData, pType, pProvider);
            }
            catch
            {
                return pDefaultValue;
            }
        }

        public static string ToString(object pData)
        {
            return ToDataType(pData, typeof(string), string.Empty).ToString();
        }

        public static int ToInt32(object pData)
        {
            return ToInt32(pData, -1);
        }

        public static int ToInt32(object pData, int pDefaultValue)
        {
            return (int)ToDataType(pData, typeof(int), pDefaultValue);
        }

        public static short ToInt16(object pData, short pDefaultValue)
        {
            return (short)ToDataType(pData, typeof(short), pDefaultValue);
        }

        public static long ToInt64(object pData, long pDefaultValue)
        {
            return (long)ToDataType(pData, typeof(long), pDefaultValue);
        }

        public static int ToLong(object pData, int pDefaultValue)
        {
            return (int)ToDataType(pData, typeof(int), pDefaultValue);
        }

        public static bool ToBoolean(object pData, bool pDefaultValue)
        {
            return (bool)ToDataType(pData, typeof(bool), pDefaultValue);
        }

        public static double ToDouble(object pData, double pDefaultValue)
        {
            return Convert.ToDouble(string.Format("{0:0.00}", (double)ToDataType(pData, typeof(double), pDefaultValue)));
        }

        public static decimal ToDecimal(object pData, decimal pDefaultValue)
        {
            return (decimal)ToDataType(pData, typeof(decimal), pDefaultValue);
        }
        
        public static DateTime ToDateTime(object pData, string pFormat, DateTime pDefaultValue)
        {
            try
            {
                return DateTime.ParseExact(pData.ToString(), pFormat, CultureInfo.CurrentCulture);
            }
            catch
            {
                return pDefaultValue;
            }
        }

        public static DateTime ToDateTime(object pData, DateTime pDefaultValue)
        {
            return (DateTime)ToDataType(pData, typeof(DateTime), pDefaultValue);
        }

        public static DateTime ToDateTime(DateTime pBaseDateTime, TimeSpan pOffset)
        {
            DateTime dt = pBaseDateTime;
            dt = dt.AddMilliseconds(pOffset.TotalMilliseconds);

            return dt;
        }

        public static DateTime ToDateTime(object pData)
        {
            return (DateTime)ToDataType(pData, typeof(DateTime));
        }

        public static DateTime? ToDateTime(string pData)
        {
            try
            {
                var dt = DateTime.Parse(pData, CultureInfo.InvariantCulture);

                return dt;
            }
            catch
            {
                return null;
            }
        }

        public static string ConvertDateTimeToString(DateTime? date, string format)
        {
            return date.HasValue ? date.Value.Date.ToString(format) : string.Empty;
        }

        public static byte ToByte(object pData, byte pDefaultValue)
        {
            return (byte)ToDataType(pData, typeof(byte), pDefaultValue);
        }

        public static Guid ToGuid(string pData)
        {
            return new Guid(pData);
        }

        public static string UserName(object pData)
        {
            if (pData == null)
            {
                return string.Empty;
            }
            string username = ToString(pData).Trim().ToLower();
            if (username.IndexOf("\\", StringComparison.Ordinal) >= 0)
            {
                username = ToString(username.Split('\\')[1]);
            }
            return username;
        }

        private static readonly string[] VietnameseSigns = {
            "aAeEoOuUiIdDyY",
            "áàạảãâấầậẩẫăắằặẳẵ",
            "ÁÀẠẢÃÂẤẦẬẨẪĂẮẰẶẲẴ",
            "éèẹẻẽêếềệểễ",
            "ÉÈẸẺẼÊẾỀỆỂỄ",
            "óòọỏõôốồộổỗơớờợởỡ",
            "ÓÒỌỎÕÔỐỒỘỔỖƠỚỜỢỞỠ",
            "úùụủũưứừựửữ",
            "ÚÙỤỦŨƯỨỪỰỬỮ",
            "íìịỉĩ",
            "ÍÌỊỈĨ",
            "đ",
            "Đ",
            "ýỳỵỷỹ",
            "ÝỲỴỶỸ"
        };

        public static string RemoveVietnameseSign(string str)
        {
            for (int i = 1; i < VietnameseSigns.Length; i++)
            {

                for (int j = 0; j < VietnameseSigns[i].Length; j++)

                    str = str.Replace(VietnameseSigns[i][j], VietnameseSigns[0][i - 1]);

            }

            return str;
        }
    }
}
