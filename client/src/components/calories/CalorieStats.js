import React from 'react';

const CalorieStats = ({ dailyTotal }) => {
  // You can adjust the target calories based on user profile in the future
  const targetCalories = 2000;
  const remainingCalories = targetCalories - (dailyTotal || 0);

  // Calculate percentage for progress bar
  const percentage = Math.min(Math.round((dailyTotal || 0) / targetCalories * 100), 100);

  // Determine progress bar color based on percentage
  const getProgressColor = () => {
    if (percentage < 50) return 'success';
    if (percentage < 85) return 'warning';
    return 'danger';
  };

  return (
    <div className="calorie-stats card mb-4">
      <div className="card-body">
        <h3 className="card-title">Today's Calorie Summary</h3>

        {/* <div className="row text-center mb-3">
          <div className="col">
            <div className="stat-box">
              <h4>Target</h4>
              <p className="stat-value">{targetCalories}</p>
            </div>
          </div>
          <div className="col">
            <div className="stat-box">
              <h4>Consumed</h4>
              <p className="stat-value">{dailyTotal || 0}</p>
            </div>
          </div>
          <div className="col">
            <div className="stat-box">
              <h4>Remaining</h4>
              <p className={`stat-value ${remainingCalories < 0 ? 'text-danger' : ''}`}>
                {remainingCalories}
              </p>
            </div>
          </div>
        </div> */}



        {/* <div className="progress">
          <div
            className={`progress-bar bg-${getProgressColor()}`}
            role="progressbar"
            style={{ width: `${percentage}%` }}
            aria-valuenow={percentage}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            {percentage}%
          </div>
        </div> */}
      </div>






      <div class="container">
        <div class="row">
          {/* <!-- Card 1: Target --> */}
          <div class="col-xl-4 col-lg-4 col-md-4">
            <div class="card l-bg-cherry">
              <div class="card-statistic-3 p-4">
                <div class="card-icon card-icon-large"><i class="fas fa-shopping-cart"></i></div>
                <div class="mb-4">
                  <h5 class="card-title mb-0">Target</h5>
                </div>
                <div class="row align-items-center mb-2 d-flex">
                  <div class="col-8">
                    <h2 class="d-flex align-items-center mb-0">
                      {targetCalories}
                    </h2>
                  </div>
                  <div class="col-4 text-right">
                    <span>12.5% <i class="fa fa-arrow-up"></i></span>
                  </div>
                </div>
                <div class="progress mt-1" data-height="8" style={{ height: 8 }}>
                  <div class="progress-bar l-bg-cyan" role="progressbar" data-width="25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style={{ width: 25 }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Card 2: Consumed --> */}
          <div class="col-xl-4 col-lg-4 col-md-4">
            <div class="card l-bg-blue-dark">
              <div class="card-statistic-3 p-4">
                <div class="card-icon card-icon-large"><i class="fas fa-fire"></i></div>
                <div class="mb-4">
                  <h5 class="card-title mb-0">Consumed</h5>
                </div>
                <div class="row align-items-center mb-2 d-flex">
                  <div class="col-8">
                    <h2 class="d-flex align-items-center mb-0">
                      {dailyTotal || 0}
                    </h2>
                  </div>
                  <div class="col-4 text-right">
                    <span>8.3% <i class="fa fa-arrow-up"></i></span>
                  </div>
                </div>
                <div class="progress mt-1" data-height="8" style={{ height: 8 }}>
                  <div class="progress-bar l-bg-green" role="progressbar" data-width="50%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style={{ width: 75 }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Card 3: Remaining --> */}
          <div class="col-xl-4 col-lg-4 col-md-4">
            <div class="card l-bg-orange-dark">
              <div class="card-statistic-3 p-4">
                <div class="card-icon card-icon-large"><i class="fas fa-battery-half"></i></div>
                <div class="mb-4">
                  <h5 class="card-title mb-0">Remaining</h5>
                </div>
                <div class="row align-items-center mb-2 d-flex">
                  <div class="col-8">
                    <h2 class="d-flex align-items-center mb-0">
                      {remainingCalories}
                    </h2>
                  </div>
                  <div class="col-4 text-right">
                    <span>4.7% <i class="fa fa-arrow-down"></i></span>
                  </div>
                </div>
                <div class="progress mt-1" data-height="8" style={{ height: 8 }}>
                  <div class="progress-bar l-bg-red" role="progressbar" data-width="75%" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{ width: 75 }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


  );
};

export default CalorieStats;