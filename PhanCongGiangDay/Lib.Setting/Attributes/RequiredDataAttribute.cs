using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Lib.Setting.Attributes
{
    [AttributeUsage(AttributeTargets.Property)]
    public class RequiredDataAttribute : Attribute, ICustomAttribute
    {
        public RequiredDataAttribute()
        {
            Message = "This field is required";
        }

        public string Message { get; set; }
    }
}
