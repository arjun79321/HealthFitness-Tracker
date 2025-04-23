import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';

const CalorieChart = ({ entries }) => {
  // Define target calories for reference line
  const targetCalories = 2000;
  
  // Process data for chart
  const getCaloriesByDay = () => {
    if (!entries || entries.length === 0) {
      // Return sample data if no entries
      const today = new Date();
      const dates = [];
      
      // Generate dates for the last 7 days
      for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        dates.push({
          date: date.toISOString().split('T')[0],
          totalCalories: Math.floor(Math.random() * 800) + 1400 // Random between 1400-2200
        });
      }
      
      return dates;
    }
    
    // Group calories by day
    const caloriesByDay = {};
    
    entries.forEach(entry => {
      const date = entry.date.split('T')[0];
      
      if (!caloriesByDay[date]) {
        caloriesByDay[date] = {
          date,
          totalCalories: 0
        };
      }
      
      // Add calories
      caloriesByDay[date].totalCalories += entry.calories;
    });
    
    // Convert to array for Recharts and sort by date
    return Object.values(caloriesByDay).sort((a, b) => 
      new Date(a.date) - new Date(b.date)
    );
  };

  const chartData = getCaloriesByDay();

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const date = new Date(label);
      const formattedDate = date.toLocaleDateString(undefined, { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      });
      
      const calories = payload[0].value;
      const difference = calories - targetCalories;
      
      return (
        <div className="custom-tooltip" style={{ 
          backgroundColor: '#fff', 
          padding: '10px', 
          border: '1px solid #ccc',
          borderRadius: '5px'
        }}>
          <p style={{ margin: '0 0 5px 0', fontWeight: 'bold' }}>{formattedDate}</p>
          <p style={{ margin: '2px 0', color: payload[0].color }}>
            Calories: {calories}
          </p>
          <p style={{ 
            margin: '2px 0', 
            color: difference > 0 ? '#e74c3c' : '#2ecc71'
          }}>
            {difference > 0 ? '+' : ''}{difference} from target
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom dot for the line chart
  const CustomizedDot = (props) => {
    const { cx, cy, value } = props;
    
    return (
      <svg x={cx - 8} y={cy - 8} width={16} height={16} fill="none" viewBox="0 0 16 16">
        <circle 
          cx="8" 
          cy="8" 
          r="6" 
          fill={value > targetCalories ? '#e74c3c' : '#2ecc71'} 
          stroke="#fff" 
          strokeWidth="2" 
        />
      </svg>
    );
  };

  return (
    <div style={{ width: '100%', height: 400, marginBottom: '30px' }}>
      <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>Daily Calorie Intake</h3>
      <ResponsiveContainer>
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date" 
            angle={-45} 
            textAnchor="end" 
            tick={{ fontSize: 12 }}
            height={70}
            tickFormatter={(date) => new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
          />
          <YAxis 
            label={{ 
              value: 'Calories', 
              angle: -90, 
              position: 'insideLeft',
              style: { textAnchor: 'middle' }
            }} 
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ marginTop: '10px' }} />
          <ReferenceLine 
            y={targetCalories} 
            label={{ 
              position: 'right', 
              value: 'Target', 
              fill: '#666', 
              fontSize: 12 
            }} 
            stroke="#666" 
            strokeDasharray="3 3" 
          />
          <Line 
            type="monotone" 
            dataKey="totalCalories" 
            name="Daily Calories" 
            stroke="#8884d8" 
            strokeWidth={2}
            dot={<CustomizedDot />}
            activeDot={{ r: 8, fill: '#8884d8' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CalorieChart;