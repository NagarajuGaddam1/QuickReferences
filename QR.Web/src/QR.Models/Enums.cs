using System;

namespace QR.Models
{
    public enum Category
    {
        HTML = 0,
        JS = 1,
        CSS = 2,
        SCSS = 3,
        CSHARP = 4,
        AZURE = 5
    }

    public enum PostItemState
    {
        CREATED = 0,
        DRAFT = 1,
        SUBMITTED = 2,
        POSTED = 3,
        DELETED = 4
    }

    public enum ContentItemType
    {
        TEXT = 0,
        FLASK = 1
    }

    public enum ContentItemFlaskType
    {
        JAVASCRIPT = 0,
        MARKUP = 1,
        CSS = 2
    }

    public enum ContentItemLanguage
    {
        JAVASCRIPT = 0,
        MARKUP = 1,
        CSS = 2,
        HTM = 3,
        SCSS = 4
    }
    public enum AuthenticationType
    {
        GITHUB = 0,
        LINKEDIN = 1,
        FACEBOOK = 2
    }

    public interface GenericDocument
    {
        Guid id { get; set; }
    }
}
