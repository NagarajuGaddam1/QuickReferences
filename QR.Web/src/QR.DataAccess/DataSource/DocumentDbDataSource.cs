using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net;
using Microsoft.Azure.Documents;
using Microsoft.Azure.Documents.Client;
using Microsoft.Azure.Documents.Linq;
using Microsoft.Azure.Documents.Spatial;
using Newtonsoft.Json;
using QR.Common.Resources;
using QR.Models;

namespace QR.DataAccess.DataSource
{
    public class DocumentDbDataSource
    {
        private AppConfig config;
        private string endpointUri; 
        private string primaryKey;
        private DocumentClient client;

        public DocumentClient Client
        {
            get { return client ?? (client = new DocumentClient(new Uri(endpointUri), primaryKey)); }
            set { client = value; }
        }            
        
        public DocumentDbDataSource()
        {
            endpointUri = config.DocDbEndpointUri;
            primaryKey = config.DocDbPrimaryKey;
            client = new DocumentClient(new Uri(endpointUri), primaryKey);
        }

        public DocumentDbDataSource(string endpointuri, string primarykey)
        {
            endpointUri = endpointuri;
            primaryKey = primarykey;
            client = new DocumentClient(new Uri(endpointUri), primaryKey);
        }

        public async Task CreateDatabaseIfNotExists(string databaseName)
        {
            // Check to verify a database with the id=FamilyDB does not exist
            try
            {
                await client.ReadDatabaseAsync(UriFactory.CreateDatabaseUri(databaseName));
            }
            catch (DocumentClientException de)
            {
                // If the database does not exist, create a new database
                if (de.StatusCode == HttpStatusCode.NotFound)
                {
                    await client.CreateDatabaseAsync(new Database { Id = databaseName });
                }
                else
                {
                    throw;
                }
            }
        }        

        public async Task CreateDocumentCollectionIfNotExists(string databaseName, string collectionName)
        {
            try
            {
                await this.client.ReadDocumentCollectionAsync(UriFactory.CreateDocumentCollectionUri(databaseName, collectionName));
            }
            catch (DocumentClientException de)
            {
                // If the document collection does not exist, create a new collection
                if (de.StatusCode == HttpStatusCode.NotFound)
                {
                    DocumentCollection collectionInfo = new DocumentCollection();
                    collectionInfo.Id = collectionName;

                    // Configure collections for maximum query flexibility including string range queries.
                    collectionInfo.IndexingPolicy = new IndexingPolicy(new RangeIndex(DataType.String) { Precision = -1 });

                    // Here we create a collection with 400 RU/s.
                    await this.client.CreateDocumentCollectionAsync(
                        UriFactory.CreateDatabaseUri(databaseName),
                        collectionInfo,
                        new RequestOptions { OfferThroughput = 400 });
                }
                else
                {
                    throw;
                }
            }
        }
        
        public async Task CreateDocumentAsync<T>(string dbName, string collectionName, T item)
        {
            await client.CreateDocumentAsync(UriFactory.CreateDocumentCollectionUri(dbName, collectionName), item);
        }        

        public IEnumerable<T> ExecuteQuery<T>(string databaseName, string collectionName, string query)
        {
            if (!string.IsNullOrEmpty(query))
            {
                var queryOptions = new FeedOptions {MaxItemCount = -1, EnableCrossPartitionQuery = true};
                return client.CreateDocumentQuery<T>(UriFactory.CreateDocumentCollectionUri(databaseName, collectionName), query, queryOptions);
            }
            return null;
        }

        public async Task CreateDocumentIfNotExists<T>(string databaseName, string collectionName, T objectToStore, string uid)
        {
            try
            {
                await client.ReadDocumentAsync(UriFactory.CreateDocumentUri(databaseName, collectionName, uid));
            }
            catch (DocumentClientException de)
            {
                if (de.StatusCode == HttpStatusCode.NotFound)
                {
                    await client.CreateDocumentAsync(UriFactory.CreateDocumentCollectionUri(databaseName, collectionName), objectToStore);
                }
                else
                {
                    throw;
                }
            }
        }

        public PostItem GetDocumentById(string dbName, string collectionName, Guid id)
        {
            var queryOptions = new FeedOptions { MaxItemCount = -1, EnableCrossPartitionQuery = true };
            var item = client.CreateDocumentQuery<PostItem>(UriFactory.CreateDocumentCollectionUri(dbName, collectionName), queryOptions).Where(x => x.PostId == id).AsEnumerable().FirstOrDefault();
            return item;
        }

        public IEnumerable<PostItem> GetDocuments(string dbName, string collectionName)
        {
            var queryOptions = new FeedOptions { MaxItemCount = -1, EnableCrossPartitionQuery = true };
            return client.CreateDocumentQuery<PostItem>(UriFactory.CreateDocumentCollectionUri(dbName, collectionName), queryOptions).AsEnumerable();
        }

        public async Task<bool> DeleteDocumentByIdAsync(string dbName, string collectionName, Guid id)
        {
            var queryOptions = new FeedOptions { MaxItemCount = -1, EnableCrossPartitionQuery = true };
            var item = client.CreateDocumentQuery<PostItem>(UriFactory.CreateDocumentCollectionUri(dbName, collectionName), queryOptions).Where(x => x.PostId == id).AsEnumerable().FirstOrDefault();
            await client.DeleteDocumentAsync(item.SelfLink);
            return true;
        }

        public async Task<bool> UpdateDocumentByIdAsync(string dbName, string collectionName, Guid id, PostItem newPost)
        {
            var queryOptions = new FeedOptions { MaxItemCount = -1, EnableCrossPartitionQuery = true };
            var item = client.CreateDocumentQuery<PostItem>(UriFactory.CreateDocumentCollectionUri(dbName, collectionName), queryOptions).Where(x => x.PostId == id).AsEnumerable().FirstOrDefault();
            await client.ReplaceDocumentAsync(item.SelfLink,newPost);
            return true;
        }
    }
}
