using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using PhanCongGiangDay.IServices;
using Lib.Setting.Model;
using Lib.XuatExcel.DataAccess;
using Lib.XuatExcel.IDataAccess;
using Lib.XuatExcel.Model;
using ClosedXML.Excel;
using System.IO;

namespace PhanCongGiangDay.Services
{
    public class XuatExcelService: IXuatExcelService
    {
        private IXuatExcelDataAccess _XuatExcelDA;
        private IXuatExcelDataAccess XuatExcelDA
        {
            get { return _XuatExcelDA ?? (_XuatExcelDA = new XuatExcelDataAccess()); }
        }
        private INamHocService _NamHocService;
        private INamHocService NamHocService => _NamHocService ?? (_NamHocService = new NamHocService());

        public Stream XuatExcelMau04(int BangPhanCongID)
        {
            try
            {
                var data = XuatExcelDA.XuatExcelMau04(BangPhanCongID);
                var template = HttpContext.Current.Server.MapPath("~/Templates/Mau04.xlsx");
                using (var msTemplate = new MemoryStream(File.ReadAllBytes(template)))
                {
                    var workbook = new XLWorkbook(msTemplate);
                    var worksheet = workbook.Worksheets.FirstOrDefault();
                    worksheet.Cell("G3").Value = "Thành phố Hồ Chí Minh, ngày " + DateTime.Now.Day + " tháng " + DateTime.Now.Month + " năm " + DateTime.Now.Year;
                    worksheet.Cell("A7").Value = "NĂM HỌC " + NamHocService.ChiTietNamHoc(BangPhanCongID).NamHoc;
                    var range = worksheet.Cell(13, 1).InsertData(data);
                    range.Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
                    range.Style.Alignment.SetVertical(XLAlignmentVerticalValues.Top);
                    range.Cells().Style.Border.OutsideBorder = XLBorderStyleValues.Thin;
                    range.Style.Font.FontName = "Times New Roman";
                    range.Style.Font.FontSize = 12;
                    range.Style.Font.Bold = false;
                    range.Style.Font.Italic = false;
                    range.Style.Font.Underline = XLFontUnderlineValues.None;
                    range.Style.Alignment.SetWrapText();
                    int count = range.RowCount();
                    for (int i = 13; i < count + 13; i++)
                    {
                        int first = i, last = i;
                        if (worksheet.Cell(i + 1, 1).Value.ToString() == worksheet.Cell(i, 1).Value.ToString())
                            last++;
                        else if (first!=last)
                        {
                            worksheet.Range("A" + first, "A" + last).Merge();
                            first = i + 1;
                            last = i + 1;
                        }
                    }
                    for(int i=13;i<range.RowCount()+13;i++)
                    {
                        worksheet.Cell("B" + i).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Left);
                        worksheet.Cell("F" + i).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Left);
                        worksheet.Row(i).AdjustToContents();
                    }
                    int kyten = range.RowCount() + 15;
                    worksheet.Range("A" + kyten, "R" + kyten).Merge();
                    worksheet.Cell("A" + kyten).Value = "Duyệt của Ban Giám Hiệu                          Trưởng P. Kế hoạch - TC                    Trưởng P. Tổ chức - CB                  Trưởng khoa/Ngành/ Bộ môn TT";
                    worksheet.Cell("A" + kyten).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
                    worksheet.Cell("A" + kyten).Style.Font.Bold = true;
                    var ms = new MemoryStream();
                    workbook.SaveAs(ms);
                    ms.Position = 0;
                    return ms;
                }
            }
            catch (Exception ex)
            {
                return null;
            }
        }

    }
}