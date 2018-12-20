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
using PhanCongGiangDay.Models.ViewModel.XuatExcel;
using System.Text.RegularExpressions;
using System.Text;
using System.IO.Compression;

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
        private IBoMonService _BoMonService;
        private IBoMonService BoMonService => _BoMonService ?? (_BoMonService = new BoMonService());

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
                            worksheet.Cell("A" + first).Value = STT;
                            last = i+1;
                            first = i+1;
                            STT++;
                        }
                    }
                    for(int i=13;i<range.RowCount()+13;i++)
                    {
                        worksheet.Cell("A" + i).Style.Alignment.SetVertical(XLAlignmentVerticalValues.Center);
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
                    worksheet.Cell("A" + kyten).Style.Font.FontName = "Times New Roman";
                    worksheet.Cell("A" + kyten).Style.Font.FontSize = 12;
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
                        if (worksheet.Cell("O" + (i + 1)).Value.ToString() == worksheet.Cell("O" + i).Value.ToString())
                            last++;
                        else if (first != last)
                        {
                            worksheet.Range("O" + first + 1, "O" + last).Clear();
                            worksheet.Range("O" + first, "O" + last).Merge();
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
                            worksheet.Cell("A" + first).Value = STT;
                            last = i + 1;
                            first = i + 1;
                            STT++;
                        }
                    }
                    for (int i = 13; i < range.RowCount() + 13; i++)
                    {
                        worksheet.Row(i).Style.Alignment.SetVertical(XLAlignmentVerticalValues.Center);
                    }
                    int kyten = range.RowCount() + 15;
                    worksheet.Range("A" + kyten, "R" + kyten).Merge();
                    worksheet.Cell("A" + kyten).Value = "Duyệt của Ban Giám Hiệu                          Trưởng P. Kế hoạch - TC                    Trưởng P. Tổ chức - CB                  Trưởng khoa/Ngành/ Bộ môn TT";
                    worksheet.Cell("A" + kyten).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
                    worksheet.Cell("A" + kyten).Style.Font.Bold = true;
                    worksheet.Cell("A" + kyten).Style.Font.FontName = "Times New Roman";
                    worksheet.Cell("A" + kyten).Style.Font.FontSize = 12;
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

        public Stream XuatExcelMau02(int BangPhanCongID)
        {
            try
            {
                var data = XuatExcelDA.XuatExcelMau02(BangPhanCongID).ToList();
                var template = HttpContext.Current.Server.MapPath("~/Templates/Mau02.xlsx");
                using (var msTemplate = new MemoryStream(File.ReadAllBytes(template)))
                {
                    var workbook = new XLWorkbook(msTemplate);
                    var worksheet = workbook.Worksheets.FirstOrDefault();
                    worksheet.Cell("L5").Value = "Thành phố Hồ Chí Minh, ngày " + DateTime.Now.Day + " tháng " + DateTime.Now.Month + " năm " + DateTime.Now.Year;
                    worksheet.Cell("A8").Value = "NĂM HỌC " + NamHocService.ChiTietNamHoc(BangPhanCongID).NamHoc;
                    var range = worksheet.Cell(15, 1).InsertData(data);
                    range.Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
                    range.Style.Alignment.SetVertical(XLAlignmentVerticalValues.Center);
                    range.Cells().Style.Border.OutsideBorder = XLBorderStyleValues.Thin;
                    range.Style.Font.FontName = "Times New Roman";
                    range.Style.Font.FontSize = 12;
                    range.Style.Font.Bold = false;
                    range.Style.Font.Italic = false;
                    range.Style.Font.Underline = XLFontUnderlineValues.None;
                    range.Style.Alignment.SetWrapText();
                    int count = range.RowCount(), first = 15, last = 15, STT = 1, i = 15;
                    while (i < count+15)
                    {
                        worksheet.Cell("C" + i).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Left);
                        worksheet.Cell("F" + i).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Left);

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
                            worksheet.Range("T" + first + 1, "T" + last).Clear();
                            worksheet.Range("T" + first, "T" + last).Merge();
                            worksheet.Range("U" + first + 1, "U" + last).Clear();
                            worksheet.Range("U" + first, "U" + last).Merge();
                            worksheet.Range("V" + first + 1, "V" + last).Clear();
                            worksheet.Range("V" + first, "V" + last).Merge();
                            worksheet.Range("S" + first + 1, "S" + last).Clear();
                            worksheet.Range("S" + first, "S" + last).Merge();
                            worksheet.Range("W" + first + 1, "W" + last).Clear();
                            worksheet.Range("W" + first, "W" + last).Merge();
                            worksheet.Cell("W"+first).Style.Font.Bold = true;
                            worksheet.Row(i).InsertRowsBelow(1);
                            i++;

                            worksheet.Range("S" + first, "S" + i).Merge();
                            worksheet.Range("W" + first, "W" + i).Merge();
                            worksheet.Range("A" + i + ":Q" + i).Merge();
                            worksheet.Cell("A" + i).Value = "Tổng cộng";
                            worksheet.Cell("A" + i).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
                            worksheet.Cell("A" + i).Style.Font.Bold = true;
                            worksheet.Cell("A" + i).Style.Font.FontName = "Times New Roman";
                            worksheet.Cell("A" + i).Style.Font.FontSize = 12;
                            worksheet.Cell("R" + i).FormulaA1 = "=SUM(R" + first + ":R" + last + ")";
                            worksheet.Cell("R" + i).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
                            worksheet.Cell("R" + i).Style.Font.Bold = true;
                            worksheet.Cell("R" + i).Style.Font.FontName = "Times New Roman";
                            worksheet.Cell("R" + i).Style.Font.FontSize = 12;

                            count++;



                            first = i + 1;
                            last = i + 1;
                            STT++;
                            
                        }
                        else
                        {
                            worksheet.Cell("A" + first).Value = STT;
                            worksheet.Cell("W" + first).Style.Font.Bold = true;

                            last = i + 1;
                            first = i + 1;
                            STT++;
                        }
                        i++;
                    }
                    
                    int kyten = count + 17;
                    worksheet.Range("A" + kyten, "W" + kyten).Merge();
                    worksheet.Cell("A" + kyten).Value = "Duyệt của Ban Giám Hiệu                                                                 Trưởng Phòng TCCB                                                                        Trưởng Khoa/Ngành/BMTT";
                    worksheet.Cell("A" + kyten).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
                    worksheet.Cell("A" + kyten).Style.Font.Bold = true;
                    worksheet.Cell("A" + kyten).Style.Font.FontName = "Times New Roman";
                    worksheet.Cell("A" + kyten).Style.Font.FontSize = 12;
                    worksheet.PageSetup.PrintAreas.Add("A1:W" + kyten);
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

        public Stream XuatExcelMau01(int BangPhanCongID, int HocKi)
        {
            try
            {
                var data = XuatExcelDA.XuatExcelMau01(BangPhanCongID,HocKi);
                var template = HttpContext.Current.Server.MapPath("~/Templates/Mau01.xlsx");
                using (var msTemplate = new MemoryStream(File.ReadAllBytes(template)))
                {
                    var workbook = new XLWorkbook(msTemplate);
                    var worksheet = workbook.Worksheets.FirstOrDefault();
                    worksheet.Cell("K4").Value = "Thành phố Hồ Chí Minh, ngày " + DateTime.Now.Day + " tháng " + DateTime.Now.Month + " năm " + DateTime.Now.Year;
                    worksheet.Cell("A7").Value ="Học kì: "+ HocKi+ " ,  Năm học " + NamHocService.ChiTietNamHoc(BangPhanCongID).NamHoc;
                    var range = worksheet.Cell(12, 1).InsertData(data);
                    range.Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
                    range.Style.Alignment.SetVertical(XLAlignmentVerticalValues.Center);
                    range.Cells().Style.Border.OutsideBorder = XLBorderStyleValues.Thin;
                    range.Style.Font.FontName = "Times New Roman";
                    range.Style.Font.FontSize = 12;
                    range.Style.Font.Bold = false;
                    range.Style.Font.Italic = false;
                    range.Style.Font.Underline = XLFontUnderlineValues.None;
                    range.Style.Alignment.SetWrapText();
                    int count = range.RowCount(), first = 12, last = 12, STT = 1;
                    
                    for (int i = 12; i < count + 12; i++)
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
                            worksheet.Range("H" + first + 1, "H" + last).Clear();
                            worksheet.Range("H" + first, "H" + last).Merge();
                            worksheet.Range("I" + first + 1, "I" + last).Clear();
                            worksheet.Range("I" + first, "I" + last).Merge();
                            worksheet.Range("J" + first + 1, "J" + last).Clear();
                            worksheet.Range("J" + first, "J" + last).Merge();
                            worksheet.Range("K" + first + 1, "K" + last).Clear();
                            worksheet.Range("K" + first, "K" + last).Merge();
                            worksheet.Range("L" + first + 1, "L" + last).Clear();
                            worksheet.Range("L" + first, "L" + last).Merge();
                            first = i + 1;
                            last = i + 1;
                            STT++;
                        }
                        else
                        {
                            worksheet.Cell("A" + first).Value = STT;
                            last = i + 1;
                            first = i + 1;
                            STT++;
                        }
                        worksheet.Row(i).AdjustToContents();
                    }
                    int kyten = range.RowCount() + 14;
                    worksheet.Cell("A" + kyten).Value = "Các học phần có yêu cầu đặc biệt về việc tổ chức đào tạo, được ghi vào phần ghi chú dưới đây.";
                    worksheet.Cell("A" + kyten).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Left);
                    worksheet.Cell("A" + kyten).Style.Font.Bold = false;
                    worksheet.Cell("A" + kyten).Style.Font.FontName = "Times New Roman";
                    worksheet.Cell("A" + kyten).Style.Font.FontSize = 12;
                    kyten++;
                    worksheet.Cell("A" + kyten).Value = "Ghi chú:";
                    worksheet.Cell("A" + kyten).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Left);
                    worksheet.Cell("A" + kyten).Style.Font.Bold = true;
                    worksheet.Cell("A" + kyten).Style.Font.FontName = "Times New Roman";
                    worksheet.Cell("A" + kyten).Style.Font.FontSize = 12;
                    kyten++;
                    worksheet.Cell("A" + kyten).Value = "Các học phần chung của ngành CNTT và KTPM mở lớp chung";
                    worksheet.Cell("A" + kyten).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Left);
                    worksheet.Cell("A" + kyten).Style.Font.Bold = false;
                    worksheet.Cell("A" + kyten).Style.Font.FontName = "Times New Roman";
                    worksheet.Cell("A" + kyten).Style.Font.FontSize = 12;
                    kyten++;
                    worksheet.Range("H" + kyten, "Q" + kyten).Merge();
                    worksheet.Cell("H" + kyten).Value = "TRƯỞNG KHOA/NGÀNH/BỘ MÔN TT";
                    worksheet.Cell("H" + kyten).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
                    worksheet.Cell("H" + kyten).Style.Font.Bold = true;
                    worksheet.Cell("H" + kyten).Style.Font.FontName = "Times New Roman";
                    worksheet.Cell("H" + kyten).Style.Font.FontSize = 12;
                    worksheet.PageSetup.PrintAreas.Add("A1:Q" + kyten);

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

        public Stream XuatExcelMauBoMon(int BangPhanCongID)
        {
            try
            {
                var dsbm = BoMonService.DanhSachBoMon();
                var template = HttpContext.Current.Server.MapPath("~/Templates/MauBM.xlsx");
                using (var msTemplate = new MemoryStream(File.ReadAllBytes(template)))
                {
                    var workbook = new XLWorkbook(msTemplate);
                    
                    foreach(var bomon in dsbm)
                    {
                        var worksheet = workbook.Worksheet(bomon.MaBoMon);
                        var data = XuatExcelDA.XuatExcelMauBoMon(BangPhanCongID, bomon.BoMonID);
                        worksheet.Cell("G3").Value = "Thành phố Hồ Chí Minh, ngày " + DateTime.Now.Day + " tháng " + DateTime.Now.Month + " năm " + DateTime.Now.Year;
                        worksheet.Cell("A8").Value = "NĂM HỌC " + NamHocService.ChiTietNamHoc(BangPhanCongID).NamHoc;
                        var range = worksheet.Cell(15, 1).InsertData(data);
                        range.Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
                        range.Style.Alignment.SetVertical(XLAlignmentVerticalValues.Center);
                        range.Cells().Style.Border.OutsideBorder = XLBorderStyleValues.Thin;
                        range.Style.Font.FontName = "Times New Roman";
                        range.Style.Font.FontSize = 12;
                        range.Style.Font.Bold = false;
                        range.Style.Font.Italic = false;
                        range.Style.Font.Underline = XLFontUnderlineValues.None;
                        range.Style.Alignment.SetWrapText();
                        int count = range.RowCount(), first = 15, last = 15, STT = 1, i = 15;
                        while (i < count + 15)
                        {
                            worksheet.Cell("C" + i).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Left);
                            worksheet.Cell("F" + i).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Left);

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
                                worksheet.Range("T" + first + 1, "T" + last).Clear();
                                worksheet.Range("T" + first, "T" + last).Merge();
                                worksheet.Range("U" + first + 1, "U" + last).Clear();
                                worksheet.Range("U" + first, "U" + last).Merge();
                                worksheet.Range("V" + first + 1, "V" + last).Clear();
                                worksheet.Range("V" + first, "V" + last).Merge();
                                worksheet.Range("S" + first + 1, "S" + last).Clear();
                                worksheet.Range("S" + first, "S" + last).Merge();
                                worksheet.Range("W" + first + 1, "W" + last).Clear();
                                worksheet.Range("W" + first, "W" + last).Merge();
                                worksheet.Cell("W" + first).Style.Font.Bold = true;
                                worksheet.Row(i).InsertRowsBelow(1);
                                i++;

                                worksheet.Range("S" + first, "S" + i).Merge();
                                worksheet.Range("W" + first, "W" + i).Merge();
                                worksheet.Range("A" + i + ":Q" + i).Merge();
                                worksheet.Cell("A" + i).Value = "Tổng cộng";
                                worksheet.Cell("A" + i).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
                                worksheet.Cell("A" + i).Style.Font.Bold = true;
                                worksheet.Cell("A" + i).Style.Font.FontName = "Times New Roman";
                                worksheet.Cell("A" + i).Style.Font.FontSize = 12;
                                worksheet.Cell("R" + i).FormulaA1 = "=SUM(R" + first + ":R" + last + ")";
                                worksheet.Cell("R" + i).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
                                worksheet.Cell("R" + i).Style.Font.Bold = true;
                                worksheet.Cell("R" + i).Style.Font.FontName = "Times New Roman";
                                worksheet.Cell("R" + i).Style.Font.FontSize = 12;

                                count++;



                                first = i + 1;
                                last = i + 1;
                                STT++;

                            }
                            else
                            {
                                worksheet.Cell("A" + first).Value = STT;
                                worksheet.Cell("W" + first).Style.Font.Bold = true;

                                last = i + 1;
                                first = i + 1;
                                STT++;
                            }
                            i++;
                        }

                        int kyten = count + 17;
                        worksheet.Range("A" + kyten, "W" + kyten).Merge();
                        worksheet.Cell("A" + kyten).Value = "Duyệt của Ban Giám Hiệu                                                                 Trưởng Phòng TCCB                                                                        Trưởng Khoa/Ngành/BMTT";
                        worksheet.Cell("A" + kyten).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
                        worksheet.Cell("A" + kyten).Style.Font.Bold = true;
                        worksheet.Cell("A" + kyten).Style.Font.FontName = "Times New Roman";
                        worksheet.Cell("A" + kyten).Style.Font.FontSize = 12;
                        worksheet.PageSetup.PrintAreas.Add("A1:W" + kyten);
                    }

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

        public Stream XuatExcelMauGiangVien(int BangPhanCongID, List<int> GiangVienID)
        {
            try
            {
                if (GiangVienID.Count == 1)
                {
                    var list = XuatExcelDA.XuatExcelMauGiangVien(BangPhanCongID, GiangVienID.First()).ToList();
                    var data = list.Select(x => new MauGVViewModel
                    {
                        STT = x.STT,
                        TenHocPhan = x.TenHocPhan,
                        MaHP = x.MaHP,
                        SoTC = x.SoTC,
                        SoTietLT = x.SoTietLT,
                        SoTietTH = x.SoTietTH,
                        HK1LT = x.HK1LT,
                        HK1TH = x.HK1TH,
                        HK2LT = x.HK2LT,
                        HK2TH = x.HK2TH,
                        SoTiet = x.SoTiet,
                        CongTacKhac = x.CongTacKhac,
                        TongCongGD = x.TongCongGD,
                        TongCongCT = x.TongCongCT,
                    });
                    var template = HttpContext.Current.Server.MapPath("~/Templates/MauGV.xlsx");
                    using (var msTemplate = new MemoryStream(File.ReadAllBytes(template)))
                    {
                        var workbook = new XLWorkbook(msTemplate);
                        var worksheet = workbook.Worksheets.FirstOrDefault();
                        worksheet.Cell("K4").Value = "Thành phố Hồ Chí Minh, ngày " + DateTime.Now.Day + " tháng " + DateTime.Now.Month + " năm " + DateTime.Now.Year;
                        worksheet.Cell("B8").Value = "NĂM HỌC " + NamHocService.ChiTietNamHoc(BangPhanCongID).NamHoc;
                        worksheet.Cell("B7").Value = list.First().Ho + " " + list.First().Ten;
                        worksheet.Cell("G10").Value = list.First().MaCB;
                        worksheet.Cell("G11").Value = list.First().ChucDanh;
                        worksheet.Cell("G12").Value = list.First().HocVi;
                        worksheet.Cell("G13").Value = list.First().ChucVu;
                        worksheet.Cell("G14").Value = list.First().TenBoMon;
                        var range = worksheet.Cell(19, 2).InsertData(data);
                        range.Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
                        range.Style.Alignment.SetVertical(XLAlignmentVerticalValues.Center);
                        range.Style.Font.FontName = "Times New Roman";
                        range.Style.Font.FontSize = 12;
                        range.Style.Font.Bold = false;
                        range.Style.Font.Italic = false;
                        range.Style.Font.Underline = XLFontUnderlineValues.None;
                        range.Style.Alignment.SetWrapText();
                        int count = range.RowCount();
                        for (int i = 19; i < count + 19; i++)
                        {
                            worksheet.Cell("C" + i).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Left);
                            worksheet.Cell("T" + i).Style.Font.Bold = true;
                        }
                        worksheet.Range("P20", "P" + (count + 19)).Clear();
                        worksheet.Range("P19", "P" + (count + 19)).Merge();
                        worksheet.Range("Q20", "Q" + (count + 19)).Clear();
                        worksheet.Range("Q19", "Q" + (count + 19)).Merge();
                        worksheet.Range("R20", "R" + (count + 19)).Clear();
                        worksheet.Range("R19", "R" + (count + 19)).Merge();
                        worksheet.Range("S20", "S" + (count + 19)).Clear();
                        worksheet.Range("S19", "S" + (count + 19)).Merge();
                        worksheet.Range("T20", "T" + (count + 19)).Clear();
                        worksheet.Range("T19", "T" + (count + 19)).Merge();
                        worksheet.Range("B" + (count + 19), "N" + (count + 19)).Merge();
                        worksheet.Cell("B" + (count + 19)).Value = "Tổng cộng";
                        worksheet.Cell("B" + (count + 19)).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
                        worksheet.Cell("B" + (count + 19)).Style.Font.Bold = true;
                        worksheet.Cell("B" + (count + 19)).Style.Font.FontName = "Times New Roman";
                        worksheet.Cell("B" + (count + 19)).Style.Font.FontSize = 12;
                        worksheet.Cell("O" + (count + 19)).FormulaA1 = "=SUM(O19" + ":O" + (count + 18) + ")";
                        worksheet.Cell("O" + (count + 19)).Style.Font.Bold = true;
                        worksheet.Range("B19", "T" + (count + 19)).Cells().Style.Border.OutsideBorder = XLBorderStyleValues.Thin;
                        int kyten = count + 21;
                        worksheet.Range("B" + kyten, "T" + kyten).Merge();
                        worksheet.Cell("B" + kyten).Value = "Duyệt của Ban Giám Hiệu                                   Trưởng Phòng TCCB                                                   Trưởng Khoa/Ngành/BMTT";
                        worksheet.Cell("B" + kyten).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
                        worksheet.Cell("B" + kyten).Style.Font.Bold = true;
                        worksheet.Cell("B" + kyten).Style.Font.FontName = "Times New Roman";
                        worksheet.Cell("B" + kyten).Style.Font.FontSize = 12;
                        worksheet.PageSetup.PrintAreas.Add("A1:U" + kyten);
                        var ms = new MemoryStream();
                        workbook.SaveAs(ms);
                        ms.Position = 0;
                        return ms;
                    }
                }
                else
                {
                    var folder = HttpContext.Current.Server.MapPath("~//Templates//MauExcelGiangVien");
                    var temp = HttpContext.Current.Server.MapPath("~//Templates//Temp");
                    if (!Directory.Exists(folder))
                    {
                        Directory.CreateDirectory(folder);
                    }
                    foreach (var num in GiangVienID)
                    {
                        var list = XuatExcelDA.XuatExcelMauGiangVien(BangPhanCongID, num).ToList();
                        var data = list.Select(x => new MauGVViewModel
                        {
                            STT = x.STT,
                            TenHocPhan = x.TenHocPhan,
                            MaHP = x.MaHP,
                            SoTC = x.SoTC,
                            SoTietLT = x.SoTietLT,
                            SoTietTH = x.SoTietTH,
                            HK1LT = x.HK1LT,
                            HK1TH = x.HK1TH,
                            HK2LT = x.HK2LT,
                            HK2TH = x.HK2TH,
                            SoTiet = x.SoTiet,
                            CongTacKhac = x.CongTacKhac,
                            TongCongGD = x.TongCongGD,
                            TongCongCT = x.TongCongCT,
                        });
                        var template = HttpContext.Current.Server.MapPath("~/Templates/MauGV.xlsx");
                        using (var msTemplate = new MemoryStream(File.ReadAllBytes(template)))
                        {
                            var workbook = new XLWorkbook(msTemplate);
                            var worksheet = workbook.Worksheets.FirstOrDefault();
                            worksheet.Cell("K4").Value = "Thành phố Hồ Chí Minh, ngày " + DateTime.Now.Day + " tháng " + DateTime.Now.Month + " năm " + DateTime.Now.Year;
                            worksheet.Cell("B8").Value = "NĂM HỌC " + NamHocService.ChiTietNamHoc(BangPhanCongID).NamHoc;
                            worksheet.Cell("B7").Value = list.First().Ho + " " + list.First().Ten;
                            worksheet.Cell("G10").Value = list.First().MaCB;
                            worksheet.Cell("G11").Value = list.First().ChucDanh;
                            worksheet.Cell("G12").Value = list.First().HocVi;
                            worksheet.Cell("G13").Value = list.First().ChucVu;
                            worksheet.Cell("G14").Value = list.First().TenBoMon;
                            var range = worksheet.Cell(19, 2).InsertData(data);
                            range.Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
                            range.Style.Alignment.SetVertical(XLAlignmentVerticalValues.Center);
                            range.Style.Font.FontName = "Times New Roman";
                            range.Style.Font.FontSize = 12;
                            range.Style.Font.Bold = false;
                            range.Style.Font.Italic = false;
                            range.Style.Font.Underline = XLFontUnderlineValues.None;
                            range.Style.Alignment.SetWrapText();
                            int count = range.RowCount();
                            for (int i = 19; i < count + 19; i++)
                            {
                                worksheet.Cell("C" + i).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Left);
                                worksheet.Cell("T" + i).Style.Font.Bold = true;
                            }
                            worksheet.Range("P20", "P" + (count + 19)).Clear();
                            worksheet.Range("P19", "P" + (count + 19)).Merge();
                            worksheet.Range("Q20", "Q" + (count + 19)).Clear();
                            worksheet.Range("Q19", "Q" + (count + 19)).Merge();
                            worksheet.Range("R20", "R" + (count + 19)).Clear();
                            worksheet.Range("R19", "R" + (count + 19)).Merge();
                            worksheet.Range("S20", "S" + (count + 19)).Clear();
                            worksheet.Range("S19", "S" + (count + 19)).Merge();
                            worksheet.Range("T20", "T" + (count + 19)).Clear();
                            worksheet.Range("T19", "T" + (count + 19)).Merge();
                            worksheet.Range("B" + (count + 19), "N" + (count + 19)).Merge();
                            worksheet.Cell("B" + (count + 19)).Value = "Tổng cộng";
                            worksheet.Cell("B" + (count + 19)).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
                            worksheet.Cell("B" + (count + 19)).Style.Font.Bold = true;
                            worksheet.Cell("B" + (count + 19)).Style.Font.FontName = "Times New Roman";
                            worksheet.Cell("B" + (count + 19)).Style.Font.FontSize = 12;
                            worksheet.Cell("O" + (count + 19)).FormulaA1 = "=SUM(O19" + ":O" + (count + 18) + ")";
                            worksheet.Cell("O" + (count + 19)).Style.Font.Bold = true;
                            worksheet.Range("B19", "T" + (count + 19)).Cells().Style.Border.OutsideBorder = XLBorderStyleValues.Thin;
                            int kyten = count + 21;
                            worksheet.Range("B" + kyten, "T" + kyten).Merge();
                            worksheet.Cell("B" + kyten).Value = "Duyệt của Ban Giám Hiệu                                   Trưởng Phòng TCCB                                                   Trưởng Khoa/Ngành/BMTT";
                            worksheet.Cell("B" + kyten).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
                            worksheet.Cell("B" + kyten).Style.Font.Bold = true;
                            worksheet.Cell("B" + kyten).Style.Font.FontName = "Times New Roman";
                            worksheet.Cell("B" + kyten).Style.Font.FontSize = 12;
                            worksheet.PageSetup.PrintAreas.Add("A1:U" + kyten);

                            string fileexcellname = convertToUnSign3(list.First().Ho) + convertToUnSign3(list.First().Ten) + "_" + DateTime.Now.ToString("ddMMyyyyhhmmss") + ".xlsx";
                            workbook.SaveAs(Path.Combine(folder, fileexcellname));
                        }
                        
                    }
                    string filename = "MauExcelGiangVien_" + DateTime.Now.ToString("ddMMyyyyhhmmss") + ".zip";

                    ZipFile.CreateFromDirectory(folder, Path.Combine(temp, filename));
                    var ms = new MemoryStream();
                    using (FileStream file = new FileStream(Path.Combine(temp, filename), FileMode.Open, System.IO.FileAccess.Read))
                    {
                        file.CopyTo(ms);
                    }
                    DirectoryInfo di = new DirectoryInfo(folder);
                    foreach (FileInfo file in di.GetFiles())
                    {
                        file.Delete();
                    }
                    di = new DirectoryInfo(temp);
                    foreach (FileInfo file in di.GetFiles())
                    {
                        file.Delete();
                    }
                    ms.Position = 0;
                    return ms;
                }
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        private static string convertToUnSign3(string s)
        {
            Regex regex = new Regex("\\p{IsCombiningDiacriticalMarks}+");
            string temp = s.Normalize(NormalizationForm.FormD);
            return regex.Replace(temp, String.Empty).Replace('\u0111', 'd').Replace('\u0110', 'D');
        }
    }
}