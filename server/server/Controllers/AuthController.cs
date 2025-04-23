using System;
using System.Security.Claims;
using System.Threading.Tasks;
using FullStackApp.Data;
using FullStackApp.Models;
using FullStackApp.Models.DTOs;
using FullStackApp.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FullStackApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IAuthService _authService;

        public AuthController(ApplicationDbContext context, IAuthService authService)
        {
            _context = context;
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(UserRegisterDto request)
        {
            if (await UserExists(request.Username))
                return BadRequest("Username already exists");

            if (await EmailExists(request.Email))
                return BadRequest("Email already exists");

            _authService.CreatePasswordHash(request.Password, out byte[] passwordHash, out byte[] passwordSalt);

            var user = new User
            {
                Username = request.Username,
                Email = request.Email,
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt,
                FirstName = request.FirstName,
                LastName = request.LastName,
                Weight = request.Weight,
                Height = request.Height,
                DateOfBirth = request.DateOfBirth,
                Gender = request.Gender,
                CreatedAt = DateTime.UtcNow
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            var userDto = new UserDto
            {
                Id = user.Id,
                Username = user.Username,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Weight = user.Weight,
                Height = user.Height,
                DateOfBirth = user.DateOfBirth,
                Gender = user.Gender,
                CreatedAt = user.CreatedAt,
                UpdatedAt = user.UpdatedAt
            };

            return Ok(new 
            { 
                User = userDto,
                Token = _authService.CreateToken(user)
            });
        }

        [HttpPost("login")]
        public async Task<ActionResult<string>> Login(UserLoginDto request)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username.ToLower() == request.Username.ToLower());

            if (user == null)
                return Unauthorized("Invalid username or password");

            if (!_authService.VerifyPasswordHash(request.Password, user.PasswordHash, user.PasswordSalt))
                return Unauthorized("Invalid username or password");

            var userDto = new UserDto
            {
                Id = user.Id,
                Username = user.Username,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Weight = user.Weight,
                Height = user.Height,
                DateOfBirth = user.DateOfBirth,
                Gender = user.Gender,
                CreatedAt = user.CreatedAt,
                UpdatedAt = user.UpdatedAt
            };

            return Ok(new 
            { 
                User = userDto,
                Token = _authService.CreateToken(user)
            });
        }

        
       [HttpGet("user"), Authorize]
public async Task<ActionResult<UserDto>> GetCurrentUser()
{
    var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
    if (string.IsNullOrEmpty(userId))
    {
        return Unauthorized("Invalid token");
    }
    
    var userIdInt = int.Parse(userId);
    var user = await _context.Users.FindAsync(userIdInt);

    if (user == null)
        return NotFound();

    var userDto = new UserDto
    {
        Id = user.Id,
        Username = user.Username,
        Email = user.Email,
        FirstName = user.FirstName,
        LastName = user.LastName,
        Weight = user.Weight,
        Height = user.Height,
        DateOfBirth = user.DateOfBirth,
        Gender = user.Gender,
        CreatedAt = user.CreatedAt,
        UpdatedAt = user.UpdatedAt
    };

    return Ok(userDto);
}


       [HttpPut("user"), Authorize]
public async Task<ActionResult> UpdateUser(UserUpdateDto request)
{
    var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
    if (string.IsNullOrEmpty(userId))
    {
        return Unauthorized("Invalid token");
    }
    
    var userIdInt = int.Parse(userId);
    var user = await _context.Users.FindAsync(userIdInt);

    if (user == null)
        return NotFound();

    // Only update fields that are provided
    if (!string.IsNullOrEmpty(request.Email) && request.Email != user.Email)
    {
        if (await _context.Users.AnyAsync(u => u.Email.ToLower() == request.Email.ToLower() && u.Id != userIdInt))
            return BadRequest("Email already exists");
        
        user.Email = request.Email;
    }

    user.FirstName = request.FirstName ?? user.FirstName;
    user.LastName = request.LastName ?? user.LastName;
    user.Weight = request.Weight ?? user.Weight;
    user.Height = request.Height ?? user.Height;
    user.DateOfBirth = request.DateOfBirth ?? user.DateOfBirth;
    user.Gender = request.Gender ?? user.Gender;
    user.UpdatedAt = DateTime.UtcNow;

    await _context.SaveChangesAsync();

    return NoContent();
}


        [HttpPost("change-password"), Authorize]
public async Task<ActionResult> ChangePassword(ChangePasswordDto request)
{
    var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
    if (string.IsNullOrEmpty(userId))
    {
        return Unauthorized("Invalid token");
    }
    
    var userIdInt = int.Parse(userId);
    var user = await _context.Users.FindAsync(userIdInt);

    if (user == null)
        return NotFound();

    if (!_authService.VerifyPasswordHash(request.CurrentPassword, user.PasswordHash, user.PasswordSalt))
        return BadRequest("Current password is incorrect");

    _authService.CreatePasswordHash(request.NewPassword, out byte[] passwordHash, out byte[] passwordSalt);

    user.PasswordHash = passwordHash;
    user.PasswordSalt = passwordSalt;
    user.UpdatedAt = DateTime.UtcNow;

    await _context.SaveChangesAsync();

    return NoContent();
}

        private async Task<bool> UserExists(string username)
        {
            return await _context.Users.AnyAsync(u => u.Username.ToLower() == username.ToLower());
        }

        private async Task<bool> EmailExists(string email)
        {
            return await _context.Users.AnyAsync(u => u.Email.ToLower() == email.ToLower());
        }
    }
}