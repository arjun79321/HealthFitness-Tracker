import React from 'react';

const CalorieSummary = ({ entries }) => {
  if (!entries || entries.length === 0) {
    return (
      <div className="calorie-summary">
        <h3>Calorie Summary</h3>
        <p>No calorie data available. Start tracking your food intake!</p>
      </div>
    );
  }

  // Target calories per day
  const targetCalories = 2000;
  
  // Group entries by date
  const entriesByDate = {};
  entries.forEach(entry => {
    const date = entry.date.split('T')[0];
    if (!entriesByDate[date]) {
      entriesByDate[date] = [];
    }
    entriesByDate[date].push(entry);
  });
  
  // Calculate daily totals
  const dailyTotals = Object.entries(entriesByDate).map(([date, dayEntries]) => ({
    date,
    total: dayEntries.reduce((sum, entry) => sum + entry.calories, 0)
  }));
  
  // Calculate stats
  const totalDays = dailyTotals.length;
  const totalCalories = dailyTotals.reduce((sum, day) => sum + day.total, 0);
  const avgDailyCalories = totalDays > 0 ? Math.round(totalCalories / totalDays) : 0;
  
  // Days over/under target
  const daysOverTarget = dailyTotals.filter(day => day.total > targetCalories).length;
  const daysUnderTarget = dailyTotals.filter(day => day.total <= targetCalories).length;
  
  // Meal type distribution
  const mealTypeDistribution = {};
  let totalEntries = 0;
  
  entries.forEach(entry => {
    const mealType = entry.mealType || 'other';
    if (!mealTypeDistribution[mealType]) {
      mealTypeDistribution[mealType] = 0;
    }
    mealTypeDistribution[mealType] += entry.calories;
    totalEntries += entry.calories;
  });
  
  // Calculate percentages
  Object.keys(mealTypeDistribution).forEach(mealType => {
    mealTypeDistribution[mealType] = {
      calories: mealTypeDistribution[mealType],
      percentage: Math.round((mealTypeDistribution[mealType] / totalEntries) * 100)
    };
  });

  return (
    <div className="calorie-summary" style={{ 
      padding: '20px', 
      backgroundColor: '#3498db', 
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h3 style={{ marginBottom: '20px' }}>Calorie Summary</h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
        <div className="stat-box" style={{ textAlign: 'center', padding: '15px', backgroundColor: '#fff', borderRadius: '8px' }}>
          <h4>Total Entries</h4>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#0088FE' }}>{entries.length}</p>
        </div>
        
        <div className="stat-box" style={{ textAlign: 'center', padding: '15px', backgroundColor: '#fff', borderRadius: '8px' }}>
          <h4>Avg. Daily Calories</h4>
          <p style={{ 
            fontSize: '24px', 
            fontWeight: 'bold', 
            color: avgDailyCalories > targetCalories ? '#e74c3c' : '#2ecc71' 
          }}>
            {avgDailyCalories}
          </p>
        </div>
        
        <div className="stat-box" style={{ textAlign: 'center', padding: '15px', backgroundColor: '#fff', borderRadius: '8px' }}>
          <h4>Days Tracked</h4>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#8884d8' }}>{totalDays}</p>
        </div>
      </div>
      
      <div style={{ marginTop: '20px' }}>
        <h4>Target Adherence</h4>
        <div style={{ 
          display: 'flex', 
          height: '30px', 
          borderRadius: '15px', 
          overflow: 'hidden',
          marginTop: '10px'
        }}>
          <div style={{ 
            width: `${(daysUnderTarget / totalDays) * 100}%`, 
            backgroundColor: '#2ecc71',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontWeight: 'bold'
          }}>
            {Math.round((daysUnderTarget / totalDays) * 100)}%
          </div>
          <div style={{ 
            width: `${(daysOverTarget / totalDays) * 100}%`, 
            backgroundColor: '#e74c3c',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontWeight: 'bold'
          }}>
            {Math.round((daysOverTarget / totalDays) * 100)}%
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
          <span>Under Target: {daysUnderTarget} days</span>
          <span>Over Target: {daysOverTarget} days</span>
        </div>
      </div>
      
      <div style={{ marginTop: '20px' }}>
        <h4>Meal Distribution</h4>
        <div style={{ marginTop: '10px' }}>
          {Object.entries(mealTypeDistribution).map(([mealType, data], index) => {
            // Format meal type for display
            const formattedMealType = mealType.charAt(0).toUpperCase() + mealType.slice(1);
            
            return (
              <div key={index} style={{ marginBottom: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <span>{formattedMealType}</span>
                  <span>{data.calories} cal ({data.percentage}%)</span>
                </div>
                <div style={{ 
                  width: '100%', 
                  height: '10px', 
                  backgroundColor: '#e9ecef',
                  borderRadius: '5px',
                  overflow: 'hidden'
                }}>
                  <div style={{ 
                    width: `${data.percentage}%`, 
                    height: '100%', 
                    backgroundColor: getColorForMealType(mealType)
                  }}></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Helper function to get color for meal type
const getColorForMealType = (mealType) => {
  const colors = {
    breakfast: '#FF8042',
    lunch: '#0088FE',
    dinner: '#00C49F',
    snack: '#FFBB28',
    other: '#8884d8'
  };
  
  return colors[mealType.toLowerCase()] || '#8884d8';
};

export default CalorieSummary;