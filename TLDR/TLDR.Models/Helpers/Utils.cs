using System;

namespace TLDR.Models.Helpers
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
