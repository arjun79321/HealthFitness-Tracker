using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FullStackApp.Models
{
    public class CalorieEntry
    {
        [Key]
        public int Id { get; set; }
        
        [Required]
        public int UserId { get; set; }
        
        [Required]
        [MaxLength(100)]
        public string FoodName { get; set; } = string.Empty;  // Default value to prevent null
        
        [Required]
        public int Calories { get; set; }
        
        [Required]
        [MaxLength(50)]
        public string MealType { get; set; } = string.Empty;  // Default value
        
        [Required]
        public DateTime Date { get; set; }
        
        [MaxLength(200)]
        public string? Notes { get; set; }  // Nullable to prevent CS8618
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        // Navigation property (nullable to prevent null reference errors)
        [ForeignKey("UserId")]
        public virtual User? User { get; set; }
    }
}