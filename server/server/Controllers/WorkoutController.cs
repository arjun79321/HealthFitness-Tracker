using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using FullStackApp.Data;
using FullStackApp.Models;
using FullStackApp.Models.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FullStackApp.Controllers
{
    public interface IWorkoutsController
    {
        Task<ActionResult<WorkoutDto>> CreateWorkout(WorkoutCreateDto workoutDto);
        Task<IActionResult> DeleteWorkout(global::System.Int32 id);
        Task<ActionResult<WorkoutDto>> GetWorkout(global::System.Int32 id);
        Task<ActionResult<IEnumerable<WorkoutDto>>> GetWorkouts([FromQuery] DateTime startDate, [FromQuery] DateTime endDate, [FromQuery] global::System.String type);
        Task<ActionResult<WorkoutStatsDto>> GetWorkoutStats([FromQuery] DateTime startDate, [FromQuery] DateTime endDate);
        Task<IActionResult> UpdateWorkout(global::System.Int32 id, WorkoutUpdateDto workoutDto);
    }

    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class WorkoutsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public WorkoutsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/workouts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<WorkoutDto>>> GetWorkouts(
            [FromQuery] DateTime? startDate,
            [FromQuery] DateTime? endDate,
            [FromQuery] string? type)
        {
            var userId = GetUserId();

            var query = _context.Workouts
                .Where(w => w.UserId == userId);

            // Apply filters if provided
            if (startDate.HasValue)
                query = query.Where(w => w.Date >= startDate.Value);

            if (endDate.HasValue)
                query = query.Where(w => w.Date <= endDate.Value);

            if (!string.IsNullOrEmpty(type))
                query = query.Where(w => w.Type.ToLower() == type.ToLower());

            var workouts = await query
                .OrderByDescending(w => w.Date)
                .Select(w => new WorkoutDto
                {
                    Id = w.Id,
                    UserId = w.UserId,
                    Type = w.Type,
                    Name = w.Name,
                    Duration = w.Duration,
                    Calories = w.Calories,
                    Date = w.Date,
                    Notes = w.Notes,
                    CreatedAt = w.CreatedAt,
                    UpdatedAt = w.UpdatedAt
                })
                .ToListAsync();

            return Ok(workouts);
        }

        // GET: api/workouts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<WorkoutDto>> GetWorkout(int id)
        {
            var userId = GetUserId();

            var workout = await _context.Workouts
                .FirstOrDefaultAsync(w => w.Id == id && w.UserId == userId);

            if (workout == null)
                return NotFound();

            var workoutDto = new WorkoutDto
            {
                Id = workout.Id,
                UserId = workout.UserId,
                Type = workout.Type,
                Name = workout.Name,
                Duration = workout.Duration,
                Calories = workout.Calories,
                Date = workout.Date,
                Notes = workout.Notes,
                CreatedAt = workout.CreatedAt,
                UpdatedAt = workout.UpdatedAt
            };

            return Ok(workoutDto);
        }

        // POST: api/workouts
        [HttpPost]
        public async Task<ActionResult<WorkoutDto>> CreateWorkout(WorkoutCreateDto workoutDto)
        {
            var userId = GetUserId();

            var workout = new Workout
            {
                UserId = userId,
                Type = workoutDto.Type,
                Name = workoutDto.Name,
                Duration = workoutDto.Duration,
                Calories = workoutDto.Calories,
                Date = workoutDto.Date,
                Notes = workoutDto.Notes,
                CreatedAt = DateTime.UtcNow
            };

            _context.Workouts.Add(workout);
            await _context.SaveChangesAsync();

            var createdWorkoutDto = new WorkoutDto
            {
                Id = workout.Id,
                UserId = workout.UserId,
                Type = workout.Type,
                Name = workout.Name,
                Duration = workout.Duration,
                Calories = workout.Calories,
                Date = workout.Date,
                Notes = workout.Notes,
                CreatedAt = workout.CreatedAt,
                UpdatedAt = workout.UpdatedAt
            };

            return CreatedAtAction(nameof(GetWorkout), new { id = workout.Id }, createdWorkoutDto);
        }

        // PUT: api/workouts/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateWorkout(int id, WorkoutUpdateDto workoutDto)
        {
            var userId = GetUserId();

            var workout = await _context.Workouts
                .FirstOrDefaultAsync(w => w.Id == id && w.UserId == userId);

            if (workout == null)
                return NotFound();

            // Only update fields that are provided
            if (!string.IsNullOrEmpty(workoutDto.Type))
                workout.Type = workoutDto.Type;

            if (!string.IsNullOrEmpty(workoutDto.Name))
                workout.Name = workoutDto.Name;

            if (workoutDto.Duration.HasValue)
                workout.Duration = workoutDto.Duration.Value;

            if (workoutDto.Calories.HasValue)
                workout.Calories = workoutDto.Calories;

            if (workoutDto.Date.HasValue)
                workout.Date = workoutDto.Date.Value;

            workout.Notes = workoutDto.Notes ?? workout.Notes;
            workout.UpdatedAt = DateTime.UtcNow;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WorkoutExists(id))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }

        // DELETE: api/workouts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWorkout(int id)
        {
            var userId = GetUserId();

            var workout = await _context.Workouts
                .FirstOrDefaultAsync(w => w.Id == id && w.UserId == userId);

            if (workout == null)
                return NotFound();

            _context.Workouts.Remove(workout);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // GET: api/workouts/stats
        [HttpGet("stats")]
        public async Task<ActionResult<WorkoutStatsDto>> GetWorkoutStats(
            [FromQuery] DateTime? startDate,
            [FromQuery] DateTime? endDate)
        {
            var userId = GetUserId();

            var query = _context.Workouts
                .Where(w => w.UserId == userId);

            if (startDate.HasValue)
                query = query.Where(w => w.Date >= startDate.Value);

            if (endDate.HasValue)
                query = query.Where(w => w.Date <= endDate.Value);

            var workouts = await query.ToListAsync();

            if (!workouts.Any())
                return Ok(new WorkoutStatsDto
                {
                    TotalWorkouts = 0,
                    TotalDuration = 0,
                    TotalCalories = 0,
                    AverageDuration = 0,
                    AverageCalories = 0,
                    WorkoutsByType = Array.Empty<WorkoutTypeStats>()
                });

            var workoutsByType = workouts
                .GroupBy(w => w.Type)
                .Select(g => new WorkoutTypeStats
                {
                    Type = g.Key,
                    Count = g.Count(),
                    TotalDuration = g.Sum(w => w.Duration),
                    TotalCalories = g.Sum(w => w.Calories ?? 0)
                })
                .ToArray();

            var stats = new WorkoutStatsDto
            {
                TotalWorkouts = workouts.Count,
                TotalDuration = workouts.Sum(w => w.Duration),
                TotalCalories = workouts.Sum(w => w.Calories ?? 0),
                AverageDuration = Math.Round((double)workouts.Sum(w => w.Duration) / workouts.Count, 2),
                AverageCalories = Math.Round((double)workouts.Sum(w => w.Calories ?? 0) / workouts.Count, 2),
                WorkoutsByType = workoutsByType
            };

            return Ok(stats);
        }

        // Fixed indentation for these methods
        private int GetUserId()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                throw new InvalidOperationException("User ID not found in the token");
            }
            return int.Parse(userId);
        }

        private bool WorkoutExists(int id)
        {
            return _context.Workouts.Any(w => w.Id == id);
        }
    }
}
