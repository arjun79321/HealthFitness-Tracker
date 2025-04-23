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
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CaloriesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CaloriesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/calories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CalorieEntryDto>>> GetCalorieEntries(
            [FromQuery] DateTime? date,
            [FromQuery] DateTime? startDate,
            [FromQuery] DateTime? endDate,
            [FromQuery] string? mealType)
        {
            var userId = GetUserId();

            var query = _context.CalorieEntries
                .Where(c => c.UserId == userId);

            // Apply filters if provided
            if (date.HasValue)
            {
                var startOfDay = date.Value.Date;
                var endOfDay = startOfDay.AddDays(1).AddTicks(-1);
                query = query.Where(c => c.Date >= startOfDay && c.Date <= endOfDay);
            }
            else
            {
                if (startDate.HasValue)
                    query = query.Where(c => c.Date >= startDate.Value);

                if (endDate.HasValue)
                    query = query.Where(c => c.Date <= endDate.Value.Date.AddDays(1).AddTicks(-1));
            }

            if (!string.IsNullOrEmpty(mealType))
                query = query.Where(c => c.MealType.ToLower() == mealType.ToLower());

            var entries = await query
                .OrderByDescending(c => c.Date)
                .Select(c => new CalorieEntryDto
                {
                    Id = c.Id,
                    UserId = c.UserId,
                    FoodName = c.FoodName,
                    Calories = c.Calories,
                    MealType = c.MealType,
                    Date = c.Date,
                    Notes = c.Notes,
                    CreatedAt = c.CreatedAt
                })
                .ToListAsync();

            return Ok(entries);
        }

        // GET: api/calories/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CalorieEntryDto>> GetCalorieEntry(int id)
        {
            var userId = GetUserId();

            var entry = await _context.CalorieEntries
                .FirstOrDefaultAsync(c => c.Id == id && c.UserId == userId);

            if (entry == null)
                return NotFound();

            var entryDto = new CalorieEntryDto
            {
                Id = entry.Id,
                UserId = entry.UserId,
                FoodName = entry.FoodName,
                Calories = entry.Calories,
                MealType = entry.MealType,
                Date = entry.Date,
                Notes = entry.Notes,
                CreatedAt = entry.CreatedAt
            };

            return Ok(entryDto);
        }

        // POST: api/calories
        [HttpPost]
        public async Task<ActionResult<CalorieEntryDto>> CreateCalorieEntry(CalorieEntryCreateDto entryDto)
        {
            var userId = GetUserId();

            var entry = new CalorieEntry
            {
                UserId = userId,
                FoodName = entryDto.FoodName,
                Calories = entryDto.Calories,
                MealType = entryDto.MealType,
                Date = entryDto.Date,
                Notes = entryDto.Notes,
                CreatedAt = DateTime.UtcNow
            };

            _context.CalorieEntries.Add(entry);
            await _context.SaveChangesAsync();

            var createdEntryDto = new CalorieEntryDto
            {
                Id = entry.Id,
                UserId = entry.UserId,
                FoodName = entry.FoodName,
                Calories = entry.Calories,
                MealType = entry.MealType,
                Date = entry.Date,
                Notes = entry.Notes,
                CreatedAt = entry.CreatedAt
            };

            return CreatedAtAction(nameof(GetCalorieEntry), new { id = entry.Id }, createdEntryDto);
        }

        // PUT: api/calories/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCalorieEntry(int id, CalorieEntryUpdateDto entryDto)
        {
            var userId = GetUserId();

            var entry = await _context.CalorieEntries
                .FirstOrDefaultAsync(c => c.Id == id && c.UserId == userId);

            if (entry == null)
                return NotFound();

            // Only update fields that are provided
            if (!string.IsNullOrEmpty(entryDto.FoodName))
                entry.FoodName = entryDto.FoodName;

            if (entryDto.Calories.HasValue)
                entry.Calories = entryDto.Calories.Value;

            if (!string.IsNullOrEmpty(entryDto.MealType))
                entry.MealType = entryDto.MealType;

            if (entryDto.Date.HasValue)
                entry.Date = entryDto.Date.Value;

            entry.Notes = entryDto.Notes ?? entry.Notes;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CalorieEntryExists(id))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }

        // DELETE: api/calories/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCalorieEntry(int id)
        {
            var userId = GetUserId();

            var entry = await _context.CalorieEntries
                .FirstOrDefaultAsync(c => c.Id == id && c.UserId == userId);

            if (entry == null)
                return NotFound();

            _context.CalorieEntries.Remove(entry);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // GET: api/calories/daily-summary
        [HttpGet("daily-summary")]
        public async Task<ActionResult<IEnumerable<DailyCalorieSummaryDto>>> GetDailySummary(
            [FromQuery] DateTime? date,
            [FromQuery] DateTime? startDate,
            [FromQuery] DateTime? endDate)
        {
            var userId = GetUserId();

            var query = _context.CalorieEntries
                .Where(c => c.UserId == userId);

            // Apply date filters
            if (date.HasValue)
            {
                var startOfDay = date.Value.Date;
                var endOfDay = startOfDay.AddDays(1).AddTicks(-1);
                query = query.Where(c => c.Date >= startOfDay && c.Date <= endOfDay);
            }
            else
            {
                if (startDate.HasValue)
                    query = query.Where(c => c.Date >= startDate.Value.Date);

                if (endDate.HasValue)
                    query = query.Where(c => c.Date <= endDate.Value.Date.AddDays(1).AddTicks(-1));
            }

            var entries = await query.ToListAsync();

            var dailySummaries = entries
                .GroupBy(e => e.Date.Date)
                .Select(g =>
                {
                    var entriesForDay = g.Select(e => new CalorieEntryDto
                    {
                        Id = e.Id,
                        UserId = e.UserId,
                        FoodName = e.FoodName,
                        Calories = e.Calories,
                        MealType = e.MealType,
                        Date = e.Date,
                        Notes = e.Notes,
                        CreatedAt = e.CreatedAt
                    }).ToArray();

                    return new DailyCalorieSummaryDto
                    {
                        Date = g.Key,
                        TotalCalories = g.Sum(e => e.Calories),
                        BreakfastCalories = g.Where(e => e.MealType.ToLower() == "breakfast").Sum(e => e.Calories),
                        LunchCalories = g.Where(e => e.MealType.ToLower() == "lunch").Sum(e => e.Calories),
                        DinnerCalories = g.Where(e => e.MealType.ToLower() == "dinner").Sum(e => e.Calories),
                        SnackCalories = g.Where(e => e.MealType.ToLower() == "snack").Sum(e => e.Calories),
                        OtherCalories = g.Where(e => e.MealType.ToLower() != "breakfast" && 
                                                    e.MealType.ToLower() != "lunch" && 
                                                    e.MealType.ToLower() != "dinner" && 
                                                    e.MealType.ToLower() != "snack").Sum(e => e.Calories),
                        Entries = entriesForDay
                    };
                })
                .OrderByDescending(s => s.Date)
                .ToList();

            return Ok(dailySummaries);
        }

        // GET: api/calories/stats
        [HttpGet("stats")]
        public async Task<ActionResult<CalorieStatsDto>> GetCalorieStats(
            [FromQuery] DateTime? startDate,
            [FromQuery] DateTime? endDate)
        {
            var userId = GetUserId();

            var query = _context.CalorieEntries
                .Where(c => c.UserId == userId);

            if (startDate.HasValue)
                query = query.Where(c => c.Date >= startDate.Value.Date);

            if (endDate.HasValue)
                query = query.Where(c => c.Date <= endDate.Value.Date.AddDays(1).AddTicks(-1));

            var entries = await query.ToListAsync();

            if (!entries.Any())
                return Ok(new CalorieStatsDto
                {
                    TotalEntries = 0,
                    TotalCalories = 0,
                    AverageCaloriesPerDay = 0,
                    AverageCaloriesPerMeal = 0,
                    CaloriesByMealType = Array.Empty<MealTypeStats>()
                });

            var days = entries.Select(e => e.Date.Date).Distinct().Count();

            var caloriesByMealType = entries
                .GroupBy(e => e.MealType)
                .Select(g => new MealTypeStats
                {
                    MealType = g.Key,
                    Count = g.Count(),
                    TotalCalories = g.Sum(e => e.Calories),
                    AverageCalories = Math.Round((double)g.Sum(e => e.Calories) / g.Count(), 2)
                })
                .ToArray();

            var stats = new CalorieStatsDto
            {
                TotalEntries = entries.Count,
                TotalCalories = entries.Sum(e => e.Calories),
                AverageCaloriesPerDay = days > 0 ? Math.Round((double)entries.Sum(e => e.Calories) / days, 2) : 0,
                AverageCaloriesPerMeal = entries.Count > 0 ? Math.Round((double)entries.Sum(e => e.Calories) / entries.Count, 2) : 0,
                CaloriesByMealType = caloriesByMealType
            };

            return Ok(stats);
        }

      private int GetUserId()
{
    var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
    if (string.IsNullOrEmpty(userId))
    {
        throw new InvalidOperationException("User ID not found in the token");
    }
    return int.Parse(userId);
}
private bool CalorieEntryExists(int id)
{
    return _context.CalorieEntries.Any(c => c.Id == id);
}
    }
}