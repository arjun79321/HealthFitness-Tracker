import React from 'react';

const WorkoutSummary = ({ workouts }) => {
  if (!workouts || workouts.length === 0) {
    return (
      <div className="workout-summary">
        <h3>Workout Summary</h3>
        <p>No workout data available. Start tracking your workouts!</p>
      </div>
    );
  }

  // Calculate total stats
  const totalWorkouts = workouts.length;
  const totalDuration = workouts.reduce((total, workout) => total + (workout.duration || 0), 0);
  const totalCalories = workouts.reduce((total, workout) => total + (workout.calories || 0), 0);
  
  // Calculate averages
  const avgDuration = totalWorkouts > 0 ? Math.round(totalDuration / totalWorkouts) : 0;
  const avgCalories = totalWorkouts > 0 ? Math.round(totalCalories / totalWorkouts) : 0;
  
  // Count workout types
  const workoutTypes = {};
  workouts.forEach(workout => {
    const type = workout.type ? workout.type.toLowerCase() : 'other';
    workoutTypes[type] = (workoutTypes[type] || 0) + 1;
  });
  
  // Get most frequent workout type
  let mostFrequentType = 'none';
  let maxCount = 0;
  Object.entries(workoutTypes).forEach(([type, count]) => {
    if (count > maxCount) {
      mostFrequentType = type;
      maxCount = count;
    }
  });
  
  // Format the most frequent type for display
  mostFrequentType = mostFrequentType.charAt(0).toUpperCase() + mostFrequentType.slice(1);

  return (
    <div className="workout-summary" style={{ 
      padding: '20px', 
      backgroundColor: '#f8f9fa', 
      borderRadius: '12px',
      boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
    }}>
      <h3 style={{ marginBottom: '20px', textAlign: 'center' }}>Workout Summary</h3>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '20px' 
      }}>
        <div className="stat-box" style={{ textAlign: 'center', padding: '20px', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
          <h4>Total Workouts</h4>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#0088FE' }}>{totalWorkouts}</p>
        </div>
        
        <div className="stat-box" style={{ textAlign: 'center', padding: '20px', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
          <h4>Total Duration</h4>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#00C49F' }}>{totalDuration} min</p>
        </div>
      
        <div className="stat-box" style={{ textAlign: 'center', padding: '20px', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
          <h4>Calories Burned</h4>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#FF8042' }}>{totalCalories}</p>
        </div>
      
        <div className="stat-box" style={{ textAlign: 'center', padding: '20px', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
          <h4>Avg. Workout Length</h4>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#FFBB28' }}>{avgDuration} min</p>
        </div>
      
        <div className="stat-box" style={{ textAlign: 'center', padding: '20px', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
          <h4>Avg. Calories/Workout</h4>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#8884d8' }}>{avgCalories}</p>
        </div>
      
        <div className="stat-box" style={{ textAlign: 'center', padding: '20px', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
          <h4>Favorite Workout</h4>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#0088FE' }}>{mostFrequentType}</p>
        </div>
      </div>
    </div>
  );
};

export default WorkoutSummary;