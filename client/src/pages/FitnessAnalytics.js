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
  const { workouts } = useSelector(state => state.workouts);
  const { entries } = useSelector(state => state.calories);
  
  useEffect(() => {
    dispatch(getWorkouts());
    dispatch(getCalorieEntries());
  }, [dispatch]);

  return (
    <div className="analytics-page">
      <h3 className="workout-heading">Fitness Analytics</h3>
      <p style={{ color: "#555", fontSize: "16px", textAlign: "center", marginTop: "20px", opacity: "0.8" }}>Analyze your workout and nutrition data</p>
      
      <div className="analytics-container">
        <div className="analytics-section">
          <h2>Workout Analysis</h2>
          <WorkoutChart workouts={workouts} />
          <WorkoutSummary workouts={workouts} />
        </div>
        
        <div className="analytics-section">
          <h2>Calorie Analysis</h2>
          <CalorieChart entries={entries} />
          <CalorieSummary entries={entries} />
        </div>
      </div>
    </div>
  );
};

export default FitnessAnalytics;
