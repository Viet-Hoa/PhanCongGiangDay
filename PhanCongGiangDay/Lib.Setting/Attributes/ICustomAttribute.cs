using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Lib.Setting.Attributes
{
    public interface ICustomAttribute
    {
        string Message { get; set; }
    }
}
