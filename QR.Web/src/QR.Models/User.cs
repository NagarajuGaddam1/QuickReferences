using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QR.Models
{
    public class User
    {
        public ulong Id { get; set; }
        public string Email { get; set; }
        public string FullName { get; set; }
    }
}
