using System;
using System.ComponentModel.DataAnnotations;

namespace FullStackApp.Models.DTOs
{
    // DTO for user registration
    public class UserRegisterDto
    {
        [Required]
        [StringLength(50, MinimumLength = 3)]
        public string Username { get; set; } = string.Empty;
        
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;
        
        [Required]
        [StringLength(100, MinimumLength = 6)]
        public string Password { get; set; } = string.Empty;
        
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public int? Weight { get; set; }
        public int? Height { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string? Gender { get; set; }
    }

    // DTO for user login
    public class UserLoginDto
    {
        [Required]
        public string Username { get; set; } = string.Empty;
        
        [Required]
        public string Password { get; set; } = string.Empty;
    }

    // DTO for updating user profile
    public class UserUpdateDto
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public int? Weight { get; set; }
        public int? Height { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string? Gender { get; set; }
        public string? Email { get; set; }
    }

    // DTO for changing password
    public class ChangePasswordDto
    {
        [Required]
        public string CurrentPassword { get; set; } = string.Empty;
        
        [Required]
        [StringLength(100, MinimumLength = 6)]
        public string NewPassword { get; set; } = string.Empty;
        
        [Required]
        [Compare("NewPassword")]
        public string ConfirmNewPassword { get; set; } = string.Empty;
    }

    // DTO for user response (sent back to client)
    public class UserDto
    {
        public int Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public int? Weight { get; set; }
        public int? Height { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string? Gender { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}