import React from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
  const { user, loading, error } = useSelector((state) => state.auth);

  console.log("Redux User State:", user); // Debugging Redux state

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!user) return <p>User not found. Please log in.</p>;

  const userData = user.user || user;

  // Calculate BMI if both height and weight are available
  const calculateBMI = () => {
    if (userData.height && userData.weight) {
      // Convert height from cm to meters
      const heightInMeters = userData.height / 100;
      // Convert weight from lbs to kg if needed
      const weightInKg = userData.weight / 2.20462;

      const bmi = (weightInKg / (heightInMeters * heightInMeters)).toFixed(1);

      // BMI categories
      let category = '';
      if (bmi < 18.5) category = 'Underweight';
      else if (bmi < 25) category = 'Normal weight';
      else if (bmi < 30) category = 'Overweight';
      else category = 'Obese';

      return { bmi, category };
    }
    return null;
  };

  const bmiData = calculateBMI();


  return (
    <div className="profile-page">
      <h3 className="workout-heading">Your Profile</h3>

      {/* <div className="profile-info">
        <div className="card">
          <div className="card-body">
            <h2>Account Information</h2>

            <div className="info-group">
              <label>Username:</label>
              <p>{userData.username || "N/A"}</p>
            </div>

            <div className="info-group">
              <label>Email:</label>
              <p>{userData.email || "N/A"}</p>
            </div>

            <div className="info-group">
              <label>Name:</label>
              <p>{`${userData.firstName || ""} ${userData.lastName || ""}`}</p>
            </div>

            <div className="info-group">
              <label>Gender:</label>
              <p>{userData.gender || "Not specified"}</p>
            </div>

            <div className="info-group">
              <label>Weight:</label>
              <p>{userData.weight ? `${userData.weight} lbs (${(userData.weight / 2.20462).toFixed(1)} kg)` : "Not provided"}</p>
            </div>
            {bmiData && (
              <div className="info-group mb-3">
                <label className="fw-bold">BMI:</label>
                <p>{bmiData.bmi} - {bmiData.category}</p>
              </div>
            )}

            <div className="info-group">
              <label>Height:</label>
              <p>{userData.height ? `${userData.height} cm (${(userData.height / 2.54).toFixed(1)} inches)` : "Not provided"}</p>
            </div>

            <div className="info-group">
              <label className="fw-bold">Date of Birth:</label>
              <p>
                {userData.dateOfBirth
                  ? new Date(userData.dateOfBirth).toLocaleDateString()
                  : "Not provided"}
              </p>
            </div>


          </div>
        </div>
      </div> */}








<div className="page-content page-container mt-5" id="page-content">
      <div className="padding">
        <div className="row container d-flex justify-content-center">
          <div className="col-xl-10 col-md-12">
            <div className="card user-card-full">
              <div className="row m-l-0 m-r-0">
                {/* Left Side: Profile Image and Basic Info */}
                <div className="col-sm-4 bg-c-lite-green user-profile">
                  <div className="card-block text-center text-white">
                    <div className="m-b-25">
                      <img
                        src="https://img.icons8.com/bubbles/100/000000/user.png"
                        className="img-radius"
                        alt="User-Profile-Image"
                      />
                    </div>
                    <h6 className="f-w-600">{userData.username || "N/A"}</h6>
                    <p>Fitness</p>
                    <i className="mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                  </div>
                </div>

                {/* Right Side: Detailed Information */}
                <div className="col-sm-8">
                  <div className="card-block">
                    <h5 className="m-b-20 p-b-5 b-b-default f-w-600">Information</h5>
                    <div className="row">
                      <div className="col-sm-6">
                        <p className="m-b-10 f-w-600">Username</p>
                        <h6 className="text-muted f-w-00">{userData.username || "N/A"}</h6>
                      </div>
                      <div className="col-sm-6">
                        <p className="m-b-10 f-w-600">Name</p>
                        <h6 className="text-muted f-w-400">{`${userData.firstName || ""} ${userData.lastName || ""}`}</h6>
                      </div>
                    </div>

                    <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600"></h6>
                    <div className="row">
                      <div className="col-sm-6">
                        <p className="m-b-10 f-w-600">Email</p>
                        <h6 className="text-muted f-w-400">{userData.email || "N/A"}</h6>
                      </div>
                      <div className="col-sm-6">
                        <p className="m-b-10 f-w-600">Gender</p>
                        <h6 className="text-muted f-w-400">{userData.gender || "Not specified"}</h6>
                      </div>
                    </div>

                    <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600"></h6>
                    <div className="row">
                      <div className="col-sm-6">
                        <p className="m-b-10 f-w-600">Weight</p>
                        <h6 className="text-muted f-w-400">{userData.height ? `${userData.height} cm (${(userData.height / 2.54).toFixed(1)} inches)` : "Not provided"}</h6>
                      </div>
                      <div className="col-sm-6">
                        <p className="m-b-10 f-w-600">Height</p>
                        <h6 className="text-muted f-w-400">{userData.height ? `${userData.height} cm (${(userData.height / 2.54).toFixed(1)} inches)` : "Not provided"}</h6>
                      </div>
                      
                    </div>


                    <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600"></h6>
                    <div className="row">
                      <div className="col-sm-6">
                        <p className="m-b-10 f-w-600">Date of Birth</p>
                        <h6 className="text-muted f-w-400">{userData.dateOfBirth
                  ? new Date(userData.dateOfBirth).toLocaleDateString()
                  : "Not provided"}</h6>
                      </div>
                      {bmiData && (
  <div className="row">
    <div className="col-sm-6">
      <p className="m-b-10 f-w-600">BMI</p>
      <h6 className="text-muted f-w-400">{bmiData.bmi} - {bmiData.category}</h6>
    </div>
  </div>
)}


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
  );
};

export default Profile;
