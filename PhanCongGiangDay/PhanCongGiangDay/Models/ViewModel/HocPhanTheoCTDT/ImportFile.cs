using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace PhanCongGiangDay.Models.ViewModel.HocPhanTheoCTDT
{
    public class ImportFile
    {
        [Required(ErrorMessage = "File không được để trống.")]
        public HttpPostedFileBase File { get; set; }
    }
}