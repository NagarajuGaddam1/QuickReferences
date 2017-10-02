using AspNet.Security.OAuth.GitHub;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OAuth;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Threading.Tasks;
using TLDR.Common.Resources;

namespace TLDR.Web
{
    public partial class Startup
    {

        public void ConfigureAuthServices(IServiceCollection services)
        {
            // Add framework services.
            services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
                .AddCookie(o =>
                {
                    o.LoginPath = new PathString("/login");
                    o.LogoutPath = new PathString("/logout");
                })
                .AddOAuth("GitHub", "Github", o =>
                {
                    o.ClientId = AppConfig.Instance.GitHubCredClientId;
                    o.ClientSecret = AppConfig.Instance.GitHubCredClientSecret;
                    o.CallbackPath = new PathString("/signin-github");
                    o.AuthorizationEndpoint = "https://github.com/login/oauth/authorize";
                    o.TokenEndpoint = "https://github.com/login/oauth/access_token";
                    o.UserInformationEndpoint = "https://api.github.com/user";
                    o.ClaimsIssuer = "OAuth2-Github";
                    o.SaveTokens = true;
                    o.Events = new OAuthEvents
                    {
                        OnCreatingTicket = async context => { await CreateGitHubAuthTicket(context); }
                    };
                });
        }

        private static async Task CreateGitHubAuthTicket(OAuthCreatingTicketContext context)
        {
            var request = new HttpRequestMessage(HttpMethod.Get, context.Options.UserInformationEndpoint);
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", context.AccessToken);
            request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            var response = await context.Backchannel.SendAsync(request, context.HttpContext.RequestAborted);
            response.EnsureSuccessStatusCode();
            var user = JObject.Parse(await response.Content.ReadAsStringAsync());
            AddClaims(context, user);
        }

        private static void AddClaims(OAuthCreatingTicketContext context, JObject user)
        {
            var avatar = user.Value<string>("avatar_url");
            if (!string.IsNullOrEmpty(avatar))
            {
                context.Identity.AddClaim(new Claim(
                    "urn:github:avatar_url", avatar,
                    ClaimValueTypes.String, context.Options.ClaimsIssuer));
            }

            var name = user.Value<string>("name");
            if (!string.IsNullOrEmpty(name))
            {
                context.Identity.AddClaim(new Claim(
                    "urn:github:name", name,
                    ClaimValueTypes.String, context.Options.ClaimsIssuer));
            }
            var login = user.Value<string>("login");
            if (!string.IsNullOrEmpty(login))
            {
                context.Identity.AddClaim(new Claim(
                    "urn:github:login", login,
                    ClaimValueTypes.String, context.Options.ClaimsIssuer));
            }
            var email = user.Value<string>("email");
            if (!string.IsNullOrEmpty(email))
            {
                context.Identity.AddClaim(new Claim(
                    "urn:github:email", email,
                    ClaimValueTypes.String, context.Options.ClaimsIssuer));
            }
        }
    }
}
