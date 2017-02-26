using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using QR.Models;

namespace QR.DataAccess.Repository
{
    public class PostItemRepository : IPostItemRepository
    {
        public ulong AddPost(PostItem item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<PostItem> GetAllPosts()
        {
            throw new NotImplementedException();
        }

        public IEnumerable<PostItem> GetAllPostByAuthoe(string author)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<PostItem> GetAllPostByCategory(string category)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<PostItem> GetAllPostByTagEnumerable(string tag)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<PostItem> GetAllPostByTitleText(string titletext)
        {
            throw new NotImplementedException();
        }

        public PostItem FindPostById(ulong id)
        {
            throw new NotImplementedException();
        }        

        public ulong UpdatePost(PostItem item)
        {
            throw new NotImplementedException();
        }
        public bool DeletePostById(ulong id)
        {
            throw new NotImplementedException();
        }
    }
}
