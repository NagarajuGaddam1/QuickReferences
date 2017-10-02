using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TLDR.Models;
using TLDR.DataAccess.Repository;

namespace TLDR.Web.Services
{
    public class PostItemService : IPostItemService
    {
        public IPostItemRepository PostRepo { get; set; }
        public IAuthorItemRepository AuthorRepo { get; set; }

        public IEnumerable<PostItemResponse> RefreshAuthorMaps(IEnumerable<PostItemResponse> items)
        {
            var authors = items.Select(x => new AuthorMapForPost()
            {
                Alias = x.Author.Alias,
                AuthorDocumentId = null,
                ImgSrc = null
            })
            .GroupBy(x => x.Alias)
            .Select(x => x.First())
            .ToList();
            authors.ForEach(x =>
            {
                //var _authorMap = AuthorRepo.FindAuthorByAlias(x.Alias);
                //x.AuthorDocumentId = _authorMap.id;
                //x.ImgSrc = _authorMap.ImgSrc;
                x.Alias = "asitparida";
                x.ImgSrc = "https://avatars1.githubusercontent.com/u/5743601?v=4";
                x.AuthorDocumentId = new Guid("b574caac-e968-4d81-aa92-c9cffe6fa8e8");
            }
            );
            items = items.Select(x => {
                x.Author = authors.Where(y => y.Alias == x.Author.Alias).FirstOrDefault();
                return x;
            });
            return items;
        }

        public PostItemResponse RefreshAuthorMap(PostItemResponse item)
        {
            //var _authorMap = AuthorRepo.FindAuthorByAlias(item.Author.Alias);
            //item.Author.AuthorDocumentId = _authorMap.id;
            //item.Author.ImgSrc = _authorMap.ImgSrc;
            item.Author.Alias = "asitparida";
            item.Author.ImgSrc = "https://avatars1.githubusercontent.com/u/5743601?v=4";
            item.Author.AuthorDocumentId = new Guid("b574caac-e968-4d81-aa92-c9cffe6fa8e8");
            return item;
        }

        public PostItemService(IPostItemRepository postRepository, IAuthorItemRepository authorRepository)
        {
            PostRepo = postRepository;
            AuthorRepo = authorRepository;
        }

        public async Task<IActionResult> CreatePost(PostItem value)
        {
            //var author = AuthorRepo.FindAuthorByAlias(value.Author.Alias);
            var authorMap = new AuthorMapForPost()
            {
                Alias = "asitparida",
                AuthorDocumentId = new Guid("b574caac-e968-4d81-aa92-c9cffe6fa8e8"),
                ImgSrc = "https://avatars1.githubusercontent.com/u/5743601?v=4"
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
            items = RefreshAuthorMaps(items);
            return new OkObjectResult(items);
        }

        public async Task<IActionResult> GetPostById(Guid id)
        {
            var result = await PostRepo.FindPostById(id);
            if (result != null)
            {
                result = RefreshAuthorMap(result);
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

        public IActionResult GetAllPostBriefs()
        {
            var items = PostRepo.GetAllPostBriefs();            
            return new OkObjectResult(items);
        }

        public IActionResult GetAllPostIDs(int pageLength, int pageIndex, string sortBy)
        {
            var items = PostRepo.GetAllPostIDs(pageLength, pageIndex, sortBy);
            return new OkObjectResult(items);
        }
    }
}
