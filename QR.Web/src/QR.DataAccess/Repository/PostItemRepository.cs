using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using QR.Common.Resources;
using QR.DataAccess.DataSource;
using QR.Models;
using QR.Models.Helpers;

namespace QR.DataAccess.Repository
{
    public class PostItemRepository : IPostItemRepository
    {
        private DocumentDbDataSource _db;
        private string dbName;
        private string collectionName;

        public PostItemRepository()
        {
            var config = AppConfig.Instance;
            _db = new DocumentDbDataSource(config.DocDbEndpointUri, config.DocDbPrimaryKey);
            dbName = config.DocDbDatabaseName;
            collectionName = config.DocDbCollectionName;

            ValidateDbAndCollectionExists(dbName, collectionName);            
        }

        private async void ValidateDbAndCollectionExists(string db, string collection)
        {
            await _db.CreateDatabaseIfNotExists(db);
            await _db.CreateDocumentCollectionIfNotExists(dbName,collection);
        }

        public async Task<Guid> AddPost(PostItem item)
        {
            item.PostId = Guid.NewGuid();
            item.Upvotes = 0;
            item.Views = 0;
            item.CreatedOn = DateTime.UtcNow;
            item.ModifiedOn = DateTime.UtcNow;
           
            await _db.CreateDocumentAsync<PostItem>(dbName, collectionName, item);
            return item.PostId;
        }

        public IEnumerable<PostItem> GetAllPosts()
        {
            var items = _db.GetDocuments(dbName, collectionName);
            return items;
        }

        public IEnumerable<PostItem> GetAllPostByAuthor(string author)
        {
            string query = $"select * from {collectionName} p where p.Author = '{author}'";
            return _db.ExecuteQuery<PostItem>(dbName, collectionName, query);
        }

        public IEnumerable<PostItem> GetAllPostByCategory(string category)
        {
            string query = $"select * from {collectionName} p where Array_Contains(p.Categories,{(int)Utils.GetEnumIntValue<Category>(category)})";
            return _db.ExecuteQuery<PostItem>(dbName, collectionName, query);
        }

        public IEnumerable<PostItem> GetAllPostByTag(string tag)
        {
            string query = $"select * from {collectionName} p where Array_Contains(p.Tags,{(int)Utils.GetEnumIntValue<Tag>(tag)})";
            return _db.ExecuteQuery<PostItem>(dbName, collectionName, query);
        }

        public IEnumerable<PostItem> GetAllPostByTitleText(string titletext)
        {
            string query = $"select * from {collectionName} p where Contains(Lower(p.Title),'{titletext.ToLower()}')";
            return _db.ExecuteQuery<PostItem>(dbName, collectionName, query);
        }

        public async Task<PostItem> FindPostById(Guid id)
        {
            var item = _db.GetDocumentById(dbName, collectionName, id);
            if (item != null)
            {
                item.Views++;
                await _db.UpdateDocumentByIdAsync(dbName, collectionName,id, item);
            }
            return item;
        }        

        public async Task<Guid> UpdatePost(PostItem item)
        {
            var oldId = item.PostId;
            item.ModifiedOn = DateTime.UtcNow;
            item.PostId = Guid.NewGuid();
            var result = await _db.UpdateDocumentByIdAsync(dbName, collectionName, oldId, item);
            if (result)
                return item.PostId;

            return Guid.Empty;
        }
        public async Task<bool> DeletePostById(Guid id)
        {
            return await _db.DeleteDocumentByIdAsync(dbName, collectionName, id);
        }
    }
}
