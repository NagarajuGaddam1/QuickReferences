using Microsoft.AspNetCore.Mvc;
using QR.Models;
using System;
using System.Threading.Tasks;

namespace QR.Web.Services
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
