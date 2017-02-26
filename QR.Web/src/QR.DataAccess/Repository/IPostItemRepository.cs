using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using QR.Models;

namespace QR.DataAccess.Repository
{
    public interface IPostItemRepository
    {
        ulong AddPost(PostItem item);
        IEnumerable<PostItem> GetAllPosts();
        IEnumerable<PostItem> GetAllPostByAuthoe(string author);
        IEnumerable<PostItem> GetAllPostByCategory(string category);
        IEnumerable<PostItem> GetAllPostByTagEnumerable(string tag);
        IEnumerable<PostItem> GetAllPostByTitleText(string titletext);
        PostItem FindPostById(ulong id);
        bool DeletePostById(ulong id);
        ulong UpdatePost(PostItem item);
    }
}
