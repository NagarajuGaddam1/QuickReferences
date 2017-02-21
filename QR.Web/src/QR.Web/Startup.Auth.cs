using AspNet.Security.OAuth.GitHub;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OAuth;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Threading.Tasks;

namespace QR.Web
{
    public partial class Startup
    {

        public void ConfigureAuthServices(IServiceCollection services)
        {
            // Add framework services.
            services.AddAuthentication(options =>
            {
                options.SignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
            });            
        }           

        public void ConfigureAuth(IApplicationBuilder app)
        {
            app.UseCookieAuthentication(new CookieAuthenticationOptions
            {
                AutomaticAuthenticate = true,
                AutomaticChallenge = true,
                LoginPath = new PathString("/signin"),
                LogoutPath = new PathString("/signout")
            });

            app.UseGitHubAuthentication(new GitHubAuthenticationOptions
            {
                ClientId = "0919e0ecf2d44af4a8c3",
                ClientSecret = "65d50cdf81cd526d6a8e9315f7e562ad565bf604",
                Scope = {
                    "user",
                    "user:email"
                },
                TokenEndpoint = "https://github.com/login/oauth/access_token",
                SaveTokens = true,
                UserInformationEndpoint = "https://api.github.com/user",
                Events = new OAuthEvents
                {
                    OnCreatingTicket = async context => { await CreateGitHubAuthTicket(context); }
                }
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
        }
    }
}
