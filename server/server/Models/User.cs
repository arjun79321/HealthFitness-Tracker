using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace FullStackApp.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Username { get; set; } = string.Empty;  // Default value

        [Required]
        [EmailAddress]
        [MaxLength(100)]
        public string Email { get; set; } = string.Empty;  // Default value

        [Required]
        public byte[] PasswordHash { get; set; } = Array.Empty<byte>();  // Default value

        [Required]
        public byte[] PasswordSalt { get; set; } = Array.Empty<byte>();  // Default value

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }

        // User profile information
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public int? Weight { get; set; }  // in pounds
        public int? Height { get; set; }  // in centimeters
        public DateTime? DateOfBirth { get; set; }
        public string? Gender { get; set; }

        // Navigation properties (initialized to prevent null references)
        public virtual ICollection<Workout> Workouts { get; set; } = new List<Workout>();
        public virtual ICollection<CalorieEntry> CalorieEntries { get; set; } = new List<CalorieEntry>();
    }
}