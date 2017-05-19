using System;
using Microsoft.AspNetCore.Mvc;
using QR.DataAccess.Repository;
using QR.Models;
using QR.Web.Filters;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace QR.Web.Controllers.api
{

    [Route("api/[controller]")]
    public class AuthorItemController : Controller
    {

        public IAuthorItemRepository Repo { get; set; }
        public AuthorItemController(IAuthorItemRepository repository)
        {
            Repo = repository;
        }

        // GET: api/values
        [HttpGet]
        [AdminAuthorized]
        public IActionResult Get()
        {
            return Json(Repo.GetAllAuthors());
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public IActionResult Get(Guid id)
        {
            return Json(Repo.FindAuthorById(id));
        }

        // POST api/values
        [HttpPost]
        [AdminAuthorized]
        public IActionResult Post([FromBody]AuthorItem value)
        {
            return Json(Repo.AddAuthor(value));
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        [AdminAuthorized]
        public IActionResult Put(Guid id, [FromBody]AuthorItemResponse value)
        {
            return Json(Repo.UpdateAuthor(value));
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        [AdminAuthorized]
        public IActionResult Delete(Guid id)
        {
            return Json(Repo.DeleteAuthorById(id));
        }
    }
}
