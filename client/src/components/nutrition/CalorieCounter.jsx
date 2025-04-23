// src/components/nutrition/MealForm.jsx


// src/components/nutrition/MealList.jsx

// src/components/nutrition/CalorieCounter.jsx
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/selectors/authSelectors';
import './CalorieCounter.css';

const CalorieCounter = ({ meals, date }) => {
  const user = useSelector(selectUser);
  const calorieGoal = user?.dailyCalorieGoal || 2000;
  
  const [calorieStats, setCalorieStats] = useState({
    consumed: 0,
    remaining: calorieGoal,
    percentage: 0,
    protein: 0,
    carbs: 0,
    fat: 0
  });
  
  useEffect(() => {
    if (meals && meals.length > 0) {
      const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);
      const totalProtein = meals.reduce((sum, meal) => sum + (meal.protein || 0), 0);
      const totalCarbs = meals.reduce((sum, meal) => sum + (meal.carbs || 0), 0);
      const totalFat = meals.reduce((sum, meal) => sum + (meal.fat || 0), 0);
      
      setCalorieStats({
        consumed: totalCalories,
        remaining: calorieGoal - totalCalories,
        percentage: Math.min(Math.round((totalCalories / calorieGoal) * 100), 100),
        protein: totalProtein,
        carbs: totalCarbs,
        fat: totalFat
      });
    } else {
      setCalorieStats({
        consumed: 0,
        remaining: calorieGoal,
        percentage: 0,
        protein: 0,
        carbs: 0,
        fat: 0
      });
    }
  }, [meals, calorieGoal]);
  
  // Calculate macronutrient percentages
  const totalMacros = calorieStats.protein + calorieStats.carbs + calorieStats.fat;
  const proteinPercentage = totalMacros > 0 ? Math.round((calorieStats.protein / totalMacros) * 100) : 0;
  const carbsPercentage = totalMacros > 0 ? Math.round((calorieStats.carbs / totalMacros) * 100) : 0;
  const fatPercentage = totalMacros > 0 ? Math.round((calorieStats.fat / totalMacros) * 100) : 0;
  
  // Calculate calories from macros
  const proteinCalories = calorieStats.protein * 4; // 4 calories per gram of protein
  const carbCalories = calorieStats.carbs * 4; // 4 calories per gram of carbs
  const fatCalories = calorieStats.fat * 9; // 9 calories per gram of fat
  
  return (
    <div className="calorie-counter">
      <div className="calorie-progress">
        <div className="progress-chart">
          <svg width="160" height="160" viewBox="0 0 160 160">
            {/* Background circle */}
            <circle
              cx="80"
              cy="80"
              r="70"
              fill="none"
              stroke="#e6e6e6"
              strokeWidth="15"
            />
            
            {/* Progress circle */}
            <circle
              cx="80"
              cy="80"
              r="70"
              fill="none"
              stroke={calorieStats.remaining < 0 ? '#FF5B5B' : '#5BFF9F'}
              strokeWidth="15"
              strokeDasharray={`${calorieStats.percentage * 4.4}, 440`}
              strokeLinecap="round"
              transform="rotate(-90 80 80)"
            />
            
            {/* Center text */}
            <text x="80" y="70" textAnchor="middle" fontSize="24" fontWeight="bold">
              {calorieStats.consumed}
            </text>
            <text x="80" y="95" textAnchor="middle" fontSize="14">
              of {calorieGoal} cal
            </text>
          </svg>
        </div>
        
        <div className="calorie-details">
          <div className="calorie-stat">
            <span className="stat-label">Consumed</span>
            <span className="stat-value">{calorieStats.consumed} cal</span>
          </div>
          
          <div className="calorie-stat">
            <span className="stat-label">
              {calorieStats.remaining >= 0 ? 'Remaining' : 'Over'}
            </span>
            <span className={`stat-value ${calorieStats.remaining < 0 ? 'negative' : ''}`}>
              {Math.abs(calorieStats.remaining)} cal
            </span>
          </div>
          
          <div className="calorie-stat">
            <span className="stat-label">Goal</span>
            <span className="stat-value">{calorieGoal} cal</span>
          </div>
        </div>
      </div>
      
      <div className="macronutrient-breakdown">
        <h4>Macronutrients</h4>
        
        <div className="macros-chart">
          <div className="macros-bars">
            <div className="macro-bar-container">
              <div className="macro-bar-label">
                <span>Protein</span>
                <span>{proteinPercentage}%</span>
              </div>
              <div className="macro-bar">
                <div 
                  className="macro-bar-progress protein"
                  style={{ width: `${proteinPercentage}%` }}
                ></div>
              </div>
              <div className="macro-bar-value">{calorieStats.protein}g ({proteinCalories} cal)</div>
            </div>
            
            <div className="macro-bar-container">
              <div className="macro-bar-label">
                <span>Carbs</span>
                <span>{carbsPercentage}%</span>
              </div>
              <div className="macro-bar">
                <div 
                  className="macro-bar-progress carbs"
                  style={{ width: `${carbsPercentage}%` }}
                ></div>
              </div>
              <div className="macro-bar-value">{calorieStats.carbs}g ({carbCalories} cal)</div>
            </div>
            
            <div className="macro-bar-container">
              <div className="macro-bar-label">
                <span>Fat</span>
                <span>{fatPercentage}%</span>
              </div>
              <div className="macro-bar">
                <div 
                  className="macro-bar-progress fat"
                  style={{ width: `${fatPercentage}%` }}
                ></div>
              </div>
              <div className="macro-bar-value">{calorieStats.fat}g ({fatCalories} cal)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

CalorieCounter.propTypes = {
  meals: PropTypes.array.isRequired,
  date: PropTypes.instanceOf(Date).isRequired
};

export default CalorieCounter;