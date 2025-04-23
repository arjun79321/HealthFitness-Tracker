// File: client/src/components/calories/CalorieList.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteCalorieEntry } from '../../store/slices/calorieSlice';

const CalorieList = ({ entries }) => {
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      dispatch(deleteCalorieEntry(id));
    }
  };

  if (entries.length === 0) {
    return <p>No calorie entries found. Start by adding a food item!</p>;
  }

  // Group entries by meal type
  const groupedEntries = {
    breakfast: [],
    lunch: [],
    dinner: [],
    snack: []
  };

  entries.forEach(entry => {
    if (groupedEntries[entry.mealType]) {
      groupedEntries[entry.mealType].push(entry);
    } else {
      groupedEntries.other = groupedEntries.other || [];
      groupedEntries.other.push(entry);
    }
  });

  return (
 <div className="calorie-list">
  {Object.keys(groupedEntries).map((mealType) => {
    const mealEntries = groupedEntries[mealType];
    if (mealEntries.length === 0) return null;

    const totalCalories = mealEntries.reduce((sum, entry) => sum + entry.calories, 0);

    return (
      <div key={mealType} className="meal-group mb-4">
        {/* Meal Header with Total Calories */}
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h3 className="meal-title text-primary fw-bold">
            {mealType.charAt(0).toUpperCase() + mealType.slice(1)}
          </h3>
          <span className="badge bg-info" style={{ fontSize: "1rem", padding: "6px 10px" }}>
            {totalCalories} cal
          </span>
        </div>

        {mealEntries.map((entry) => (
          <div
            key={entry.id}
            className="calorie-card card rounded-4 mb-3"
            style={{
              width: "100%",
              border: "1px solid rgba(0,0,0,0.2)",
              boxShadow: "0px 4px 8px rgba(0,0,0,0.15)",
              transition: "transform 0.2s ease-in-out, box-shadow 0.3s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.02)";
              e.currentTarget.style.boxShadow = "0px 8px 16px rgba(0,0,0,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0px 4px 8px rgba(0,0,0,0.15)";
            }}
          >
            <div className="card-body p-4">
              <h4 className="food-name text-dark fw-bold">{entry.foodName}</h4>
              <span
                className="badge bg-secondary"
                style={{ fontSize: "0.8rem", padding: "5px 8px" }}
              >
                {entry.calories} cal
              </span>

              <div className="calorie-details mt-3 text-muted">
                <p className="mb-1">
                  ⏳ <strong>Meal Time:</strong> {entry.time}
                </p>
                {entry.protein && (
                  <p className="mb-1">
                    💪 <strong>Protein:</strong> {entry.protein}g
                  </p>
                )}
                {entry.carbs && (
                  <p className="mb-1">
                    🍞 <strong>Carbs:</strong> {entry.carbs}g
                  </p>
                )}
                {entry.fats && (
                  <p className="mb-1">
                    🥑 <strong>Fats:</strong> {entry.fats}g
                  </p>
                )}
                {entry.notes && (
                  <p className="mb-1">
                    📝 <strong>Notes:</strong> {entry.notes}
                  </p>
                )}
              </div>

              <button
                className="btn btn-danger btn-sm mt-3 w-100"
                style={{
                  fontWeight: "bold",
                  backgroundColor: "#dc3545",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  padding: "8px 12px",
                  transition: "background-color 0.2s ease-in-out",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#c82333")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#dc3545")}
                onClick={() => handleDelete(entry.id)}
              >
                ❌ Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  })}
</div>

  
  );
};

export default CalorieList;