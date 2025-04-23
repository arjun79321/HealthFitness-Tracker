// File: client/src/pages/Dashboard.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getWorkouts } from '../store/slices/workoutSlice';
import { getCalorieEntries } from '../store/slices/calorieSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { workouts, loading: workoutsLoading } = useSelector(state => state.workouts);
  const { entries, dailyTotal, loading: caloriesLoading } = useSelector(state => state.calories);

  useEffect(() => {
    dispatch(getWorkouts());
    dispatch(getCalorieEntries());
  }, [dispatch]);

  // Get recent workouts
  const recentWorkouts = workouts.slice(0, 3);

  // Get today's calories
  const todayCalories = entries.filter(entry =>
    new Date(entry.date).toDateString() === new Date().toDateString()
  );

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h2 className="workout-heading">Welcome {user?.firstName || user?.username}!</h2>
        <p style={{ color: "#555", fontSize: "16px", textAlign: "center", marginTop: "20px", opacity: "0.8" }}>Here's your fitness overview for today</p>
      </div>

      <div className="row mt-4">

        <div className="col-md-6">
          <div className="card mb-4 shadow-sm l-bg-blue-dark">
            <div className="card-header d-flex justify-content-between align-items-center text-white">
              <h3 className="mb-0" style={{color:'#fff'}}>Recent Workouts</h3>
              <Link to="/workouts" className="btn btn-sm btn-light">View All</Link>
            </div>
            <div className="card-body bg-light">
              {workoutsLoading ? (
                <p className="text-center text-muted">Loading workouts...</p>
              ) : recentWorkouts.length > 0 ? (
                <ul className="list-group">
                  {recentWorkouts.map(workout => (
                    <li key={workout.id} className="list-group-item d-flex justify-content-between align-items-center">
                      <div>
                        <h5 className="mb-1 text-primary">{workout.name}</h5>
                        <p className="mb-0 text-muted">
                          <i className="fas fa-dumbbell text-warning"></i> {workout.type.charAt(0).toUpperCase() + workout.type.slice(1)}
                          &nbsp;|&nbsp;
                          <i className="fas fa-clock text-success"></i> {workout.duration} min
                          &nbsp;|&nbsp;
                          <i className="fas fa-burn text-danger"></i> {workout.calories} cal
                        </p>
                      </div>
                      <span className="badge bg-primary rounded-pill px-3 py-2">
                        <i className="fas fa-calendar-alt"></i> {new Date(workout.date).toLocaleDateString()}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-center text-muted">
                  No recent workouts. <Link to="/workouts" className="text-primary">Log a workout</Link>
                </p>
              )}
            </div>
          </div>
        </div>


        <div className="col-md-6">
          <div className="card mb-4 shadow-sm l-bg-blue-dark">
            <div className="card-header d-flex justify-content-between align-items-center text-white rounded-top">
              <h3 className="mb-0" style={{color:'#fff'}}>🔥 Today's Calories</h3>
              <Link to="/calories" className="btn btn-sm btn-light shadow-sm px-3 py-1 rounded-pill">
                <i className="fas fa-arrow-right"></i> View More
              </Link>
            </div>
            <div className="card-body bg-light">
              {caloriesLoading ? (
                <p className="text-center text-muted">Loading calorie data...</p>
              ) : (
                <>
                  <div className="calories-summary text-dark">
                    <h4>Total: <span className="highlight text-danger">{dailyTotal || 0}</span> calories</h4>
                  </div>
                  {todayCalories.length > 0 ? (
                    <ul className="list-group">
                      {todayCalories.map((entry) => (
                        <li key={entry.id} className="list-group-item calorie-item d-flex justify-content-between align-items-center">
                          <div>
                            <h5 className="mb-1 text-primary"><span className="food-icon">🥗</span> {entry.foodName}</h5>
                            <p className="mb-0 text-muted"><span className="meal-icon">🍽️</span> {entry.mealType}</p>
                          </div>
                          <span className="badge bg-danger text-white px-3 py-2">{entry.calories} cal</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-center text-muted">
                      No calories logged today. <Link to="/calories" className="text-primary">Log food intake</Link>
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>



      </div>

      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h3 className="mb-0">Fitness Summary</h3>
              <Link to="/analytics" className="btn btn-sm btn-primary">View Analytics</Link>
            </div>

            <div class="container">
              <div class="row mt-4">
                {/* <!-- Card 1: This Week --> */}
                <div class="col-xl-4 col-lg-4 col-md-4">
                  <div class="card l-bg-cherry">
                    <div class="card-statistic-3 p-4">
                      <div class="card-icon card-icon-large"><i class="fas fa-calendar-week"></i></div>
                      <div class="mb-4">
                        <h5 class="card-title mb-0">This Week</h5>
                      </div>
                      <div class="row align-items-center mb-2 d-flex">
                        <div class="col-12 text-center">
                          <h2 class="d-flex align-items-center justify-content-center mb-0">
                            {workouts.filter(w => {
                              const workoutDate = new Date(w.date);
                              const today = new Date();
                              const weekStart = new Date(today);
                              weekStart.setDate(today.getDate() - today.getDay());
                              return workoutDate >= weekStart;
                            }).length} Workouts
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <!-- Card 2: Calories Burned --> */}
                <div class="col-xl-4 col-lg-4 col-md-4">
                  <div class="card l-bg-blue-dark">
                    <div class="card-statistic-3 p-4">
                      <div class="card-icon card-icon-large"><i class="fas fa-fire"></i></div>
                      <div class="mb-4">
                        <h5 class="card-title mb-0">Calories Burned</h5>
                      </div>
                      <div class="row align-items-center mb-2 d-flex">
                        <div class="col-12 text-center">
                          <h2 class="d-flex align-items-center justify-content-center mb-0">
                            {workouts.reduce((total, workout) => total + (workout.calories || 0), 0)} cal
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <!-- Card 3: Total Duration --> */}
                <div class="col-xl-4 col-lg-4 col-md-4">
                  <div class="card l-bg-orange-dark">
                    <div class="card-statistic-3 p-4">
                      <div class="card-icon card-icon-large"><i class="fas fa-clock"></i></div>
                      <div class="mb-4">
                        <h5 class="card-title mb-0">Total Duration</h5>
                      </div>
                      <div class="row align-items-center mb-2 d-flex">
                        <div class="col-12 text-center">
                          <h2 class="d-flex align-items-center justify-content-center mb-0">
                            {workouts.reduce((total, workout) => total + workout.duration, 0)} min
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>




    {/* graph */}




    </div>
  );
};

export default Dashboard;
