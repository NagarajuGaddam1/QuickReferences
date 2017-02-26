namespace QR.Models
{
    public enum Tag 
    {
        Html = 0,
        Js = 1,
        Css = 2,
        CSharp = 3,
        Azure = 4
    }

    public enum Category
    {
        WebDevlopment = 0,
        Azure = 1,
        CodeSnippet = 2
    }

    public enum PostItemState
    {
        Created = 0,
        Draft = 1,
        Submitted = 2,
        Posted = 3,
        Deleted = 4
    }
}
