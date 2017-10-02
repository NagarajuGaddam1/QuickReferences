using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
using System.Net;
using System.Security.Claims;
using System.Threading.Tasks;
using TLDR.Common.Resources;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace TLDR.Web.Controllers
{
    public class AuthorController : Controller
    {        
        public IActionResult Index()
        {
            if (AppConfig.Instance.AuthEnableAdminAuth && HttpContext.User.Identity.IsAuthenticated)
            {
                if (HttpContext.User.Identity.AuthenticationType == "OAuth2-Github")
                {
                    if (HttpContext.User.HasClaim(x => x.Type == "urn:github:login"))
                    {
                        var _gitHubUID = (HttpContext.User.Identity as ClaimsIdentity)?.FindFirst("urn:github:login");
                        if (_gitHubUID != null)
                        {
                            var _exists = AppConfig.Instance.Admins.Contains(_gitHubUID.Value);
                            if (_exists)
                                return View();
                        }
                    }
                }
            }
            return Redirect("~/login");
        }

        public IActionResult Error()
        {
            return View();
        }

        public async Task<JsonResult> GetTextFileContents()
        {
            try
            {
                string content = "";
                string _path = @"wwwroot/samples/sample.txt";
                byte[] result;

                using (FileStream SourceStream = System.IO.File.Open(_path, FileMode.Open))
                {
                    result = new byte[SourceStream.Length];
                    await SourceStream.ReadAsync(result, 0, (int)SourceStream.Length);
                }

                content = System.Text.Encoding.ASCII.GetString(result);
                Response.StatusCode = (int)HttpStatusCode.OK;
                return Json(content);
            }
            catch (Exception e)
            {
                Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                return Json(e.Message);
            }
        }
    }
}
