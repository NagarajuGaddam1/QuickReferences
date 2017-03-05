using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QR.Models.Helpers
{
    public static class Utils
    {
        public static T GetEnumIntValue<T>(string enumName)
        {
            var val = (T)Enum.Parse(typeof(T),enumName,true);            
            return val;
        }
    }
}
