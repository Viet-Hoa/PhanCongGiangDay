using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Lib.Setting
{
    public class ExcelFormatNotValid : Exception
    {
        public ExcelFormatNotValid(string message)
            : base(message)
        {

        }
    }
}
