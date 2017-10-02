using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TLDR.Models;

namespace TLDR.DataAccess.Repository
{
    public interface IPostItemRepository
    {
        Task<Guid> AddPost(PostItem item, AuthorMapForPost author);
        IEnumerable<PostItemResponse> GetAllPosts();
        IEnumerable<PostItemBrief> GetAllPostBriefs();
        IEnumerable<Guid> GetAllPostIDs(int pageLength, int pageIndex, string sortBy);
        IEnumerable<Guid> GetAllPostByAuthor(string author);
        IEnumerable<Guid> GetAllPostByCategory(string category);
        IEnumerable<Guid> GetAllPostByTag(string tag);
        IEnumerable<Guid> GetAllPostByTitleText(string titletext);
        Task<PostItemResponse> FindPostById(Guid id);
        Task<bool> DeletePostById(Guid id);
        Task<Guid> UpdatePost(PostItemResponse item);
    }
}
