using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QR.Models
{
    public class AuthorItem
    {
        public AuthorItem()
        {
            IsSuspended = false;
        }

        public Guid AuthorId { get; set; }
        public string Name { get; set; }
        public AuthenticationType AuthType { get; set; }
        public string SourceId { get; set; }
        public string Alias { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime ModifiedOn { get; set; }
        public DateTime ActivatedOn { get; set; }
        public Boolean IsSuspended { get; set; }
        public Uri ImgSrc { get; set; }
    }

    public class AuthorItemResponse : AuthorItem, GenericDocument
    {
        public AuthorItemResponse()
        {
        }
        /* SYSTEM GENERATED ID */
        public Guid id { get; set; }
    }

    public class AuthorMapForPost
    {
        public AuthorMapForPost()
        {
        }
        public Guid AuthorDocumentId { get; set; }
        public string Alias { get; set; }
        public Uri ImgSrc { get; set; }
    }
}
