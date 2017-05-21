using System;
using System.Collections.Generic;
using Microsoft.Azure.Documents;

namespace QR.Models
{
    public class PostItem
    {
        public PostItem()
        {
            IsPublished = false;
            IsSuspended = false;
        }

        public Guid PostId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public List<Category> Categories { get; set; }
        public List<string> Tags { get; set; }
        public List<ContentItem> ContentItems { get; set; }
        public PostItemState State { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime ModifiedOn { get; set; }
        public ulong Upvotes { get; set; }
        public ulong Views { get; set; }
        public Boolean IsPublished { get; set; }
        public Boolean IsSuspended { get; set; }
        public AuthorMapForPost Author { get; set; }

    }

    public class PostItemResponse : PostItem, GenericDocument
    {
        public PostItemResponse()
        {
        }
        /* SYSTEM GENERATED ID */
        public Guid id { get; set; }
    }

    public class PostItemBrief : GenericDocument
    {
        public PostItemBrief()
        {

        }
        public Guid PostId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public List<Category> Categories { get; set; }
        public DateTime ModifiedOn { get; set; }
        public Boolean IsPublished { get; set; }
        public Boolean IsSuspended { get; set; }
        public AuthorMapForPost Author { get; set; }
        public Guid id { get; set; }
    }
}

