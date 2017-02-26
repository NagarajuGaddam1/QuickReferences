using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace QR.Web.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {

            ValuesController.PostDetails.PostDetailsPresent = false;
            ViewData["_IS_POST_SPECIFIC"] = ValuesController.PostDetails.PostDetailsPresent;
            ViewData["_IS_CATEGORY_SPECIFIC"] = false;
            ViewData["_CATEGORY"] = "";
            if (HttpContext.Request.QueryString.HasValue)
            {
                if (HttpContext.Request.Query["category"].ToString() != null)
                {
                    ViewData["_IS_CATEGORY_SPECIFIC"] = true;
                    ViewData["_CATEGORY"] = HttpContext.Request.Query["category"].ToString();

                }
            }
            return View();

        }        

        public IActionResult Post()
        {
            ValuesController.PostDetails.PostDetailsPresent = false;
            if (HttpContext.Request.QueryString.HasValue)
            {
                if (HttpContext.Request.Query["id"].ToString() != null)
                {
                    ValuesController.PostDetails.PostUID = HttpContext.Request.Query["id"].ToString();
                    ValuesController.PostDetails.PostDetailsPresent = true;
                }
                if (HttpContext.Request.Query["name"].ToString() != null)
                {
                    ValuesController.PostDetails.PostName = HttpContext.Request.Query["name"].ToString();
                    ValuesController.PostDetails.PostDetailsPresent = true;
                }
            }
            ViewData["_IS_POST_SPECIFIC"] = ValuesController.PostDetails.PostDetailsPresent;
            return View();
        }

        public IActionResult Error()
        {
            return View();
        }
    }

    public class ValuesController : Controller
    {

        public static class PostDetails
        {
            private static bool _postDataReceived;
            public static bool PostDetailsPresent
            {
                get
                {
                    return _postDataReceived;
                }
                set
                {
                    _postDataReceived = value;
                }
            }
            private static string _postUID;
            public static string PostUID
            {
                get
                {
                    return _postUID;
                }
                set
                {
                    _postUID = value;
                }
            }

            private static string _postName;
            public static string PostName
            {
                get
                {
                    return _postName;
                }
                set
                {
                    _postName = value;
                }
            }
        }
        public JsonResult GetPostDetailsIfAvailable()
        {
            if (PostDetails.PostDetailsPresent == true)
            {
                Dictionary<String, String> _def = new Dictionary<string, string>();
                _def.Add("PostUID", PostDetails.PostUID);
                _def.Add("PostName", PostDetails.PostName);
                Response.StatusCode = (int)HttpStatusCode.OK;
                return Json(_def);
            }
            else
            {
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json("POST INAVLID : POST UID INVALID");
            }
        }
    }
}
