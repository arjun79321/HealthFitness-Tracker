using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FullStackApp.Models
{
    public class Workout
    {
        [Key]
        public int Id { get; set; }
        
        [Required]
        public int UserId { get; set; }
        
        [Required]
        [MaxLength(50)]
        public string Type { get; set; } = string.Empty;  // Default value
        
        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;  // Default value
        
        [Required]
        public int Duration { get; set; }  // in minutes
        
        public int? Calories { get; set; }
        
        [Required]
        public DateTime Date { get; set; }
        
        [MaxLength(500)]
        public string? Notes { get; set; }  // Nullable to avoid CS8618
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        public DateTime? UpdatedAt { get; set; }
        
        // Navigation property (nullable to prevent null reference errors)
        [ForeignKey("UserId")]
        public virtual User? User { get; set; }
    }
}