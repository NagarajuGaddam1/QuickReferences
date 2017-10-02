using QR.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QR.DataAccess.Repository
{
    public interface IAuthorItemRepository
    {
        Task<Guid?> AddAuthor(AuthorItem item);
        IEnumerable<AuthorItemResponse> GetAllAuthors();
        AuthorMapForPost GetAuthorMapForPost(Guid id);
        AuthorItemResponse FindAuthorByAuthSource(AuthenticationType authType, string sourceId);
        AuthorItemResponse FindAuthorById(Guid id);
        AuthorItemResponse FindAuthorByAlias(string alias);
        Task<bool> DeleteAuthorById(Guid id);
        Task<Guid?> UpdateAuthor(AuthorItemResponse item);
    }
}
