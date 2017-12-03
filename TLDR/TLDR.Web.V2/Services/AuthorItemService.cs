using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TLDR.Models;
using TLDR.DataAccess.Repository;

namespace TLDR.Web.V2.Services
{
    public class AuthorItemService : IAuthorItemService
    {
        public IAuthorItemRepository Repo { get; set; }
        public AuthorItemService(IAuthorItemRepository repository)
        {
            Repo = repository;
        }
        public async Task<IActionResult> CreateAuthor(AuthorItem value)
        {
            var authorId = await Repo.AddAuthor(value);
            if (authorId != Guid.Empty)
            {
                return new OkObjectResult(authorId);
            }
            else
                return new BadRequestResult();
        }

        public async Task<IActionResult> DeleteAuthor(Guid id)
        {
            var result = await Repo.DeleteAuthorById(id);
            if (result)
                return new OkResult();
            else
                return new BadRequestResult();
        }

        public IActionResult GetAllAuthors()
        {
            var authors = Repo.GetAllAuthors();
            return new OkObjectResult(authors);
        }

        public IActionResult GetAuthorById(Guid id)
        {
            var author = Repo.FindAuthorById(id);
            if (author == null)
            {
                return new BadRequestResult();
            }
            else
            {
                return new OkObjectResult(author);
            }
        }

        public async Task<IActionResult> UpdateAuthor(AuthorItemResponse value)
        {
            var updatedAuthorId = await Repo.UpdateAuthor(value);
            if (updatedAuthorId != Guid.Empty)
            {
                return new OkObjectResult(updatedAuthorId);
            }
            else {
                return new BadRequestResult();
            }
        }
    }
}
