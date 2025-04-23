using System;
using System.ComponentModel.DataAnnotations;

namespace FullStackApp.Models.DTOs
{
    // DTO for creating a workout
    public class WorkoutCreateDto
    {
        [Required]
        [StringLength(50)]
        public string Type { get; set; } = string.Empty;
        
        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;
        
        [Required]
        [Range(1, 1440)] // Max 24 hours in minutes
        public int Duration { get; set; }
        
        [Range(0, 10000)]
        public int? Calories { get; set; }
        
        [Required]
        public DateTime Date { get; set; }
        
        [StringLength(500)]
        public string? Notes { get; set; }
    }

    // DTO for updating a workout
    public class WorkoutUpdateDto
    {
        [StringLength(50)]
        public string? Type { get; set; }
        
        [StringLength(100)]
        public string? Name { get; set; }
        
        [Range(1, 1440)]
        public int? Duration { get; set; }
        
        [Range(0, 10000)]
        public int? Calories { get; set; }
        
        public DateTime? Date { get; set; }
        
        [StringLength(500)]
        public string? Notes { get; set; }
    }

    // DTO for returning workout data to client
    public class WorkoutDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Type { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public int Duration { get; set; }
        public int? Calories { get; set; }
        public DateTime Date { get; set; }
        public string? Notes { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public string Username { get; set; } = string.Empty; // Optional: included when retrieving with user details
    }

    // DTO for workout statistics
    public class WorkoutStatsDto
    {
        public int TotalWorkouts { get; set; }
        public int TotalDuration { get; set; }
        public int TotalCalories { get; set; }
        public double AverageDuration { get; set; }
        public double AverageCalories { get; set; }
        public WorkoutTypeStats[] WorkoutsByType { get; set; } = Array.Empty<WorkoutTypeStats>();
    }

    public class WorkoutTypeStats
    {
        public string Type { get; set; } = string.Empty;
        public int Count { get; set; }
        public int TotalDuration { get; set; }
        public int TotalCalories { get; set; }
    }
}