using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using QR.Models;
using QR.DataAccess.Repository;

namespace QR.Web.Services
{
    public class PostItemService : IPostItemService
    {
        public IPostItemRepository PostRepo { get; set; }
        public IAuthorItemRepository AuthorRepo { get; set; }

        public PostItemService(IPostItemRepository postRepository, IAuthorItemRepository authorRepository)
        {
            PostRepo = postRepository;
            AuthorRepo = authorRepository;
        }

        public async Task<IActionResult> CreatePost(PostItem value)
        {
            var author = AuthorRepo.FindAuthorByAlias(value.Author.Alias);
            var authorMap = new AuthorMapForPost()
            {
                Alias = author.Alias,
                AuthorDocumentId = author.id,
                ImgSrc = author.ImgSrc
            };
            var postId = await PostRepo.AddPost(value, authorMap);
            if (postId != Guid.Empty)
            {
                return new OkObjectResult(postId);
            }
            else
                return new BadRequestResult();
        }

        public async Task<IActionResult> DeletePostById(Guid id)
        {
            var result = await PostRepo.DeletePostById(id);
            if (result)
                return new OkResult();
            else
                return new BadRequestResult();
        }

        public IActionResult GetAllPosts()
        {
            var items = PostRepo.GetAllPosts();
            return new OkObjectResult(items);
        }

        public async Task<IActionResult> GetPostById(Guid id)
        {
            var result = await PostRepo.FindPostById(id);
            if (result != null)
            {
                return new OkObjectResult(result);
            }
            else
                return new BadRequestResult();
        }

        public IActionResult GetPostsByAuthor(string alias)
        {
            var items = PostRepo.GetAllPostByAuthor(alias);
            return new OkObjectResult(items);
        }

        public IActionResult GetPostsInCategory(string category)
        {
            var items = PostRepo.GetAllPostByCategory(category);
            return new OkObjectResult(items);
        }

        public IActionResult GetPostsTaggedWith(string tag)
        {
            var items = PostRepo.GetAllPostByTag(tag);
            return new OkObjectResult(items);
        }

        public IActionResult GetPostsWithTitle(string title)
        {
            var items = PostRepo.GetAllPostByTitleText(title);
            return new OkObjectResult(items);
        }

        public async Task<IActionResult> UpdatePost(PostItemResponse value)
        {
            var result = await PostRepo.UpdatePost(value);
            if (result != Guid.Empty)
            {
                return new OkObjectResult(result);
            }
            else
                return new BadRequestResult();
        }
    }
}
