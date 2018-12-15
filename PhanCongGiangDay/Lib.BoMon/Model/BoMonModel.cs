using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace Lib.BoMon.Model
{
    public class BoMonModel
    {
        public int STT { get; set; }
        public int BoMonID { get; set; }
        public string MaBoMon { get; set; }
        public string TenBoMon { get; set; }
        public int DonViID { get; set; }
        public string TenDonVi { get; set; }
        public string NguoiTao { get; set; }
        public int TrangThai { get; set; } 
        
        
    }
}
