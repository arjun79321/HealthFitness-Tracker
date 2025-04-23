using FullStackApp.Models;
using Microsoft.EntityFrameworkCore;

namespace FullStackApp.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Workout> Workouts { get; set; }
        public DbSet<CalorieEntry> CalorieEntries { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure User entity
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Username)
                .IsUnique();

            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();

            // Configure Workout entity
            modelBuilder.Entity<Workout>()
                .HasOne(w => w.User)
                .WithMany(u => u.Workouts)
                .HasForeignKey(w => w.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Workout>()
                .HasIndex(w => w.UserId);

            modelBuilder.Entity<Workout>()
                .HasIndex(w => w.Date);

            // Configure CalorieEntry entity
            modelBuilder.Entity<CalorieEntry>()
                .HasOne(c => c.User)
                .WithMany(u => u.CalorieEntries)
                .HasForeignKey(c => c.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<CalorieEntry>()
                .HasIndex(c => c.UserId);

            modelBuilder.Entity<CalorieEntry>()
                .HasIndex(c => c.Date);

            // Default data for testing
            SeedData(modelBuilder);
        }

        private void SeedData(ModelBuilder modelBuilder)
        {
            // Create a test user with hashed password "password"
            byte[] passwordHash = new byte[] { 6, 145, 249, 215, 174, 138, 174, 186, 175, 212, 148, 74, 199, 127, 230, 9, 39, 107, 246, 230, 73, 68, 218, 170, 231, 241, 29, 134, 98, 10, 53, 35 };
            byte[] passwordSalt = new byte[] { 239, 102, 243, 105, 98, 242, 159, 17, 176, 175, 253, 72, 45, 163, 250, 14, 201, 50, 90, 181, 102, 216, 55, 85, 102, 146, 22, 58, 77, 145, 247, 193, 180, 125, 122, 3, 108, 192, 102, 74, 74, 22, 226, 157, 254, 78, 189, 246, 20, 93, 12, 57, 217, 12, 31, 57, 27, 212, 141, 190, 213, 107, 148, 248, 175, 27, 172, 91, 252, 209, 123, 134, 145, 17, 85, 245, 200, 226, 195, 255, 46, 215, 84, 64, 174, 125, 222, 103, 156, 192, 5, 241, 133, 136, 165, 205, 46, 198, 110, 197, 223, 157, 245, 61, 231, 138, 68, 118, 248, 97, 236, 93, 134, 111, 65, 34, 110, 245, 197, 117, 87, 4, 168, 34, 164, 111, 71, 172 };

            modelBuilder.Entity<User>().HasData(
                new User
                {
                    Id = 1,
                    Username = "testuser",
                    Email = "test@example.com",
                    PasswordHash = passwordHash,
                    PasswordSalt = passwordSalt,
                    FirstName = "Test",
                    LastName = "User",
                    Weight = 170,
                    Height = 175,
                    CreatedAt = DateTime.UtcNow,
                    Gender = "Male"
                }
            );

            // Seed some workout data
            modelBuilder.Entity<Workout>().HasData(
                new Workout 
                { 
                    Id = 1, 
                    UserId = 1, 
                    Type = "Cardio", 
                    Name = "Morning Run", 
                    Duration = 30, 
                    Calories = 300, 
                    Date = DateTime.UtcNow.AddDays(-1), 
                    Notes = "Felt good today!", 
                    CreatedAt = DateTime.UtcNow.AddDays(-1) 
                },
                new Workout 
                { 
                    Id = 2, 
                    UserId = 1, 
                    Type = "Strength", 
                    Name = "Gym Workout", 
                    Duration = 60, 
                    Calories = 450, 
                    Date = DateTime.UtcNow.AddDays(-2), 
                    Notes = "Upper body focus", 
                    CreatedAt = DateTime.UtcNow.AddDays(-2) 
                },
                new Workout 
                { 
                    Id = 3, 
                    UserId = 1, 
                    Type = "Yoga", 
                    Name = "Evening Stretch", 
                    Duration = 45, 
                    Calories = 200, 
                    Date = DateTime.UtcNow.AddDays(-3), 
                    Notes = "Relaxing session", 
                    CreatedAt = DateTime.UtcNow.AddDays(-3) 
                }
            );

            // Seed some calorie entries
            modelBuilder.Entity<CalorieEntry>().HasData(
                new CalorieEntry 
                { 
                    Id = 1, 
                    UserId = 1, 
                    FoodName = "Oatmeal with Berries", 
                    Calories = 350, 
                    MealType = "Breakfast", 
                    Date = DateTime.UtcNow.AddDays(-1), 
                    CreatedAt = DateTime.UtcNow.AddDays(-1) 
                },
                new CalorieEntry 
                { 
                    Id = 2, 
                    UserId = 1, 
                    FoodName = "Chicken Salad", 
                    Calories = 450, 
                    MealType = "Lunch", 
                    Date = DateTime.UtcNow.AddDays(-1), 
                    CreatedAt = DateTime.UtcNow.AddDays(-1) 
                },
                new CalorieEntry 
                { 
                    Id = 3, 
                    UserId = 1, 
                    FoodName = "Salmon with Vegetables", 
                    Calories = 550, 
                    MealType = "Dinner", 
                    Date = DateTime.UtcNow.AddDays(-1), 
                    CreatedAt = DateTime.UtcNow.AddDays(-1) 
                },
                new CalorieEntry 
                { 
                    Id = 4, 
                    UserId = 1, 
                    FoodName = "Protein Shake", 
                    Calories = 200, 
                    MealType = "Snack", 
                    Date = DateTime.UtcNow.AddDays(-2), 
                    CreatedAt = DateTime.UtcNow.AddDays(-2) 
                }
            );
        }
    }
}