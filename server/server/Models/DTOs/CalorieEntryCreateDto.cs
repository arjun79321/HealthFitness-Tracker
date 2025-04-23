using System;
using System.ComponentModel.DataAnnotations;

namespace FullStackApp.Models.DTOs
{
    // DTO for creating a calorie entry
    public class CalorieEntryCreateDto
    {
        [Required]
        [StringLength(100)]
        public string FoodName { get; set; } = string.Empty;
        
        [Required]
        [Range(0, 5000)]
        public int Calories { get; set; }
        
        [Required]
        [StringLength(50)]
        public string MealType { get; set; } = string.Empty;
        
        [Required]
        public DateTime Date { get; set; }
        
        [StringLength(200)]
        public string? Notes { get; set; }
    }

    // DTO for updating a calorie entry
    public class CalorieEntryUpdateDto
    {
        [StringLength(100)]
        public string? FoodName { get; set; }
        
        [Range(0, 5000)]
        public int? Calories { get; set; }
        
        [StringLength(50)]
        public string? MealType { get; set; }
        
        public DateTime? Date { get; set; }
        
        [StringLength(200)]
        public string? Notes { get; set; }
    }

    // DTO for returning calorie entry data to client
    public class CalorieEntryDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string FoodName { get; set; } = string.Empty;
        public int Calories { get; set; }
        public string MealType { get; set; } = string.Empty;
        public DateTime Date { get; set; }
        public string? Notes { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Username { get; set; } = string.Empty; // Optional: included when retrieving with user details
    }

    // DTO for daily calorie summary
    public class DailyCalorieSummaryDto
    {
        public DateTime Date { get; set; }
        public int TotalCalories { get; set; }
        public int BreakfastCalories { get; set; }
        public int LunchCalories { get; set; }
        public int DinnerCalories { get; set; }
        public int SnackCalories { get; set; }
        public int OtherCalories { get; set; }
        public CalorieEntryDto[] Entries { get; set; } = Array.Empty<CalorieEntryDto>();
    }

    // DTO for calorie statistics
    public class CalorieStatsDto
    {
        public int TotalEntries { get; set; }
        public int TotalCalories { get; set; }
        public double AverageCaloriesPerDay { get; set; }
        public double AverageCaloriesPerMeal { get; set; }
        public MealTypeStats[] CaloriesByMealType { get; set; } = Array.Empty<MealTypeStats>();
    }

    public class MealTypeStats
    {
        public string MealType { get; set; } = string.Empty;
        public int Count { get; set; }
        public int TotalCalories { get; set; }
        public double AverageCalories { get; set; }
    }
}