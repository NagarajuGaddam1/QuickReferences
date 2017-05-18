using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using QR.Models;

namespace QR.DataAccess.Repository
{
    public interface IPostItemRepository
    {
        Task<Guid> AddPost(PostItem item, AuthorMapForPost author);
        IEnumerable<PostItemResponse> GetAllPosts();
        IEnumerable<PostItemResponse> GetAllPostByAuthor(string author);
        IEnumerable<PostItemResponse> GetAllPostByCategory(string category);
        IEnumerable<PostItemResponse> GetAllPostByTag(string tag);
        IEnumerable<PostItemResponse> GetAllPostByTitleText(string titletext);
        Task<PostItemResponse> FindPostById(Guid id);
        Task<bool> DeletePostById(Guid id);
        Task<Guid> UpdatePost(PostItemResponse item);
    }
}
