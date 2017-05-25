using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QR.Models
{
    public class ContentItem
    {
        public ContentItem()
        {
            ContentItemId = Guid.NewGuid();
            FlaskLang = null;
            Lang = null;
        }
        public Guid ContentItemId { get; set; }
        public ContentItemType Type { get; set; }
        public ContentItemFlaskType? FlaskLang { get; set; }
        public ContentItemLanguage? Lang { get; set; }
        public string Data { get; set; }
    }
}
