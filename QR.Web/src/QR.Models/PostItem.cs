using System;
using System.Collections.Generic;
using Microsoft.Azure.Documents;

namespace QR.Models
{
    public class PostItem : Document
    {
        public PostItem()
        {
            
        }

        public Guid PostId { get; set; }
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
