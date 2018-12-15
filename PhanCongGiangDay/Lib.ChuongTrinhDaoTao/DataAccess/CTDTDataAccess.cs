using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Lib.Setting;
using Lib.Setting.Model;
using System.Data.SqlClient;
using Lib.CTDT.IDataAccess;
using Lib.CTDT.Model;

namespace Lib.CTDT.DataAccess
{
    public class CTDTDataAccess: ICTDTDataAccess
    {
        public IEnumerable<CTDTModel> DanhSachCTDT()
        {
            List<CTDTModel> list = new List<CTDTModel>();
            try
            {
                list = DBUtils.ExecuteSPList<CTDTModel>("SP_ChuongTrinhDaoTao_DanhSach", null);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return list;
        }
        public IEnumerable<CTDTModel> DanhSachCTDTTheoHocPhan(int HocPhanID)
        {
            List<CTDTModel> list = new List<CTDTModel>();
            try
            {
                List<SqlParameter> listParameter = new List<SqlParameter>();
                listParameter.Add(new SqlParameter("@HocPhanID", HocPhanID));
                list = DBUtils.ExecuteSPList<CTDTModel>("SP_ChuongTrinhDaoTao_DanhSach_Theo_HocPhan", listParameter);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return list;
        }
        public CTDTModel ChiTietCTDT(int CTDTID)
        {
            CTDTModel model = null;
            try
            {
                List<SqlParameter> listParameter = new List<SqlParameter>();
                listParameter.Add(new SqlParameter("@CTDTID", CTDTID));
                model = DBUtils.ExecuteSP<CTDTModel>("SP_ChuongTrinhDaoTao_ChiTiet", listParameter);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return model;
        }
        public ResponseResult ThemCTDT(CTDTModel model)
        {
            ResponseResult res = null;
            try
            {
                List<SqlParameter> listParameter = new List<SqlParameter>();
                listParameter.Add(new SqlParameter("@MaCTDT", model.MaCTDT));
                listParameter.Add(new SqlParameter("@TenCTDT", model.TenCTDT));
                listParameter.Add(new SqlParameter("@NamBatDau", model.NamBatDau));
                listParameter.Add(new SqlParameter("@NamKetThuc", model.NamKetThuc));
                listParameter.Add(new SqlParameter("@NguoiTao", model.NguoiTao));
                res = DBUtils.ExecuteSP<ResponseResult>("SP_ChuongTrinhDaoTao_Them", listParameter);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return res;
        }
        public ResponseResult SuaCTDT(CTDTModel model)
        {
            ResponseResult res = null;
            try
            {
                List<SqlParameter> listParameter = new List<SqlParameter>();
                listParameter.Add(new SqlParameter("@CTDTID", model.CTDTID));
                listParameter.Add(new SqlParameter("@MaCTDT", model.MaCTDT));
                listParameter.Add(new SqlParameter("@TenCTDT", model.TenCTDT));
                listParameter.Add(new SqlParameter("@NamBatDau", model.NamBatDau));
                listParameter.Add(new SqlParameter("@NamKetThuc", model.NamKetThuc));
                listParameter.Add(new SqlParameter("@NguoiTao", model.NguoiTao));
                res = DBUtils.ExecuteSP<ResponseResult>("SP_ChuongTrinhDaoTao_Sua", listParameter);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return res;
        }
        public ResponseResult XoaCTDT(int CTDTID, string NguoiTao)
        {
            ResponseResult res = null;
            try
            {
                List<SqlParameter> listParameter = new List<SqlParameter>();
                listParameter.Add(new SqlParameter("@CTDTID", CTDTID));
                listParameter.Add(new SqlParameter("@NguoiTao", NguoiTao));
                res = DBUtils.ExecuteSP<ResponseResult>("SP_ChuongTrinhDaoTao_Xoa", listParameter);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return res;
        }
    }
}
