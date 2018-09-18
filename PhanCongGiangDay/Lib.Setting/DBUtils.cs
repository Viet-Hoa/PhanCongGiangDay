using System;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using System.Linq;
using System.Collections.Generic;
using System.Reflection;

namespace Lib.Setting
{
    public class DBUtils
    {
        public static string LibConnectionString(bool isEncrypted = true)
        {
            string _connectionString = string.Empty;
            _connectionString = ConfigurationManager.ConnectionStrings["freeaspconnection"].ConnectionString;

            //if (isEncrypted)
            //    _connectionString = Cryptography.DecryptBase64(_connectionString);

            return _connectionString;
        }

        public static DataSet ExecDataSetSP(string pSPName, List<SqlParameter> pParams)
        {
            DataSet ds = new DataSet();
            try
            {
                SqlConnection conn = new SqlConnection(LibConnectionString());
                
                SqlCommand cmd = new SqlCommand(pSPName, conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandTimeout = 300; //seconds

                SqlDataAdapter da = new SqlDataAdapter();
                da.SelectCommand = cmd;

                //add parameters
                if (pParams != null)
                {
                    foreach (SqlParameter param in pParams)
                    {
                        cmd.Parameters.Add(param);
                    }
                }

                try
                {
                    if (cmd.Connection.State == ConnectionState.Open)
                    {
                        cmd.Connection.Close();
                    }
                    cmd.Connection.Open();
                    da.Fill(ds);
                }
                catch (Exception ex)
                {
                    throw ex;
                }
                finally
                {
                    if (cmd.Connection.State == ConnectionState.Open)
                    {
                        cmd.Connection.Close();
                    }
                    cmd.Dispose();
                    da.Dispose();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return ds;
        }

        public static object ExecNonQuerySP(string pSPName, List<SqlParameter> pParams)
        {
            object result = 0;
            try
            {
                SqlConnection conn = new SqlConnection(LibConnectionString());
                SqlCommand cmd = new SqlCommand(pSPName, conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandTimeout = 300; //seconds

                //add parameters
                SqlParameter returnParam = new SqlParameter();
                if (pParams != null)
                {
                    foreach (SqlParameter param in pParams)
                    {
                        cmd.Parameters.Add(param);

                        if (param.Direction == ParameterDirection.ReturnValue)
                        {
                            returnParam = param;
                        }
                    }
                }

                try
                {
                    if (cmd.Connection.State == ConnectionState.Open)
                    {
                        cmd.Connection.Close();
                    }
                    cmd.Connection.Open();
                    cmd.ExecuteNonQuery();

                    result = returnParam.Value == null ? -1000 : returnParam.Value;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
                finally
                {
                    if (cmd.Connection.State == ConnectionState.Open)
                    {
                        cmd.Connection.Close();
                    }
                    cmd.Dispose();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return result;
        }

        public static List<object> ExecOutputSP(string pSPName, List<SqlParameter> pParams)
        {
            List<object> result = new List<object>();
            try
            {
                SqlConnection conn = new SqlConnection(LibConnectionString());
                SqlCommand cmd = new SqlCommand(pSPName, conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandTimeout = 300; //seconds

                //add parameters
                SqlParameter returnParam = new SqlParameter();
                if (pParams != null)
                {
                    foreach (SqlParameter param in pParams)
                    {
                        cmd.Parameters.Add(param);
                    }
                }

                try
                {
                    if (cmd.Connection.State == ConnectionState.Open)
                    {
                        cmd.Connection.Close();
                    }
                    cmd.Connection.Open();
                    cmd.ExecuteNonQuery();

                    foreach (SqlParameter param in pParams)
                    {
                        if (param.Direction == ParameterDirection.Output)
                        {
                            result.Add(param.Value);
                        }
                    }
                }
                catch (Exception ex)
                {
                    throw ex;
                }
                finally
                {
                    if (cmd.Connection.State == ConnectionState.Open)
                    {
                        cmd.Connection.Close();
                    }
                    cmd.Dispose();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return result;
        }

        public static T ExecuteSP<T>(string pSPName, List<SqlParameter> pParameters) where T : new()
        {
            try
            {
                DataTable datatable;
                DataSet ds = ExecDataSetSP(pSPName, pParameters);
                if (ds.Tables.Count > 0)
                    datatable = ds.Tables[0];
                else
                    datatable = new DataTable();

                T Temp = new T();
                try
                {
                    List<string> columnsNames = new List<string>();
                    foreach (DataColumn DataColumn in datatable.Columns)
                        columnsNames.Add(DataColumn.ColumnName);
                    Temp = datatable.AsEnumerable().ToList().ConvertAll<T>(row => getObjectMSSql<T>(row, columnsNames)).FirstOrDefault();
                    return Temp;
                }
                catch
                {
                    return Temp;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static List<T> ExecuteSPList<T>(string pSPName, List<SqlParameter> pParameters) where T : new()
        {
            try
            {
                DataTable datatable;
                DataSet ds = ExecDataSetSP(pSPName, pParameters);
                if (ds.Tables.Count > 0)
                    datatable = ds.Tables[0];
                else
                    datatable = new DataTable();

                List<T> Temp = new List<T>();
                try
                {
                    List<string> columnsNames = new List<string>();
                    foreach (DataColumn DataColumn in datatable.Columns)
                        columnsNames.Add(DataColumn.ColumnName);
                    Temp = datatable.AsEnumerable().ToList().ConvertAll<T>(row => getObjectMSSql<T>(row, columnsNames));
                    return Temp;
                }
                catch
                {
                    return Temp;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static List<T> ConvertTo<T>(DataTable datatable) where T : new()
        {
            List<T> Temp = new List<T>();
            try
            {
                List<string> columnsNames = new List<string>();
                foreach (DataColumn DataColumn in datatable.Columns)
                    columnsNames.Add(DataColumn.ColumnName);
                Temp = datatable.AsEnumerable().ToList().ConvertAll<T>(row => getObjectMSSql<T>(row, columnsNames));
                return Temp;
            }
            catch
            {
                return Temp;
            }
        }
        protected static T getObjectMSSql<T>(DataRow row, List<string> columnsName) where T : new()
        {
            T obj = new T();
            try
            {
                string columnname = "";
                string value = "";
                PropertyInfo[] Properties;
                Properties = typeof(T).GetProperties();
                foreach (PropertyInfo objProperty in Properties)
                {
                    columnname = columnsName.Find(name => name.ToLower() == objProperty.Name.ToLower());
                    if (!string.IsNullOrEmpty(columnname))
                    {
                        if (objProperty.PropertyType.Name == "Guid")
                        {
                            value = new Guid(row[columnname].ToString()).ToString();
                        }
                        else
                        {
                            value = row[columnname].ToString();
                        }
                        if (!string.IsNullOrEmpty(value))
                        {
                            if (Nullable.GetUnderlyingType(objProperty.PropertyType) != null)
                            {
                                if (objProperty.PropertyType.Name == "Guid")
                                {
                                    value = new Guid(row[columnname].ToString()).ToString().Replace("$", "").Replace(",", "");
                                    objProperty.SetValue(obj, new Guid(row[columnname].ToString()), null);
                                }
                                else
                                {
                                    value = row[columnname].ToString().Replace("$", "").Replace(",", "");
                                    objProperty.SetValue(obj, Convert.ChangeType(value, Type.GetType(Nullable.GetUnderlyingType(objProperty.PropertyType).ToString())), null);
                                }
                            }
                            else
                            {
                                if (objProperty.PropertyType.Name == "Guid")
                                {
                                    value = new Guid(row[columnname].ToString()).ToString().Replace("%", "");
                                    objProperty.SetValue(obj, new Guid(row[columnname].ToString()), null);
                                }
                                else
                                {
                                    value = row[columnname].ToString().Replace("%", "");
                                    objProperty.SetValue(obj, Convert.ChangeType(value, Type.GetType(objProperty.PropertyType.ToString())), null);
                                }
                            }
                        }
                    }
                }
                return obj;
            }
            catch
            {
                return obj;
            }
        }

        protected static T getObjectOra<T>(DataRow row, List<string> columnsName) where T : new()
        {
            T obj = new T();
            try
            {
                string columnname = "";
                string value = "";
                PropertyInfo[] Properties;
                Properties = typeof(T).GetProperties();
                foreach (PropertyInfo objProperty in Properties)
                {
                    columnname = columnsName.Find(name => name.ToLower() == objProperty.Name.ToLower());
                    if (!string.IsNullOrEmpty(columnname))
                    {
                        if (objProperty.PropertyType.Name == "Guid")
                        {
                            value = new Guid((byte[])row[columnname]).ToString();
                        }
                        else
                        {
                            value = row[columnname].ToString();
                        }
                        if (!string.IsNullOrEmpty(value))
                        {
                            if (Nullable.GetUnderlyingType(objProperty.PropertyType) != null)
                            {
                                if (objProperty.PropertyType.Name == "Guid")
                                {
                                    value = new Guid((byte[])row[columnname]).ToString().Replace("$", "").Replace(",", "");
                                    objProperty.SetValue(obj, new Guid((byte[])row[columnname]), null);
                                }
                                else
                                {
                                    value = row[columnname].ToString().Replace("$", "").Replace(",", "");
                                    objProperty.SetValue(obj, Convert.ChangeType(value, Type.GetType(Nullable.GetUnderlyingType(objProperty.PropertyType).ToString())), null);
                                }
                            }
                            else
                            {
                                if (objProperty.PropertyType.Name == "Guid")
                                {
                                    value = new Guid((byte[])row[columnname]).ToString().Replace("%", "");
                                    objProperty.SetValue(obj, new Guid((byte[])row[columnname]), null);
                                }
                                else
                                {
                                    value = row[columnname].ToString().Replace("%", "");
                                    objProperty.SetValue(obj, Convert.ChangeType(value, Type.GetType(objProperty.PropertyType.ToString())), null);
                                }
                            }
                        }
                    }
                }
                return obj;
            }
            catch
            {
                return obj;
            }
        }

    }
}
