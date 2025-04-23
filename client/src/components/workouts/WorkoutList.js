import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteWorkout } from '../../store/slices/workoutSlice';

const WorkoutList = ({ workouts }) => {
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this workout?')) {
      dispatch(deleteWorkout(id));
    }
  };

  if (workouts.length === 0) {
    return <p>No workouts found. Start by adding a new workout!</p>;
  }

  // Group workouts by date
  const groupedWorkouts = {};
  workouts.forEach(workout => {
    const date = new Date(workout.date).toDateString();
    if (!groupedWorkouts[date]) {
      groupedWorkouts[date] = [];
    }
    groupedWorkouts[date].push(workout);
  });

  // Create an array of dates sorted in descending order
  const sortedDates = Object.keys(groupedWorkouts).sort((a, b) => 
    new Date(b) - new Date(a)
  );

  return (
<div className="workout-list">
  {sortedDates.map((date) =>
    groupedWorkouts[date].map((workout) => (
      <div
        key={workout.id}
        className="workout-card card rounded-4 mb-3"
        style={{
          width: "100%",
          border: "1px solid rgba(0,0,0,0.2)", // Full Border
          boxShadow: "0px 4px 8px rgba(0,0,0,0.15)", // Smokey Shadow
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
          <h6 className="text-primary fw-bold">{date}</h6>
          <h4 className="workout-name text-dark fw-bold">{workout.name}</h4>
          <span
            className={`badge bg-${getWorkoutTypeColor(workout.type)}`}
            style={{ fontSize: "0.8rem", padding: "5px 8px" }}
          >
            {workout.type.charAt(0).toUpperCase() + workout.type.slice(1)}
          </span>
          <div className="workout-details mt-3 text-muted">
            <p className="mb-1">
              <strong>⏳ Duration:</strong> {workout.duration} min
            </p>
            {workout.calories && (
              <p className="mb-1">
                🔥 <strong>Calories:</strong> {workout.calories} kcal
              </p>
            )}
            {workout.notes && (
              <p className="mb-1">
                📝 <strong>Notes:</strong> {workout.notes}
              </p>
            )}
          </div>
          <button
            className="btn btn-danger btn-sm mt-3 w-100"
            style={{
              fontWeight: "bold",
              backgroundColor: "#dc3545", // Red color
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              padding: "8px 12px",
              transition: "background-color 0.2s ease-in-out",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#c82333")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#dc3545")}
            onClick={() => handleDelete(workout.id)}
          >
            ❌ Delete
          </button>
        </div>
      </div>
    ))
  )}
</div>


  
  );
};

// Helper function to get badge color based on workout type
const getWorkoutTypeColor = (type) => {
  switch (type) {
    case 'cardio':
      return 'danger';
    case 'strength':
      return 'primary';
    case 'flexibility':
      return 'success';
    case 'sports':
      return 'warning';
    default:
      return 'secondary';
  }
};

export default WorkoutList;
