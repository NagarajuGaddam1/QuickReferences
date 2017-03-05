using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using QR.Models;

namespace QR.DataAccess.Repository
{
    public interface IPostItemRepository
    {
        Task<Guid> AddPost(PostItem item);
        IEnumerable<PostItem> GetAllPosts();
        IEnumerable<PostItem> GetAllPostByAuthor(string author);
        IEnumerable<PostItem> GetAllPostByCategory(string category);
        IEnumerable<PostItem> GetAllPostByTag(string tag);
        IEnumerable<PostItem> GetAllPostByTitleText(string titletext);
        Task<PostItem> FindPostById(Guid id);
        Task<bool> DeletePostById(Guid id);
        Task<Guid> UpdatePost(PostItem item);
    }
}
