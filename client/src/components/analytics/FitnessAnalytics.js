import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getWorkouts } from '../store/slices/workoutSlice';
import { getCalorieEntries } from '../store/slices/calorieSlice';
import WorkoutChart from '../components/analytics/WorkoutChart';
import CalorieChart from '../components/analytics/CalorieChart';
import WorkoutSummary from '../components/analytics/WorkoutSummary';
import CalorieSummary from '../components/analytics/CalorieSummary';

const FitnessAnalytics = () => {
  const dispatch = useDispatch();
  const { workouts, loading: workoutsLoading, error: workoutsError } = useSelector(state => state.workouts);
  const { entries, loading: caloriesLoading, error: caloriesError } = useSelector(state => state.calories);
  
  useEffect(() => {
    dispatch(getWorkouts());
    dispatch(getCalorieEntries());
  }, [dispatch]);

  return (
    <div className="analytics-page">
      <h1>Fitness Analytics</h1>
      <p>Analyze your workout and nutrition data</p>
      
      {(workoutsLoading || caloriesLoading) ? (
        <div className="loading" style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          height: '200px',
          fontSize: '18px',
          color: '#666'
        }}>
          <div className="spinner" style={{ 
            borderRadius: '50%',
            width: '24px',
            height: '24px',
            border: '3px solid rgba(0, 0, 0, 0.1)',
            borderTopColor: '#3498db',
            animation: 'spin 1s linear infinite',
            marginRight: '10px'
          }}></div>
          Loading analytics data...
        </div>
      ) : (
        <div className="analytics-container">
          <div className="analytics-section" style={{ marginBottom: '40px' }}>
            <h2>Workout Analysis</h2>
            {workoutsError && (
              <div className="alert" style={{ 
                backgroundColor: '#fff3cd', 
                color: '#856404', 
                padding: '12px', 
                borderRadius: '5px',
                marginBottom: '20px' 
              }}>
                Note: Using sample data for demonstration. {workoutsError}
              </div>
            )}
            <WorkoutChart workouts={workouts} />
            <WorkoutSummary workouts={workouts} />
          </div>
          
          <div className="analytics-section">
            <h2>Calorie Analysis</h2>
            {caloriesError && (
              <div className="alert" style={{ 
                backgroundColor: '#fff3cd', 
                color: '#856404', 
                padding: '12px', 
                borderRadius: '5px',
                marginBottom: '20px' 
              }}>
                Note: Using sample data for demonstration. {caloriesError}
              </div>
            )}
            <CalorieChart entries={entries} />
            <CalorieSummary entries={entries} />
          </div>
        </div>
      )}
      
      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default FitnessAnalytics;