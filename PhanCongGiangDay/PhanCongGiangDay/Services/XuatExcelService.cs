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
                var data = XuatExcelDA.XuatExcelMau04(BangPhanCongID).ToList();
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
                    int count = range.RowCount(), first = 13, last = 13, STT = 1;
                    for (int i = 13; i < count + 13; i++)
                    {                        
                        if (worksheet.Cell(i + 1, 2).Value.ToString() == worksheet.Cell(i, 2).Value.ToString())
                            last++;
                        else if (first!=last)
                        {
                            worksheet.Range("A" + first + 1, "A" + last).Clear();
                            worksheet.Cell("A" + first).Value = STT;
                            worksheet.Range("A" + first, "A" + last).Merge();

                            worksheet.Range("B" + first + 1, "B" + last).Clear();
                            worksheet.Range("B" + first, "B" + last).Merge();

                            worksheet.Range("C" + first + 1, "C" + last).Clear();
                            worksheet.Range("C" + first, "C" + last).Merge();

                            worksheet.Range("D" + first + 1, "D" + last).Clear();
                            worksheet.Range("D" + first, "D" + last).Merge();

                            worksheet.Range("E" + first + 1, "E" + last).Clear();
                            worksheet.Range("E" + first, "E" + last).Merge();
                            first = i + 1;
                            last = i + 1;
                            STT++;
                        }
                        else
                        {
                            last = i+1;
                            first = i+1;
                            STT++;
                        }
                    }
                    for(int i=13;i<range.RowCount()+13;i++)
                    {
                        worksheet.Cell("B" + i).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Left);
                        worksheet.Cell("B" + i).Style.Alignment.SetVertical(XLAlignmentVerticalValues.Center);
                        worksheet.Cell("C" + i).Style.Alignment.SetVertical(XLAlignmentVerticalValues.Center);
                        worksheet.Cell("D" + i).Style.Alignment.SetVertical(XLAlignmentVerticalValues.Center);
                        worksheet.Cell("E" + i).Style.Alignment.SetVertical(XLAlignmentVerticalValues.Center);
                        worksheet.Cell("F" + i).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Left);
                        worksheet.Row(i).AdjustToContents();
                    }
                    int kyten = range.RowCount() + 15;
                    worksheet.Range("A" + kyten, "R" + kyten).Merge();
                    worksheet.Cell("A" + kyten).Value = "Duyệt của Ban Giám Hiệu                          Trưởng P. Kế hoạch - TC                    Trưởng P. Tổ chức - CB                  Trưởng khoa/Ngành/ Bộ môn TT";
                    worksheet.Cell("A" + kyten).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
                    worksheet.Cell("A" + kyten).Style.Font.Bold = true;
                    worksheet.PageSetup.PrintAreas.Add("A1:R" + kyten);
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

        public Stream XuatExcelMau03(int BangPhanCongID)
        {
            try
            {
                var data = XuatExcelDA.XuatExcelMau03(BangPhanCongID).ToList();
                var template = HttpContext.Current.Server.MapPath("~/Templates/Mau03.xlsx");
                using (var msTemplate = new MemoryStream(File.ReadAllBytes(template)))
                {
                    var workbook = new XLWorkbook(msTemplate);
                    var worksheet = workbook.Worksheets.FirstOrDefault();
                    worksheet.Cell("N4").Value = "Thành phố Hồ Chí Minh, ngày " + DateTime.Now.Day + " tháng " + DateTime.Now.Month + " năm " + DateTime.Now.Year;
                    worksheet.Cell("A8").Value = "NĂM HỌC " + NamHocService.ChiTietNamHoc(BangPhanCongID).NamHoc;
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
                    int count = range.RowCount(), first = 13, last = 13, STT = 1;
                    for (int i = 13; i < count + 13; i++)
                    {
                        if (worksheet.Cell("R"+(i+1)).Value.ToString() == worksheet.Cell("R"+i).Value.ToString())
                            last++;
                        else if (first != last)
                        {
                            worksheet.Range("R" + first + 1, "R" + last).Clear();
                            worksheet.Range("R" + first, "R" + last).Merge();
                            first = i + 1;
                            last = i + 1;
                        }
                        else
                        {
                            last = i + 1;
                            first = i + 1;
                        }
                    }
                    first = 13;
                    last = 13;
                    for (int i = 13; i < count + 13; i++)
                    {
                        if (worksheet.Cell("P" + (i + 1)).Value.ToString() == worksheet.Cell("P" + i).Value.ToString())
                            last++;
                        else if (first != last)
                        {
                            worksheet.Range("P" + first + 1, "P" + last).Clear();
                            worksheet.Range("P" + first, "P" + last).Merge();
                            worksheet.Range("Q" + first + 1, "Q" + last).Clear();
                            worksheet.Range("Q" + first, "Q" + last).Merge();
                            first = i + 1;
                            last = i + 1;
                        }
                        else
                        {
                            last = i + 1;
                            first = i + 1;
                        }
                    }
                    first = 13;
                    last = 13;
                    for (int i = 13; i < count + 13; i++)
                    {
                        if (worksheet.Cell("B" + (i + 1)).Value.ToString() == worksheet.Cell("B" + i).Value.ToString())
                            last++;
                        else if (first != last)
                        {
                            worksheet.Range("A" + first + 1, "A" + last).Clear();
                            worksheet.Cell("A" + first).Value = STT;
                            worksheet.Range("A" + first, "A" + last).Merge();
                            worksheet.Range("B" + first + 1, "B" + last).Clear();
                            worksheet.Range("B" + first, "B" + last).Merge();
                            worksheet.Range("C" + first + 1, "C" + last).Clear();
                            worksheet.Range("C" + first, "C" + last).Merge();
                            worksheet.Range("D" + first + 1, "D" + last).Clear();
                            worksheet.Range("D" + first, "D" + last).Merge();
                            worksheet.Range("E" + first + 1, "E" + last).Clear();
                            worksheet.Range("E" + first, "E" + last).Merge();
                            worksheet.Range("F" + first + 1, "F" + last).Clear();
                            worksheet.Range("F" + first, "F" + last).Merge();
                            worksheet.Range("G" + first + 1, "G" + last).Clear();
                            worksheet.Range("G" + first, "G" + last).Merge();
                            first = i + 1;
                            last = i + 1;
                            STT++;
                        }
                        else
                        {
                            last = i + 1;
                            first = i + 1;
                            STT++;
                        }
                    }
                    for (int i = 13; i < range.RowCount() + 13; i++)
                    {
                        worksheet.Cell("B" + i).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Left);
                        worksheet.Cell("B" + i).Style.Alignment.SetVertical(XLAlignmentVerticalValues.Center);
                        worksheet.Cell("C" + i).Style.Alignment.SetVertical(XLAlignmentVerticalValues.Center);
                        worksheet.Cell("D" + i).Style.Alignment.SetVertical(XLAlignmentVerticalValues.Center);
                        worksheet.Cell("E" + i).Style.Alignment.SetVertical(XLAlignmentVerticalValues.Center);
                        worksheet.Cell("F" + i).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Left);
                        worksheet.Row(i).AdjustToContents();
                    }
                    int kyten = range.RowCount() + 15;
                    worksheet.Range("A" + kyten, "R" + kyten).Merge();
                    worksheet.Cell("A" + kyten).Value = "Duyệt của Ban Giám Hiệu                          Trưởng P. Kế hoạch - TC                    Trưởng P. Tổ chức - CB                  Trưởng khoa/Ngành/ Bộ môn TT";
                    worksheet.Cell("A" + kyten).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
                    worksheet.Cell("A" + kyten).Style.Font.Bold = true;
                    worksheet.PageSetup.PrintAreas.Add("A1:R" + kyten);
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