using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Globalization;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Text.RegularExpressions;
using System.Web.Security;
using Lib.Setting.Attributes;
using System.Net;
using System.IO;
using System.Net.Mail;
using System.Configuration;
using System.Xml;

namespace Lib.Setting
{
    public static class Commons
    {
        public static IEnumerable<T> ConvertDataTable<T>(DataTable dt)
        {
            var data = new List<T>();
            try
            {
                foreach (DataRow row in dt.Rows)
                {
                    var item = GetItem<T>(row);
                    data.Add(item);
                }
            }
            catch (Exception ex)
            {
                string mgs = ex.Message;
                throw ex;
            }

            return data;
        }

        public static IEnumerable<T> ConvertExcelToDataTable<T>(DataTable dt)
        {
            var data = new List<T>();

            int index = 1;
            foreach (DataRow row in dt.Rows)
            {
                var item = GetExcelItem<T>(row, index);
                data.Add(item);
                index++;
            }

            return data;
        }

        public static string ConvertToXml<T>(IEnumerable<T> list, string rootName, string tagName)
        {
            var builder = new StringBuilder(string.Format("<?xml version='1.0' encoding='utf-16'?><{0}>", rootName));

            foreach (var obj in list)
            {
                var child = string.Format("<{0}", tagName);
                child = obj.GetType().GetProperties()
                    .Aggregate(child,
                        (current, prop) => current + string.Format(" {0}='{1}'", prop.Name, prop.PropertyType == typeof(string) ? RemoveXmlReservedCharacters(prop.GetValue(obj, null) == null ? null : prop.GetValue(obj, null) as string) : prop.GetValue(obj, null)));
                child += " />";
                builder.Append(child);
            }

            builder.Append("</" + rootName + ">");
            return builder.ToString();
        }

        public static string ConvertToXml<T>(IEnumerable<T> list, string rootName, string tagName, string encoding)
        {
            var builder = new StringBuilder(string.Format("<?xml version='1.0' encoding='" + encoding + "'?><{0}>", rootName));

            foreach (var obj in list)
            {
                var child = string.Format("<{0}", tagName);
                child = obj.GetType().GetProperties()
                    .Aggregate(child,
                        (current, prop) => current + string.Format(" {0}='{1}'", prop.Name, prop.PropertyType == typeof(string) ? RemoveXmlReservedCharacters(prop.GetValue(obj, null) == null ? null : prop.GetValue(obj, null) as string) : prop.GetValue(obj, null)));
                child += " />";
                builder.Append(child);
            }

            builder.Append("</" + rootName + ">");
            return builder.ToString();
        }

        #region Privite methods

