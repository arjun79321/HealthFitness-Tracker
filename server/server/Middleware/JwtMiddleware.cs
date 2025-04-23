// Middleware/JwtMiddleware.cs
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace FullStackApp.Middleware
{
    public class JwtMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly IConfiguration _configuration;

        public JwtMiddleware(RequestDelegate next, IConfiguration configuration)
        {
            _next = next;
            _configuration = configuration;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

            if (!string.IsNullOrEmpty(token))
            {
                AttachUserToContext(context, token);
            }

            await _next(context);
        }

        private void AttachUserToContext(HttpContext context, string token)
        {
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                
                // Ensure token key exists in configuration
                var tokenKey = _configuration["AppSettings:Token"];
                if (string.IsNullOrEmpty(tokenKey))
                {
                    throw new Exception("JWT Token key is not configured properly.");
                }

                var key = Encoding.ASCII.GetBytes(tokenKey);

                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ClockSkew = TimeSpan.Zero // Ensure immediate expiration
                }, out SecurityToken validatedToken);

                var jwtToken = (JwtSecurityToken)validatedToken;

                // Try using 'sub' claim first, fallback to 'nameid'
                var userIdClaim = jwtToken.Claims.FirstOrDefault(x => x.Type == JwtRegisteredClaimNames.Sub) 
                               ?? jwtToken.Claims.FirstOrDefault(x => x.Type == "nameid");

                if (userIdClaim != null && int.TryParse(userIdClaim.Value, out int userId))
                {
                    // Attach user ID to context on successful JWT validation
                    context.Items["UserId"] = userId;
                }
            }
            catch (Exception ex)
            {
                // Log the error if needed
                Console.WriteLine($"JWT validation failed: {ex.Message}");
                // Do nothing; request proceeds without user attached
            }
        }
    }
}
