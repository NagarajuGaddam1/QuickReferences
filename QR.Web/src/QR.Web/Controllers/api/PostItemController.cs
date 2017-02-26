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

        // GET: api/values
        [HttpGet]
        public IEnumerable<PostItem> Get()
        {
            //todo:
            //Add validations and other stuff

            return Repo.GetAllPosts();
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public PostItem Get(ulong id)
        {
            //todo:
            //Add validations and other stuff

            return Repo.FindPostById(id);
        }

        // POST api/values
        [HttpPost]
        public IActionResult Post([FromBody]PostItem value)
        {
            //todo:
            //Add validations and other stuff

            return new ObjectResult(Repo.AddPost(value));
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public IActionResult Put(ulong id, [FromBody]PostItem value)
        {
            //todo:
            //Add validations and other stuff

            return new ObjectResult(Repo.UpdatePost(value));
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public IActionResult Delete(ulong id)
        {
            //todo:
            //Add validations and other stuff

            return new ObjectResult(Repo.DeletePostById(id));
        }
    }
}
