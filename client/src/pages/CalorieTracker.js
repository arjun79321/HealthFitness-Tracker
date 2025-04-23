import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCalorieEntry, getCalorieEntries } from '../store/slices/calorieSlice';
import CalorieForm from '../components/calories/CalorieForm';
import CalorieList from '../components/calories/CalorieList';
import CalorieStats from '../components/calories/CalorieStats';

const CalorieTracker = () => {
  const dispatch = useDispatch();
  const { entries, dailyTotal, loading, error } = useSelector(state => state.calories);
  
  useEffect(() => {
    dispatch(getCalorieEntries());
  }, [dispatch]);

  const handleAddEntry = (entryData) => {
    dispatch(addCalorieEntry(entryData));
  };

  return (
    <div className="calorie-tracker-page">
      <h3 className="workout-heading">Calorie Tracker</h3>
      <p style={{ color: "#555", fontSize: "16px", textAlign: "center", marginTop: "20px", opacity: "0.8" }}>Track your daily food intake and monitor your calories</p>
      
      <CalorieStats dailyTotal={dailyTotal} />
      
      <div className="calorie-container">
        <div className="calorie-form-container">
          {/* <h2>Add Food Entry</h2> */}
          <CalorieForm onSubmit={handleAddEntry} />
        </div>
        
        <div className="calorie-list-container" style={{padding:20}}>
          <h4 lassName='text-center'>Today's Food Log</h4>
          <hr></hr>
          {loading ? (
            <p>Loading entries...</p>
          ) : error ? (
            <p className="error">{error}</p>
          ) : (
            <CalorieList entries={entries} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CalorieTracker;