using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using FullStackApp.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace FullStackApp.Services
{
    public class AuthService : IAuthService
    {
        private readonly IConfiguration _configuration;
        
        public AuthService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
            }
        }

        public bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != passwordHash[i])
                    {
                        return false;
                    }
                }
                return true;
            }
        }

        public string CreateToken(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Username)
            };

            //var tokenDescriptor = new SecurityTokenDescriptor
            //{
            //    Subject = new ClaimsIdentity(claims),
            //    Expires = DateTime.Now.AddDays(7),
            //    SigningCredentials = creds
            //};

            //var tokenHandler = new JwtSecurityTokenHandler();
            //var token = tokenHandler.CreateToken(tokenDescriptor);
            //return tokenHandler.WriteToken(token);
            var token = GenerateJwtToken(claims);
            return new JwtSecurityTokenHandler().WriteToken(token);

            
        }
        private JwtSecurityToken GenerateJwtToken(List<Claim> claims)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["AppSettings:Token"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var expire = DateTime.Now.AddMinutes(180);
            var token = new JwtSecurityToken(
                issuer: _configuration["AppSettings:Issuer"], // Optional if ValidateIssuer = false
                audience: _configuration["AppSettings:Audience"], // Optional if ValidateAudience = false
                claims: claims,
                expires: expire,
                signingCredentials: credentials
            );

            return token;

        }

    }
}