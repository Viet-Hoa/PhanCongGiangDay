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

        public Stream XuatExcelPhanCong(int BangPhanCongID)
        {
            try
            {
                var template = HttpContext.Current.Server.MapPath("~/Templates/MauXuatExcel.xlsx");
                using (var msTemplate = new MemoryStream(File.ReadAllBytes(template)))
                {
                    var workbook = new XLWorkbook(msTemplate);
                    //hk1
                    var worksheet_hk1 = workbook.Worksheet("Mau 1 HK1");
                    var data_hk1 = XuatExcelDA.XuatExcelMau01(BangPhanCongID, 1);
                    worksheet_hk1.Cell("M4").Value = "Thành phố Hồ Chí Minh, ngày " + DateTime.Now.Day + " tháng " + DateTime.Now.Month + " năm " + DateTime.Now.Year;
                    worksheet_hk1.Cell("A7").Value = "Học kì: 1 ,  Năm học " + NamHocService.ChiTietNamHoc(BangPhanCongID).NamHoc;
                    var range_hk1 = worksheet_hk1.Cell(12, 1).InsertData(data_hk1);
                    range_hk1.Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
                    range_hk1.Style.Alignment.SetVertical(XLAlignmentVerticalValues.Center);
                    range_hk1.Cells().Style.Border.OutsideBorder = XLBorderStyleValues.Thin;
                    range_hk1.Style.Font.FontName = "Times New Roman";
                    range_hk1.Style.Font.FontSize = 12;
                    range_hk1.Style.Font.Bold = false;
                    range_hk1.Style.Font.Italic = false;
                    range_hk1.Style.Font.Underline = XLFontUnderlineValues.None;
                    range_hk1.Style.Alignment.SetWrapText();
                    int count = range_hk1.RowCount(), first = 12, last = 12, STT = 1;

                    for (int i = 12; i < count + 12; i++)
                    {
                        if (worksheet_hk1.Cell("B" + (i + 1)).Value.ToString() == worksheet_hk1.Cell("B" + i).Value.ToString())
                            last++;
                        else if (first != last)
                        {
                            worksheet_hk1.Cell("A" + first).Value = STT;
                            worksheet_hk1.Range("A" + first, "A" + last).Merge();
                            worksheet_hk1.Range("B" + first, "B" + last).Merge();
                            worksheet_hk1.Range("C" + first, "C" + last).Merge();
                            worksheet_hk1.Range("D" + first, "D" + last).Merge();
                            worksheet_hk1.Range("E" + first, "E" + last).Merge();
                            worksheet_hk1.Range("F" + first, "F" + last).Merge();
                            worksheet_hk1.Range("G" + first, "G" + last).Merge();
                            worksheet_hk1.Range("H" + first, "H" + last).Merge();
                            worksheet_hk1.Range("I" + first, "I" + last).Merge();
                            worksheet_hk1.Range("J" + first, "J" + last).Merge();
                            worksheet_hk1.Range("K" + first, "K" + last).Merge();
                            worksheet_hk1.Range("L" + first, "L" + last).Merge();
                            first = i + 1;
                            last = i + 1;
                            STT++;
                        }
                        else
                        {
                            worksheet_hk1.Cell("A" + first).Value = STT;
                            last = i + 1;
                            first = i + 1;
                            STT++;
                        }
                        worksheet_hk1.Row(i).AdjustToContents();
                    }
                    int kyten = range_hk1.RowCount() + 14;
                    worksheet_hk1.Cell("A" + kyten).Value = "Các học phần có yêu cầu đặc biệt về việc tổ chức đào tạo, được ghi vào phần ghi chú dưới đây.";
                    worksheet_hk1.Cell("A" + kyten).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Left);
                    worksheet_hk1.Cell("A" + kyten).Style.Font.Bold = false;
                    worksheet_hk1.Cell("A" + kyten).Style.Font.FontName = "Times New Roman";
                    worksheet_hk1.Cell("A" + kyten).Style.Font.FontSize = 12;
                    kyten++;
                    worksheet_hk1.Cell("A" + kyten).Value = "Ghi chú:";
                    worksheet_hk1.Cell("A" + kyten).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Left);
                    worksheet_hk1.Cell("A" + kyten).Style.Font.Bold = true;
                    worksheet_hk1.Cell("A" + kyten).Style.Font.FontName = "Times New Roman";
                    worksheet_hk1.Cell("A" + kyten).Style.Font.FontSize = 12;
                    kyten++;
                    worksheet_hk1.Cell("A" + kyten).Value = "Các học phần chung của ngành CNTT và KTPM mở lớp chung";
                    worksheet_hk1.Cell("A" + kyten).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Left);
                    worksheet_hk1.Cell("A" + kyten).Style.Font.Bold = false;
                    worksheet_hk1.Cell("A" + kyten).Style.Font.FontName = "Times New Roman";
                    worksheet_hk1.Cell("A" + kyten).Style.Font.FontSize = 12;
                    kyten++;
                    worksheet_hk1.Range("H" + kyten, "Q" + kyten).Merge();
                    worksheet_hk1.Cell("H" + kyten).Value = "TRƯỞNG KHOA/NGÀNH/BỘ MÔN TT";
                    worksheet_hk1.Cell("H" + kyten).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
                    worksheet_hk1.Cell("H" + kyten).Style.Font.Bold = true;
                    worksheet_hk1.Cell("H" + kyten).Style.Font.FontName = "Times New Roman";
                    worksheet_hk1.Cell("H" + kyten).Style.Font.FontSize = 12;
                    worksheet_hk1.PageSetup.PrintAreas.Add("A1:Q" + kyten);

                    //hk2
                    var worksheet_hk2 = workbook.Worksheet("Mau 1 HK2");
                    var data = XuatExcelDA.XuatExcelMau01(BangPhanCongID, 2);
                    worksheet_hk2.Cell("M4").Value = "Thành phố Hồ Chí Minh, ngày " + DateTime.Now.Day + " tháng " + DateTime.Now.Month + " năm " + DateTime.Now.Year;
                    worksheet_hk2.Cell("A7").Value = "Học kì: 2 ,  Năm học " + NamHocService.ChiTietNamHoc(BangPhanCongID).NamHoc;
                    var range_hk2 = worksheet_hk2.Cell(12, 1).InsertData(data);
                    range_hk2.Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
                    range_hk2.Style.Alignment.SetVertical(XLAlignmentVerticalValues.Center);
                    range_hk2.Cells().Style.Border.OutsideBorder = XLBorderStyleValues.Thin;
                    range_hk2.Style.Font.FontName = "Times New Roman";
                    range_hk2.Style.Font.FontSize = 12;
                    range_hk2.Style.Font.Bold = false;
                    range_hk2.Style.Font.Italic = false;
                    range_hk2.Style.Font.Underline = XLFontUnderlineValues.None;
                    range_hk2.Style.Alignment.SetWrapText();
                    count = range_hk2.RowCount(); first = 12; last = 12; STT = 1;

                    for (int i = 12; i < count + 12; i++)
                    {
                        if (worksheet_hk2.Cell("B" + (i + 1)).Value.ToString() == worksheet_hk2.Cell("B" + i).Value.ToString())
                            last++;
                        else if (first != last)
                        {
                            worksheet_hk2.Cell("A" + first).Value = STT;
                            worksheet_hk2.Range("A" + first, "A" + last).Merge();
                            worksheet_hk2.Range("B" + first, "B" + last).Merge();
                            worksheet_hk2.Range("C" + first, "C" + last).Merge();
                            worksheet_hk2.Range("D" + first, "D" + last).Merge();
                            worksheet_hk2.Range("E" + first, "E" + last).Merge();
                            worksheet_hk2.Range("F" + first, "F" + last).Merge();
                            worksheet_hk2.Range("G" + first, "G" + last).Merge();
                            worksheet_hk2.Range("H" + first, "H" + last).Merge();
                            worksheet_hk2.Range("I" + first, "I" + last).Merge();
                            worksheet_hk2.Range("J" + first, "J" + last).Merge();
                            worksheet_hk2.Range("K" + first, "K" + last).Merge();
                            worksheet_hk2.Range("L" + first, "L" + last).Merge();
                            first = i + 1;
                            last = i + 1;
                            STT++;
                        }
                        else
                        {
                            worksheet_hk2.Cell("A" + first).Value = STT;
                            last = i + 1;
                            first = i + 1;
                            STT++;
                        }
                        worksheet_hk2.Row(i).AdjustToContents();
                    }
                    kyten = range_hk2.RowCount() + 14;
                    worksheet_hk2.Cell("A" + kyten).Value = "Các học phần có yêu cầu đặc biệt về việc tổ chức đào tạo, được ghi vào phần ghi chú dưới đây.";
                    worksheet_hk2.Cell("A" + kyten).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Left);
                    worksheet_hk2.Cell("A" + kyten).Style.Font.Bold = false;
                    worksheet_hk2.Cell("A" + kyten).Style.Font.FontName = "Times New Roman";
                    worksheet_hk2.Cell("A" + kyten).Style.Font.FontSize = 12;
                    kyten++;
                    worksheet_hk2.Cell("A" + kyten).Value = "Ghi chú:";
                    worksheet_hk2.Cell("A" + kyten).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Left);
                    worksheet_hk2.Cell("A" + kyten).Style.Font.Bold = true;
                    worksheet_hk2.Cell("A" + kyten).Style.Font.FontName = "Times New Roman";
                    worksheet_hk2.Cell("A" + kyten).Style.Font.FontSize = 12;
                    kyten++;
                    worksheet_hk2.Cell("A" + kyten).Value = "Các học phần chung của ngành CNTT và KTPM mở lớp chung";
                    worksheet_hk2.Cell("A" + kyten).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Left);
                    worksheet_hk2.Cell("A" + kyten).Style.Font.Bold = false;
                    worksheet_hk2.Cell("A" + kyten).Style.Font.FontName = "Times New Roman";
                    worksheet_hk2.Cell("A" + kyten).Style.Font.FontSize = 12;
                    kyten++;
                    worksheet_hk2.Range("H" + kyten, "Q" + kyten).Merge();
                    worksheet_hk2.Cell("H" + kyten).Value = "TRƯỞNG KHOA/NGÀNH/BỘ MÔN TT";
                    worksheet_hk2.Cell("H" + kyten).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
                    worksheet_hk2.Cell("H" + kyten).Style.Font.Bold = true;
                    worksheet_hk2.Cell("H" + kyten).Style.Font.FontName = "Times New Roman";
                    worksheet_hk2.Cell("H" + kyten).Style.Font.FontSize = 12;
                    worksheet_hk2.PageSetup.PrintAreas.Add("A1:Q" + kyten);

                    //02
                    var worksheet_2 = workbook.Worksheet("Mau 2");
                    var data_2 = XuatExcelDA.XuatExcelMau02(BangPhanCongID).ToList();
                    worksheet_2.Cell("L5").Value = "Thành phố Hồ Chí Minh, ngày " + DateTime.Now.Day + " tháng " + DateTime.Now.Month + " năm " + DateTime.Now.Year;
                    worksheet_2.Cell("A8").Value = "NĂM HỌC " + NamHocService.ChiTietNamHoc(BangPhanCongID).NamHoc;
                    var range_2 = worksheet_2.Cell(15, 1).InsertData(data_2);
                    range_2.Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
                    range_2.Style.Alignment.SetVertical(XLAlignmentVerticalValues.Center);
                    range_2.Cells().Style.Border.OutsideBorder = XLBorderStyleValues.Thin;
                    range_2.Style.Font.FontName = "Times New Roman";
                    range_2.Style.Font.FontSize = 12;
                    range_2.Style.Font.Bold = false;
                    range_2.Style.Font.Italic = false;
                    range_2.Style.Font.Underline = XLFontUnderlineValues.None;
                    range_2.Style.Alignment.SetWrapText();
                    count = range_2.RowCount(); first = 15; last = 15; STT = 1;
                    int j = 15;
                    while (j < count + 15)
                    {
                        worksheet_2.Cell("C" + j).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Left);
                        worksheet_2.Cell("F" + j).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Left);

                        if (worksheet_2.Cell("B" + (j + 1)).Value.ToString() == worksheet_2.Cell("B" + j).Value.ToString())
                            last++;
                        else if (first != last)
                        {
                            worksheet_2.Cell("A" + first).Value = STT;
                            worksheet_2.Range("A" + first, "A" + last).Merge();
                            worksheet_2.Range("B" + first, "B" + last).Merge();
                            worksheet_2.Range("C" + first, "C" + last).Merge();
                            worksheet_2.Range("D" + first, "D" + last).Merge();
                            worksheet_2.Range("E" + first, "E" + last).Merge();
                            worksheet_2.Range("T" + first, "T" + last).Merge();
                            worksheet_2.Range("U" + first, "U" + last).Merge();
                            worksheet_2.Range("V" + first, "V" + last).Merge();
                            worksheet_2.Range("S" + first, "S" + last).Merge();
                            worksheet_2.Range("W" + first, "W" + last).Merge();
                            worksheet_2.Cell("W" + first).Style.Font.Bold = true;
                            worksheet_2.Row(j).InsertRowsBelow(1);
                            j++;

                            worksheet_2.Range("S" + first, "S" + j).Merge();
                            worksheet_2.Range("W" + first, "W" + j).Merge();
                            worksheet_2.Range("A" + j + ":Q" + j).Merge();
                            worksheet_2.Cell("A" + j).Value = "Tổng cộng";
                            worksheet_2.Cell("A" + j).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
                            worksheet_2.Cell("A" + j).Style.Font.Bold = true;
                            worksheet_2.Cell("A" + j).Style.Font.FontName = "Times New Roman";
                            worksheet_2.Cell("A" + j).Style.Font.FontSize = 12;
                            worksheet_2.Cell("R" + j).FormulaA1 = "=SUM(R" + first + ":R" + last + ")";
                            worksheet_2.Cell("R" + j).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
                            worksheet_2.Cell("R" + j).Style.Font.Bold = true;
                            worksheet_2.Cell("R" + j).Style.Font.FontName = "Times New Roman";
                            worksheet_2.Cell("R" + j).Style.Font.FontSize = 12;

                            count++;



                            first = j + 1;
                            last = j + 1;
                            STT++;

                        }
                        else
                        {
                            worksheet_2.Cell("A" + first).Value = STT;
                            worksheet_2.Cell("W" + first).Style.Font.Bold = true;

                            last = j + 1;
                            first = j + 1;
                            STT++;
                        }
                        j++;
                    }

                    kyten = count + 17;
                    worksheet_2.Range("A" + kyten, "W" + kyten).Merge();
                    worksheet_2.Cell("A" + kyten).Value = "Duyệt của Ban Giám Hiệu                                                                 Trưởng Phòng TCCB                                                                        Trưởng Khoa/Ngành/BMTT";
                    worksheet_2.Cell("A" + kyten).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
                    worksheet_2.Cell("A" + kyten).Style.Font.Bold = true;
                    worksheet_2.Cell("A" + kyten).Style.Font.FontName = "Times New Roman";
                    worksheet_2.Cell("A" + kyten).Style.Font.FontSize = 12;
                    worksheet_2.PageSetup.PrintAreas.Add("A1:W" + kyten);

                    //03
                    var worksheet_3 = workbook.Worksheet("Mau 3");
                    var data_3 = XuatExcelDA.XuatExcelMau03(BangPhanCongID).ToList();
                    worksheet_3.Cell("N4").Value = "Thành phố Hồ Chí Minh, ngày " + DateTime.Now.Day + " tháng " + DateTime.Now.Month + " năm " + DateTime.Now.Year;
                    worksheet_3.Cell("A8").Value = "NĂM HỌC " + NamHocService.ChiTietNamHoc(BangPhanCongID).NamHoc;
                    var range_3 = worksheet_3.Cell(13, 1).InsertData(data_3);
                    range_3.Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
                    range_3.Style.Alignment.SetVertical(XLAlignmentVerticalValues.Top);
                    range_3.Cells().Style.Border.OutsideBorder = XLBorderStyleValues.Thin;
                    range_3.Style.Font.FontName = "Times New Roman";
                    range_3.Style.Font.FontSize = 12;
                    range_3.Style.Font.Bold = false;
                    range_3.Style.Font.Italic = false;
                    range_3.Style.Font.Underline = XLFontUnderlineValues.None;
                    range_3.Style.Alignment.SetWrapText();
                    count = range_3.RowCount(); first = 13; last = 13; STT = 1;
                    for (int i = 13; i < count + 13; i++)
                    {
                        if (worksheet_3.Cell("R" + (i + 1)).Value.ToString() == worksheet_3.Cell("R" + i).Value.ToString())
                            last++;
                        else if (first != last)
                        {
                            worksheet_3.Range("R" + first, "R" + last).Merge();
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
                        if (worksheet_3.Cell("O" + (i + 1)).Value.ToString() == worksheet_3.Cell("O" + i).Value.ToString())
                            last++;
                        else if (first != last)
                        {
                            worksheet_3.Range("O" + first, "O" + last).Merge();
                            worksheet_3.Range("P" + first, "P" + last).Merge();
                            worksheet_3.Range("Q" + first, "Q" + last).Merge();
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
                        if (worksheet_3.Cell("B" + (i + 1)).Value.ToString() == worksheet_3.Cell("B" + i).Value.ToString())
                            last++;
                        else if (first != last)
                        {
                            worksheet_3.Cell("A" + first).Value = STT;
                            worksheet_3.Range("A" + first, "A" + last).Merge();
                            worksheet_3.Range("B" + first, "B" + last).Merge();
                            worksheet_3.Range("C" + first, "C" + last).Merge();
                            worksheet_3.Range("D" + first, "D" + last).Merge();
                            worksheet_3.Range("E" + first, "E" + last).Merge();
                            worksheet_3.Range("F" + first, "F" + last).Merge();
                            worksheet_3.Range("G" + first, "G" + last).Merge();
                            first = i + 1;
                            last = i + 1;
                            STT++;
                        }
                        else
                        {
                            worksheet_3.Cell("A" + first).Value = STT;
                            last = i + 1;
                            first = i + 1;
                            STT++;
                        }
                    }
                    for (int i = 13; i < range_3.RowCount() + 13; i++)
                    {
                        worksheet_3.Row(i).Style.Alignment.SetVertical(XLAlignmentVerticalValues.Center);
                    }
                    kyten = range_3.RowCount() + 15;
                    worksheet_3.Range("A" + kyten, "R" + kyten).Merge();
                    worksheet_3.Cell("A" + kyten).Value = "Duyệt của Ban Giám Hiệu                          Trưởng P. Kế hoạch - TC                    Trưởng P. Tổ chức - CB                  Trưởng khoa/Ngành/ Bộ môn TT";
                    worksheet_3.Cell("A" + kyten).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
                    worksheet_3.Cell("A" + kyten).Style.Font.Bold = true;
                    worksheet_3.Cell("A" + kyten).Style.Font.FontName = "Times New Roman";
                    worksheet_3.Cell("A" + kyten).Style.Font.FontSize = 12;
                    worksheet_3.PageSetup.PrintAreas.Add("A1:R" + kyten);

                    //04
                    var worksheet_4 = workbook.Worksheet("Mau 4");
                    var data_4 = XuatExcelDA.XuatExcelMau04(BangPhanCongID).ToList();
                    worksheet_4.Cell("G3").Value = "Thành phố Hồ Chí Minh, ngày " + DateTime.Now.Day + " tháng " + DateTime.Now.Month + " năm " + DateTime.Now.Year;
                    worksheet_4.Cell("A7").Value = "NĂM HỌC " + NamHocService.ChiTietNamHoc(BangPhanCongID).NamHoc;
                    var range_4 = worksheet_4.Cell(13, 1).InsertData(data_4);
                    range_4.Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
                    range_4.Style.Alignment.SetVertical(XLAlignmentVerticalValues.Top);
                    range_4.Cells().Style.Border.OutsideBorder = XLBorderStyleValues.Thin;
                    range_4.Style.Font.FontName = "Times New Roman";
                    range_4.Style.Font.FontSize = 12;
                    range_4.Style.Font.Bold = false;
                    range_4.Style.Font.Italic = false;
                    range_4.Style.Font.Underline = XLFontUnderlineValues.None;
                    range_4.Style.Alignment.SetWrapText();
                    count = range_4.RowCount(); first = 13; last = 13; STT = 1;
                    for (int i = 13; i < count + 13; i++)
                    {
                        if (worksheet_4.Cell(i + 1, 2).Value.ToString() == worksheet_4.Cell(i, 2).Value.ToString())
                            last++;
                        else if (first != last)
                        {
                            worksheet_4.Cell("A" + first).Value = STT;
                            worksheet_4.Range("A" + first, "A" + last).Merge();
                            worksheet_4.Range("B" + first, "B" + last).Merge();
                            worksheet_4.Range("C" + first, "C" + last).Merge();
                            worksheet_4.Range("D" + first, "D" + last).Merge();
                            worksheet_4.Range("E" + first, "E" + last).Merge();
                            first = i + 1;
                            last = i + 1;
                            STT++;
                        }
                        else
                        {
                            worksheet_4.Cell("A" + first).Value = STT;
                            last = i + 1;
                            first = i + 1;
                            STT++;
                        }
                    }
                    for (int i = 13; i < range_4.RowCount() + 13; i++)
                    {
                        worksheet_4.Cell("A" + i).Style.Alignment.SetVertical(XLAlignmentVerticalValues.Center);
                        worksheet_4.Cell("B" + i).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Left);
                        worksheet_4.Cell("B" + i).Style.Alignment.SetVertical(XLAlignmentVerticalValues.Center);
                        worksheet_4.Cell("C" + i).Style.Alignment.SetVertical(XLAlignmentVerticalValues.Center);
                        worksheet_4.Cell("D" + i).Style.Alignment.SetVertical(XLAlignmentVerticalValues.Center);
                        worksheet_4.Cell("E" + i).Style.Alignment.SetVertical(XLAlignmentVerticalValues.Center);
                        worksheet_4.Cell("F" + i).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Left);
                        worksheet_4.Row(i).AdjustToContents();
                    }
                    kyten = range_4.RowCount() + 15;
                    worksheet_4.Range("A" + kyten, "R" + kyten).Merge();
                    worksheet_4.Cell("A" + kyten).Value = "Duyệt của Ban Giám Hiệu                          Trưởng P. Kế hoạch - TC                    Trưởng P. Tổ chức - CB                  Trưởng khoa/Ngành/ Bộ môn TT";
                    worksheet_4.Cell("A" + kyten).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
                    worksheet_4.Cell("A" + kyten).Style.Font.Bold = true;
                    worksheet_4.Cell("A" + kyten).Style.Font.FontName = "Times New Roman";
                    worksheet_4.Cell("A" + kyten).Style.Font.FontSize = 12;
                    worksheet_4.PageSetup.PrintAreas.Add("A1:R" + kyten);


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

        private static string convertToUnSign3(string s)
        {
            Regex regex = new Regex("\\p{IsCombiningDiacriticalMarks}+");
            string temp = s.Normalize(NormalizationForm.FormD);
            return regex.Replace(temp, String.Empty).Replace('\u0111', 'd').Replace('\u0110', 'D');
        }
    }
}