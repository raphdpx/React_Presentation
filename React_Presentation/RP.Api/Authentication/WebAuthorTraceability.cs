using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using NsiTools.EfUtils.Core.Interfaces;

namespace RP.Api.Authentication
{
    public class WebAuthorTraceability : IAuthorTraceability
    {
        private readonly IHttpContextAccessor _contextAccessor;

        public WebAuthorTraceability(IHttpContextAccessor contextAccessor)
        {
            _contextAccessor = contextAccessor;
        }

        public string GetUserName()
        {
            var userName = "user_TEST";
            return userName;
        }

        public int? GetUserId()
        {
            var userId = 1;
            return userId;
        }
    }
}
