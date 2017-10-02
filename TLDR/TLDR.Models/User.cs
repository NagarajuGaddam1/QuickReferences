using Microsoft.Azure.Documents;

namespace TLDR.Models
{
    public class User : Document
    {
        public ulong Id { get; set; }
        public string Email { get; set; }
        public string FullName { get; set; }
    }
}
