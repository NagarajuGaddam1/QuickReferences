using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using QR.Models;
using QR.DataAccess.Repository;
using QR.Web.Filters;
using QR.Web.Services;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace QR.Web.Controllers.api
{
    [Route("api/[controller]")]
    public class PostItemController : Controller
    {
        public IPostItemService PostService { get; set; }
        public PostItemController(IPostItemService postService)
        {
            PostService = postService;
        }

        // GET: api/PostItem
        [HttpGet]        
        public IActionResult Get()
        {
            //todo:
            //Add validations and other stuff
            return PostService.GetAllPosts();
        }

        // GET api/PostItem/someguid
        [HttpGet("{id}")]
        public Task<IActionResult> Get(Guid id)
        {
            //todo:
            //Add validations and other stuff

            return PostService.GetPostById(id);
        }

        // GET: api/PostItem
        [HttpGet("briefs")]
        public IActionResult GetBriefs()
        {
            //todo:
            //Add validations and other stuff
            return PostService.GetAllPostBriefs();
        }

        [HttpGet("authors/{author}")]
        public IActionResult SearchByAuthor(string author)
        {
            //todo:
            //Add validations and other stuff

            return PostService.GetPostsByAuthor(author);
        }

        [HttpGet("tags/{tag}")]
        public IActionResult SearchByTag(string tag)
        {
            //todo:
            //Add validations and other stuff

            return PostService.GetPostsTaggedWith(tag);
        }

        [HttpGet("categories/{category}")]
        public IActionResult SearchByCategory(string category)
        {
            //todo:
            //Add validations and other stuff

            return PostService.GetPostsInCategory(category);
        }

        [HttpGet("title/{title}")]
        public IActionResult SearchByTitle(string title)
        {
            //todo:
            //Add validations and other stuff

            return PostService.GetPostsWithTitle(title);
        }

        // POST api/PostItem
        [HttpPost]
        [AdminAuthorized]
        public Task<IActionResult> Post([FromBody]PostItem value)
        {
            return PostService.CreatePost(value);
        }

        // PUT api/PostItem/5
        [HttpPut("{id}")]
        [AdminAuthorized]
        public Task<IActionResult> Put(Guid id, [FromBody]PostItemResponse value)
        {
            //todo:
            //Add validations and other stuff
            return PostService.UpdatePost(value);
        }

        // DELETE api/PostItem/5
        [HttpDelete("{id}")]
        [AdminAuthorized]
        public Task<IActionResult> Delete(Guid id)
        {
            //todo:
            //Add validations and other stuff

            return PostService.DeletePostById(id);
        }
    }
}