        private static T GetItem<T>(DataRow dr)
        {
            try
            {
                var temp = typeof(T);
                var obj = Activator.CreateInstance<T>();

                foreach (DataColumn column in dr.Table.Columns)
                {

                    var pro = temp.GetProperties().FirstOrDefault(f => f.Name.ToLower() == column.ColumnName.ToLower());
                    if (pro != null)
                    {
                        if (Nullable.GetUnderlyingType(pro.PropertyType) != null)
                        {
                            if (dr[column.ColumnName] == DBNull.Value)
                            {
                                pro.SetValue(obj, null);
                            }
                            else
                            {
                                pro.SetValue(obj,
                                    Convert.ChangeType(dr[column.ColumnName],
                                        Type.GetType(Nullable.GetUnderlyingType(pro.PropertyType).ToString())));
                            }

                            continue;
                        }

                        pro.SetValue(obj,
                            Convert.ChangeType(dr[column.ColumnName], Type.GetType(pro.PropertyType.ToString())));
                    }
                }

                return obj;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        private static T GetExcelItem<T>(DataRow dr, int index)
        {

            var temp = typeof(T);
            var obj = Activator.CreateInstance<T>();

            foreach (DataColumn column in dr.Table.Columns)
            {
                try
                {
                    var pro = temp.GetProperties().FirstOrDefault(f => f.Name.ToLower() == column.ColumnName.ToLower());
                    if (pro != null)
                    {
                        if (Nullable.GetUnderlyingType(pro.PropertyType) != null)
                        {
                            if (dr[column.ColumnName] == DBNull.Value)
                            {
                                pro.SetValue(obj, null);
                            }
                            else
                            {
                                pro.SetValue(obj,
                                    Convert.ChangeType(dr[column.ColumnName],
                                        Type.GetType(Nullable.GetUnderlyingType(pro.PropertyType).ToString())));
                            }


                            continue;
                        }

                        pro.SetValue(obj,
                            Convert.ChangeType(dr[column.ColumnName], Type.GetType(pro.PropertyType.ToString())));

                    }
                }
                catch (Exception ex)
                {
                    throw new ExcelFormatNotValid(
                        string.Format("Sheet [{0}] - Row [{1}] - Column [{2}] is not valid - Error: {3}.", temp.Name,
                            index, column.ColumnName, ex.Message));
                }
            }
            return obj;
        }

        #endregion

        public static string GenerateRandomString(int length, int numberOfNonAlphanumericCharacters)
        {
            return Membership.GeneratePassword(length, numberOfNonAlphanumericCharacters);
        }

        public static string SmartLimitTitle(object strTitle, int limitLength)
        {
            string strReturn = string.Empty;
            string tmp = string.Empty;
            bool needSplit = false;
            bool needAdd2 = false;
            if (strTitle != null)
            {
                tmp = strTitle.ToString();
            }
            if (tmp.Length <= limitLength)
            {
                return tmp;
            }
            for (int i = 0; i < tmp.Length; i++)
            {
                strReturn = strReturn + tmp[i].ToString();
                if (i == limitLength && tmp[i].ToString().Trim() == string.Empty)
                {
                    break;
                }
                else if (i == limitLength && tmp[i].ToString().Trim() != string.Empty)
                {
                    needSplit = true;
                    break;
                }
            }
            if (needSplit)
            {
                int lastSpace = strReturn.LastIndexOf(' ');
                if (lastSpace > 0)
                {
                    strReturn = strReturn.Substring(0, lastSpace);
                }
            }
            if (strReturn.IndexOf('(') > 0 && strReturn.IndexOf(')') < 0)
            {
                needAdd2 = true;
                strReturn = strReturn.Trim() + ")";
            }
            if (strReturn.Length < tmp.Length)
            {
                if (needAdd2)
                {
                    strReturn = strReturn.Trim() + "..";
                }
                else
                {
                    strReturn = strReturn.Trim() + "...";
                }
            }
            return strReturn;
        }

        public static string RemoveHtmlTag(string content)
        {
            if (string.IsNullOrEmpty(content))
                return content;
            else
            {
                content = System.Text.RegularExpressions.Regex.Replace(content, @"<\s*?[^>]+\s*?>", "");
                return content.Trim();
            }
        }

        public static object GetPropertyAttributes(PropertyInfo prop, string attributeName)
        {
            object[] attrs = prop.GetCustomAttributes(false);

            foreach (object attr in attrs)
            {
                if (attr.GetType().Name == attributeName + "Attribute")
                {
                    //THIS SHOULD BE REFLECTION
                    if (attr is ICustomAttribute) // check if attr implements interface (you may have to reflect to get this)
                    {
                        return (attr as ICustomAttribute).Message;
                    }
                }
            }

            return null;
        }

        public static List<string> ValidateExcel<T>(DataTable table)
        {
            var errorMessages = new List<string>();

            var validationFormatResults = ValidateExcelFormat<T>(table);
            if (validationFormatResults.Any())
            {
                errorMessages.AddRange(validationFormatResults);
                return errorMessages;
            }

            var validationDataResults = ValidateExcelData<T>(table);
            if (validationDataResults.Any())
                errorMessages.AddRange(validationDataResults);

            return errorMessages;
        }

        private static List<string> ValidateExcelFormat<T>(DataTable table)
        {
            var errorMessages = new List<string>();

            var columnNames = table.Columns.Cast<DataColumn>().Select(x => x.ColumnName).ToList();
            var objProperties = typeof(T).GetProperties().Select(s => s.Name).ToList();

            if (columnNames.Count > objProperties.Count || columnNames.Count < objProperties.Count)
                errorMessages.Add(HelperNotifyMessage.VALIDATE_EXCEL_INVALID_FORMAT);

            var missingColumns = objProperties.Except(columnNames.Distinct()).ToList();
            if (missingColumns.Any())
            {
                var missingColumnStr = string.Join(", ", missingColumns);
                errorMessages.Add(string.Format(HelperNotifyMessage.VALIDATE_EXCEL_MISSING_COLUMNS, missingColumnStr));
            }


            var redundantColumns = columnNames.Distinct().Except(objProperties).ToList();
            if (redundantColumns.Any())
            {
                var redundantColumnStr = string.Join(", ", redundantColumns);
                errorMessages.Add(string.Format(HelperNotifyMessage.VALIDATE_EXCEL_REDUNDANT_COLUMNS, redundantColumnStr));
            }

            return errorMessages;
        }

        private static List<string> ValidateExcelData<T>(DataTable table)
        {
            var errorMessages = new List<string>();
            var rowCount = 1;
            var temp = typeof(T);
            var obj = Activator.CreateInstance<T>();

            foreach (DataRow dr in table.Rows)
            {
                foreach (DataColumn column in dr.Table.Columns)
                {
                    try
                    {
                        var pro = temp.GetProperties().FirstOrDefault(f => f.Name.ToLower() == column.ColumnName.ToLower());

                        var isRequired = IsRequiredObject(pro, "Required");
                        if (isRequired && dr[column.ColumnName] == DBNull.Value)
                        {
                            errorMessages.Add(string.Format(HelperNotifyMessage.VALIDATE_EXCEL_REQUIRED_DATA, column.ColumnName, rowCount));
                            continue;
                        }

                        if (Nullable.GetUnderlyingType(pro.PropertyType) != null)
                        {
                            if (dr[column.ColumnName] == DBNull.Value)
                            {
                                pro.SetValue(obj, null);
                            }
                        }
                        else
                        {
                            pro.SetValue(obj, Convert.ChangeType(dr[column.ColumnName], Type.GetType(pro.PropertyType.ToString())));
                        }


                    }
                    catch
                    {
                        errorMessages.Add(string.Format(HelperNotifyMessage.VALIDATE_EXCEL_INVALID_DATA, column.ColumnName, rowCount));
                    }
                }

                rowCount++;
            }

            return errorMessages;
        }

        public static bool IsRequiredObject(PropertyInfo prop, string attributeName)
        {
            object[] attrs = prop.GetCustomAttributes(false);

            foreach (object attr in attrs)
            {
                if (attr.GetType().Name == attributeName + "Attribute")
                {
                    return true;
                }
            }

            return false;
        }

        public static string CheckExcelRowItem<T>(DataRow dr)
        {
            var temp = typeof(T);
            var obj = Activator.CreateInstance<T>();

            foreach (DataColumn column in dr.Table.Columns)
            {
                try
                {
                    var pro = temp.GetProperties().FirstOrDefault(f => f.Name.ToLower() == column.ColumnName.ToLower());

                    if (pro != null)
                    {
                        var isRequired = IsRequiredObject(pro, "Required");
                        if (isRequired && dr[column.ColumnName] == DBNull.Value)
                        {
                            return string.Format(HelperNotifyMessage.VALIDATE_EXCEL_REQUIRED_DATA_MES, column.ColumnName);
                        }

                        if (Nullable.GetUnderlyingType(pro.PropertyType) != null)
                        {
                            if (dr[column.ColumnName] == DBNull.Value)
                            {
                                pro.SetValue(obj, null);
                            }
                            else
                            {
                                pro.SetValue(obj,
                                    Convert.ChangeType(dr[column.ColumnName],
                                        Type.GetType(Nullable.GetUnderlyingType(pro.PropertyType).ToString())));
                            }

                            continue;
                        }

                        pro.SetValue(obj,
                            Convert.ChangeType(dr[column.ColumnName], Type.GetType(pro.PropertyType.ToString())));

                    }
                    else
                    {
                        return string.Format(HelperNotifyMessage.WARNING_DOES_NOT_EXIST, column.ColumnName);
                    }
                }
                catch
                {
                    return string.Format(HelperNotifyMessage.WARNING_CONTAINS_INVALID_DATA, column.ColumnName);
                }
            }
            return null;
        }

        public static bool IsNumber(string inputValue)
        {
            return Regex.IsMatch(inputValue, @"^\d+$");
        }

        public static bool IsValidDate(string inputValue, string format)
        {
            try
            {
                var date = DateTime.ParseExact(inputValue.ToString(), format, CultureInfo.CurrentCulture);

                return true;
            }
            catch
            {
                return false;
            }
        }

        public static void UploadFileToFtp(string host, string port, string username, string password, string workingDirectory, string sourceFilePath)
        {
            try
            {
                var fileName = Path.GetFileName(sourceFilePath);
                var request = (FtpWebRequest)WebRequest.Create(new Uri(string.Format("ftp://{0}:{1}/{2}/{3}",host, port, workingDirectory, fileName)));

                request.Method = WebRequestMethods.Ftp.UploadFile;
                request.Credentials = new NetworkCredential(username, password);
                request.UsePassive = true;
                request.UseBinary = true;
                request.KeepAlive = false;

                using (var fs = System.IO.File.OpenRead(sourceFilePath))
                {
                    byte[] buffer = new byte[fs.Length];
                    fs.Read(buffer, 0, buffer.Length);
                    fs.Close();
                    Stream requestStream = request.GetRequestStream();
                    requestStream.Write(buffer, 0, buffer.Length);
                    requestStream.Flush();
                    requestStream.Close();
                }

                var response = (FtpWebResponse)request.GetResponse();
                response.Close();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static T GetConfig<T>(string key, T defaultValue = default(T))
        {
            if (ConfigurationManager.AppSettings[key] != null)
            {
                if (typeof(T).IsEnum)
                {
                    return (T)Enum.Parse(typeof(T), ConfigurationManager.AppSettings[key], true);
                }

                return (T)Convert.ChangeType(ConfigurationManager.AppSettings[key], typeof(T));
            }

            return defaultValue;
        }

        public static string RemoveXmlReservedCharacters(string xmlContent)
        {
            if (!string.IsNullOrEmpty(xmlContent))
            {
                return xmlContent
                    .Replace("&", "&amp;")
                    .Replace("%", "&#37;")
                    .Replace("<", "&lt;")
                    .Replace(">", "&gt;")
                    .Replace("'", "&apos;")
                    .Replace("\"", "&quot;");
            }

            return xmlContent;

        }
    }

}
