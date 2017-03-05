using Microsoft.Azure.Documents;

namespace QR.Models
{
    public class User : Document
    {
        public ulong Id { get; set; }
        public string Email { get; set; }
        public string FullName { get; set; }
    }
}
