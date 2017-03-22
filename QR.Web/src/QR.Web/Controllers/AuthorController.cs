using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.IO;
using QR.Common.Resources;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace QR.Web.Controllers
{
    public class AuthorController : Controller
    {        
        public IActionResult Index()
        {
            if (AppConfig.Instance.AuthEnableAdminAuth && HttpContext.User.Identity.IsAuthenticated == false)
                return Redirect("~/signin");
            else
                return View();
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
