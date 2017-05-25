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
                var _authorMap = AuthorRepo.FindAuthorByAlias(x.Alias);
                x.AuthorDocumentId = _authorMap.id;
                x.ImgSrc = _authorMap.ImgSrc;
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
            var _authorMap = AuthorRepo.FindAuthorByAlias(item.Author.Alias);
            item.Author.AuthorDocumentId = _authorMap.id;
            item.Author.ImgSrc = _authorMap.ImgSrc;
            return item;
        }

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
            items = RefreshAuthorMaps(items);
            return new OkObjectResult(items);
        }

        public IActionResult GetPostsInCategory(string category)
        {
            var items = PostRepo.GetAllPostByCategory(category);
            items = RefreshAuthorMaps(items);
            return new OkObjectResult(items);
        }

        public IActionResult GetPostsTaggedWith(string tag)
        {
            var items = PostRepo.GetAllPostByTag(tag);
            items = RefreshAuthorMaps(items);
            return new OkObjectResult(items);
        }

        public IActionResult GetPostsWithTitle(string title)
        {
            var items = PostRepo.GetAllPostByTitleText(title);
            items = RefreshAuthorMaps(items);
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
    }
}
