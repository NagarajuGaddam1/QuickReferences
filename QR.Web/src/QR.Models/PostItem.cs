using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;

namespace QR.Models
{
    public class PostItem
    {
        public PostItem()
        {
            
        }

        public ulong Id { get; set; }
        public string Title { get; set; }
        public string PostItemText { get; set; }
        public List<Category> Categories { get; set; }
        public List<Tag> Tags { get; set; }
        public PostItemState State { get; set; } 
        public string Author { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime ModifiedOn { get; set; }
        public ulong Upvotes { get; set; }
        public ulong Views { get; set; }
    }
}
