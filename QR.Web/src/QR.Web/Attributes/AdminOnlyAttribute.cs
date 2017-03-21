﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Routing;
using QR.Common.Resources;

namespace QR.Web.Filters
{
    public class AdminOnly : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            var _readFromConfig = AppConfig.Instance.AuthEnableAdminAuth;
            if (!_readFromConfig)
                base.OnActionExecuting(context);
            else
            {
                var _isAuthenticated = ((DefaultHttpContext)context.HttpContext).User.Identity.IsAuthenticated;
                if (_isAuthenticated)
                    base.OnActionExecuting(context);
                else
                    context.Result = new RedirectToRouteResult(new RouteValueDictionary { { "controller", "Author" }, { "action", "Error" } });
            }
        }
    }
}