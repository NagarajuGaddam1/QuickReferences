using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using QR.Models;
using QR.DataAccess.DataSource;
using QR.Common.Resources;

namespace QR.DataAccess.Repository
{
    public class AuthorItemRepository : IAuthorItemRepository
    {

        private DocumentDbDataSource _db;
        private string dbName;
        private string collectionName;

        public AuthorItemRepository()
        {
            var config = AppConfig.Instance;
            _db = new DocumentDbDataSource(config.DocDbEndpointUri, config.DocDbPrimaryKey);
            dbName = config.DocDbDatabaseName;
            collectionName = config.DocDbCollectionNameForAuthors;

            ValidateDbAndCollectionExists(dbName, collectionName);
        }

        private async void ValidateDbAndCollectionExists(string db, string collection)
        {
            await _db.CreateDatabaseIfNotExists(db);
            await _db.CreateDocumentCollectionIfNotExists(dbName, collection);
        }

        public async Task<Guid?> AddAuthor(AuthorItem item)
        {
            try
            {
                var _authorExists = FindAuthorByAuthSource(item.AuthType, item.SourceId);
                if (_authorExists != null)
                    return Guid.Empty;
                else
                {
                    item.AuthorId = Guid.NewGuid();
                    item.CreatedOn = DateTime.UtcNow;
                    item.ModifiedOn = DateTime.UtcNow;
                    item.AuthType = AuthenticationType.GITHUB;
                    item.ActivatedOn = DateTime.UtcNow;
                    item.IsSuspended = false;
                    await _db.CreateDocumentAsync<AuthorItem>(dbName, collectionName, item);
                    return item.AuthorId;
                }
            }
            catch (Exception e)
            {
                return Guid.Empty;
            }
        }

        public async Task<bool> DeleteAuthorById(Guid id)
        {
            return await _db.DeleteDocumentByIdAsync<AuthorItemResponse>(dbName, collectionName, id);
        }

        public AuthorItemResponse FindAuthorById(Guid id)
        {
            return _db.GetDocumentById<AuthorItemResponse>(dbName, collectionName, id);
        }

        public IEnumerable<AuthorItemResponse> GetAllAuthors()
        {
            return _db.GetDocuments<AuthorItemResponse>(dbName, collectionName);
        }

        public AuthorMapForPost GetAuthorMapForPost(Guid id)
        {
            var item = FindAuthorById(id);
            AuthorMapForPost response = new AuthorMapForPost()
            {
                Alias = item.Alias,
                AuthorDocumentId = item.id,
                ImgSrc = item.ImgSrc
            };
            return response;
        }

        public async Task<Guid?> UpdateAuthor(AuthorItemResponse item)
        {
            var oldId = item.AuthorId;
            item.ModifiedOn = DateTime.UtcNow;
            item.AuthorId = Guid.NewGuid();
            var result = await _db.UpdateDocumentByIdAsync<AuthorItemResponse>(dbName, collectionName, item.id, item);
            if (result) return item.AuthorId;
            return Guid.Empty;
        }

        public AuthorItemResponse FindAuthorByAuthSource(AuthenticationType authType, string sourceId)
        {
            string query = $"select * from {collectionName} author where author.AuthType ={ (int) authType } and author.SourceId = '{sourceId}'";
            var result = _db.ExecuteQuery<AuthorItemResponse>(dbName, collectionName, query);
            if (result.Count() == 0)
            {
                return null;
            }
            else if (result.Count() > 1)
            {
                return null;
            }
            else return result.FirstOrDefault();
        }

        public AuthorItemResponse FindAuthorByAlias(string alias)
        {
            string query = $"select * from {collectionName} author where author.Alias = '{alias}'";
            var result = _db.ExecuteQuery<AuthorItemResponse>(dbName, collectionName, query);
            if (result.Count() == 0)
            {
                return null;
            }
            else if (result.Count() > 1)
            {
                return null;
            }
            else return result.FirstOrDefault();
        }
    }
}
