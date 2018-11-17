using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace Lib.CongTacKhac.Model
{
    public class CongTacKhacModel
    {
        public int STT { get; set; }
        public int CongTacKhacID { get; set; }
        public int CongTacKhacLogID { get; set; }
        public string TenCongTac { get; set; }
        public int SoTiet { get; set; }
        public string NguoiTao { get; set; }
        public int TrangThai { get; set; } 
        
        public string TenVaSoTiet
        {
            get
            {
                return TenCongTac + " (" + SoTiet + ")";
            }
        }
    }
}
