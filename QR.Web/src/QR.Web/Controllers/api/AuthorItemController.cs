using System;
using Microsoft.AspNetCore.Mvc;
using QR.DataAccess.Repository;
using QR.Models;
using QR.Web.Filters;
using QR.Web.Services;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace QR.Web.Controllers.api
{

    [Route("api/[controller]")]
    public class AuthorItemController : Controller
    {

        public IAuthorItemService AuthorService { get; set; }
        public AuthorItemController(IAuthorItemService service)
        {
            AuthorService = service;
        }

        // GET: api/values
        [HttpGet]
        [AdminAuthorized]
        public IActionResult Get()
        {
            return AuthorService.GetAllAuthors();
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public IActionResult Get(Guid id)
        {
            return AuthorService.GetAuthorById(id);
        }

        // POST api/values
        [HttpPost]
        [AdminAuthorized]
        public Task<IActionResult> Post([FromBody]AuthorItem value)
        {
            return AuthorService.CreateAuthor(value);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        [AdminAuthorized]
        public Task<IActionResult> Put(Guid id, [FromBody]AuthorItemResponse value)
        {
            return AuthorService.UpdateAuthor(value);
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        [AdminAuthorized]
        public Task<IActionResult> Delete(Guid id)
        {
            return AuthorService.DeleteAuthor(id);
        }
    }
}
