using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QR.Models;
using QR.DataAccess.Repository;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace QR.Web.Controllers.api
{
    [Route("api/[controller]")]
    public class PostItemController : Controller
    {
        public IPostItemRepository Repo { get; set; }
        public PostItemController(IPostItemRepository repository)
        {
            Repo = repository;
        }

        // GET: api/PostItem
        [HttpGet]
        public IEnumerable<PostItem> Get()
        {
            //todo:
            //Add validations and other stuff

            return Repo.GetAllPosts();
        }

        // GET api/PostItem/someguid
        [HttpGet("{id}")]
        public async Task<PostItem> Get(Guid id)
        {
            //todo:
            //Add validations and other stuff

            return await Repo.FindPostById(id);
        }

        [HttpGet("authors/{author}")]
        public IEnumerable<PostItem> SearchByAuthor(string author)
        {
            //todo:
            //Add validations and other stuff

            return Repo.GetAllPostByAuthor(author);
        }

        [HttpGet("tags/{tag}")]
        public IEnumerable<PostItem> SearchByTag(string tag)
        {
            //todo:
            //Add validations and other stuff

            return Repo.GetAllPostByTag(tag);
        }

        [HttpGet("categories/{category}")]
        public IEnumerable<PostItem> SearchByCategory(string category)
        {
            //todo:
            //Add validations and other stuff

            return Repo.GetAllPostByCategory(category);
        }

        [HttpGet("title/{title}")]
        public IEnumerable<PostItem> SearchByTitle(string title)
        {
            //todo:
            //Add validations and other stuff

            return Repo.GetAllPostByTitleText(title);
        }

        // POST api/PostItem
        [HttpPost]
        public IActionResult Post([FromBody]PostItem value)
        {
            //todo:
            //Add validations and other stuff

            return new ObjectResult(Repo.AddPost(value));
        }

        // PUT api/PostItem/5
        [HttpPut("{id}")]
        public IActionResult Put(Guid id, [FromBody]PostItem value)
        {
            //todo:
            //Add validations and other stuff

            return new ObjectResult(Repo.UpdatePost(value));
        }

        // DELETE api/PostItem/5
        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id)
        {
            //todo:
            //Add validations and other stuff

            return new ObjectResult(Repo.DeletePostById(id));
        }       
    }
}
