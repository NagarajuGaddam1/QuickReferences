using Microsoft.AspNetCore.Mvc;
using TLDR.Models;
using System;
using System.Threading.Tasks;

namespace TLDR.Web.Services
{
    public interface IPostItemService
    {
        IActionResult GetAllPosts();
        IActionResult GetAllPostBriefs();
        IActionResult GetAllPostIDs(int pageLength, int pageIndex, string sortBy);
        Task<IActionResult> GetPostById(Guid id);
        IActionResult GetPostsByAuthor(string alias);
        IActionResult GetPostsTaggedWith(string tag);
        IActionResult GetPostsInCategory(string category);
        IActionResult GetPostsWithTitle(string title);
        Task<IActionResult> CreatePost(PostItem value);
        Task<IActionResult> UpdatePost(PostItemResponse value);
        Task<IActionResult> DeletePostById(Guid id);
    }
}
