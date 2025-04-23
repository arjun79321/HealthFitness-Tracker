import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createWorkout, getWorkouts } from '../store/slices/workoutSlice';
import WorkoutForm from '../components/workouts/WorkoutForm';
import WorkoutList from '../components/workouts/WorkoutList';

const WorkoutLog = () => {
  const dispatch = useDispatch();
  const { workouts, loading, error } = useSelector(state => state.workouts);
  
  useEffect(() => {
    dispatch(getWorkouts());
  }, [dispatch]);

  const handleAddWorkout = (workoutData) => {
    dispatch(createWorkout(workoutData));
  };

  return (
    <div className="workout-log-page">
      <h3 className="workout-heading" >Workout Log</h3>
      <p style={{ color: "#555", fontSize: "16px", textAlign: "center", marginTop: "20px", opacity: "0.8" }}>
  Track your workouts and monitor your progress
</p>
      
      <div className="workout-container">
        <div className="workout-form-container">
          {/* <h2>Add New Workout</h2> */}
          <WorkoutForm onSubmit={handleAddWorkout} />
        </div>
        
        <div className="workout-list-container" style={{padding:20}}>
          <h4 className='text-center'>Your Workout History</h4>
          {loading ? (
            <p>Loading workouts...</p>
          ) : error ? (
            <p className="error">{error}</p>
          ) : (
            <WorkoutList workouts={workouts} />
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkoutLog;