using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using QR.Models;
using QR.DataAccess.Repository;
using QR.Web.Filters;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace QR.Web.Controllers.api
{
    [Route("api/[controller]")]
    public class PostItemController : Controller
    {
        public IPostItemRepository Repo { get; set; }
        public IAuthorItemRepository AuthorRepo { get; set; }
        public PostItemController(IPostItemRepository repository, IAuthorItemRepository authorRepository)
        {
            Repo = repository;
            AuthorRepo = authorRepository;
        }

        // GET: api/PostItem
        [HttpGet]        
        public IActionResult Get()
        {
            //todo:
            //Add validations and other stuff
            return Json(Repo.GetAllPosts());
        }

        // GET api/PostItem/someguid
        [HttpGet("{id}")]
        public IActionResult Get(Guid id)
        {
            //todo:
            //Add validations and other stuff

            return Json(Repo.FindPostById(id).Result);
        }

        [HttpGet("authors/{author}")]
        public IActionResult SearchByAuthor(string author)
        {
            //todo:
            //Add validations and other stuff

            return Json(Repo.GetAllPostByAuthor(author));
        }

        [HttpGet("tags/{tag}")]
        public IActionResult SearchByTag(string tag)
        {
            //todo:
            //Add validations and other stuff

            return Json(Repo.GetAllPostByTag(tag));
        }

        [HttpGet("categories/{category}")]
        public IActionResult SearchByCategory(string category)
        {
            //todo:
            //Add validations and other stuff

            return Json(Repo.GetAllPostByCategory(category));
        }

        [HttpGet("title/{title}")]
        public IActionResult SearchByTitle(string title)
        {
            //todo:
            //Add validations and other stuff

            return Json(Repo.GetAllPostByTitleText(title));
        }

        // POST api/PostItem
        [HttpPost]
        [AdminAuthorized]
        public IActionResult Post([FromBody]PostItem value)
        {
            //todo:
            //Add validations and other stuff
            var author = AuthorRepo.FindAuthorByAlias(value.Author.Alias);
            var authorMap = new AuthorMapForPost()
            {
                Alias = author.Alias,
                AuthorDocumentId  = author.id,
                ImgSrc = author.ImgSrc
            };
            return Json(Repo.AddPost(value, authorMap));
        }

        // PUT api/PostItem/5
        [HttpPut("{id}")]
        [AdminAuthorized]
        public IActionResult Put(Guid id, [FromBody]PostItemResponse value)
        {
            //todo:
            //Add validations and other stuff
            return Json(Repo.UpdatePost(value));
        }

        // DELETE api/PostItem/5
        [HttpDelete("{id}")]
        [AdminAuthorized]
        public IActionResult Delete(Guid id)
        {
            //todo:
            //Add validations and other stuff

            return Json(Repo.DeletePostById(id));
        }
    }
}
