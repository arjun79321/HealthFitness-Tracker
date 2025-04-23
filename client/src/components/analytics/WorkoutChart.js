import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const WorkoutChart = ({ workouts }) => {
  // Process data for chart
  const getWorkoutsByWeek = () => {
    if (!workouts || workouts.length === 0) {
      // Return sample data if no workouts
      return [
        { name: 'Week 1', cardio: 2, strength: 3, flexibility: 1, sports: 0, other: 0 },
        { name: 'Week 2', cardio: 3, strength: 2, flexibility: 2, sports: 1, other: 0 }
      ];
    }
    
    // Group workouts by week
    const workoutsByWeek = {};
    
    workouts.forEach(workout => {
      const date = new Date(workout.date);
      const weekStart = new Date(date);
      weekStart.setDate(date.getDate() - date.getDay()); // Start of week (Sunday)
      const weekKey = weekStart.toISOString().split('T')[0];
      const weekName = `Week of ${weekStart.toLocaleDateString()}`;
      
      if (!workoutsByWeek[weekKey]) {
        workoutsByWeek[weekKey] = {
          name: weekName,
          cardio: 0,
          strength: 0,
          flexibility: 0,
          sports: 0,
          other: 0
        };
      }
      
      // Increment the specific workout type
      const type = workout.type ? workout.type.toLowerCase() : 'other';
      if (['cardio', 'strength', 'flexibility', 'sports'].includes(type)) {
        workoutsByWeek[weekKey][type] += 1;
      } else {
        workoutsByWeek[weekKey].other += 1;
      }
    });
    
    // Convert to array and sort by week
    return Object.values(workoutsByWeek).sort((a, b) => {
      const dateA = new Date(a.name.replace('Week of ', ''));
      const dateB = new Date(b.name.replace('Week of ', ''));
      return dateA - dateB;
    });
  };

  const chartData = getWorkoutsByWeek();

  // Custom tooltip to display more details
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const total = payload.reduce((sum, entry) => sum + (entry.value || 0), 0);
      
      return (
        <div className="custom-tooltip" style={{ 
          backgroundColor: '#fff', 
          padding: '10px', 
          border: '1px solid #ccc',
          borderRadius: '5px'
        }}>
          <p className="label" style={{ margin: '0 0 5px 0', fontWeight: 'bold' }}>{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ 
              margin: '2px 0', 
              color: entry.color,
              display: entry.value > 0 ? 'block' : 'none'
            }}>
              {entry.name}: {entry.value}
            </p>
          ))}
          <p style={{ margin: '5px 0 0 0', fontWeight: 'bold' }}>
            Total: {total} workouts
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ width: '100%', height: 400, marginBottom: '30px' }}>
      <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>Weekly Workout Summary</h3>
      <ResponsiveContainer>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
          barGap={2}
          barSize={20}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="name" 
            angle={-45} 
            textAnchor="end" 
            tick={{ fontSize: 12 }}
            height={70}
          />
          <YAxis 
            label={{ 
              value: 'Number of Workouts', 
              angle: -90, 
              position: 'insideLeft',
              style: { textAnchor: 'middle' }
            }} 
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ marginTop: '10px' }} />
          <Bar dataKey="cardio" name="Cardio" fill="#FF8042" radius={[4, 4, 0, 0]} />
          <Bar dataKey="strength" name="Strength" fill="#0088FE" radius={[4, 4, 0, 0]} />
          <Bar dataKey="flexibility" name="Flexibility" fill="#00C49F" radius={[4, 4, 0, 0]} />
          <Bar dataKey="sports" name="Sports" fill="#FFBB28" radius={[4, 4, 0, 0]} />
          <Bar dataKey="other" name="Other" fill="#8884d8" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WorkoutChart;