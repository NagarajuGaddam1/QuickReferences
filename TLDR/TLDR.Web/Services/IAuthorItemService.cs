using Microsoft.AspNetCore.Mvc;
using TLDR.Models;
using System;
using System.Threading.Tasks;

namespace TLDR.Web.Services
{
    public interface IAuthorItemService
    {
        IActionResult GetAuthorById(Guid id);
        IActionResult GetAllAuthors();
        Task<IActionResult> CreateAuthor(AuthorItem value);
        Task<IActionResult> UpdateAuthor(AuthorItemResponse value);
        Task<IActionResult> DeleteAuthor(Guid id);
    }
}
