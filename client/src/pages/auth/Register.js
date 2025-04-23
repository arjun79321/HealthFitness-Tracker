import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { register, reset } from '../../store/slices/authSlice';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    gender: '',
    weight: '',
    height: '',
    dateOfBirth: '', // Ensure this is properly formatted before sending
  });

  const {
    username,
    email,
    password,
    confirmPassword,
    firstName,
    lastName,
    gender,
    weight,
    height,
    dateOfBirth
  } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, loading, error } = useSelector(state => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }

    return () => {
      dispatch(reset());
    };
  }, [isAuthenticated, navigate, dispatch]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    // ✅ Ensure Date of Birth is formatted properly before sending to the backend
    const formattedDOB = dateOfBirth ? new Date(dateOfBirth).toISOString() : null;

    dispatch(register({
      ...formData,
      dateOfBirth: formattedDOB, // Send formatted date
    }));
  };


  return (
    <div className="register-page bg-light">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-lg border-0 rounded-lg">
            <div className="card-header bg-primary text-white text-center py-2">
  <h1 className="mb-0" style={{ color: 'white' }}>Create an Account</h1>
</div>
            <div className="card-body p-5">
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
  
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-4">
                    <label htmlFor="firstName" className="form-label">First Name</label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      id="firstName"
                      name="firstName"
                      value={firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
  
                  <div className="col-md-6 mb-4">
                    <label htmlFor="lastName" className="form-label">Last Name</label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      id="lastName"
                      name="lastName"
                      value={lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
  
                <div className="mb-4">
                  <label htmlFor="username" className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    id="username"
                    name="username"
                    value={username}
                    onChange={handleChange}
                    required
                  />
                </div>
  
                <div className="mb-4">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    id="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    required
                  />
                </div>
  
                <div className="mb-4">
                  <label htmlFor="dateOfBirth" className="form-label">Date of Birth</label>
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    value={dateOfBirth}
                    onChange={handleChange}
                  />
                </div>
  
                <div className="mb-4">
                  <label htmlFor="gender" className="form-label">Gender</label>
                  <select
                    className="form-select form-select-lg"
                    id="gender"
                    name="gender"
                    value={gender}
                    onChange={handleChange}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>
  
                <div className="row">
                  <div className="col-md-6 mb-4">
                    <label htmlFor="weight" className="form-label">Weight (lbs)</label>
                    <input
                      type="number"
                      className="form-control form-control-lg"
                      id="weight"
                      name="weight"
                      value={weight}
                      onChange={handleChange}
                      placeholder="Enter weight in pounds"
                      min="1"
                    />
                  </div>
  
                  <div className="col-md-6 mb-4">
                    <label htmlFor="height" className="form-label">Height (cm)</label>
                    <input
                      type="number"
                      className="form-control form-control-lg"
                      id="height"
                      name="height"
                      value={height}
                      onChange={handleChange}
                      placeholder="Enter height in centimeters"
                      min="1"
                    />
                  </div>
                </div>
  
                <div className="mb-4">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    id="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    required
                    minLength="6"
                  />
                  <small className="form-text text-muted">Password must be at least 6 characters</small>
                </div>
  
                <div className="mb-4">
                  <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleChange}
                    required
                    minLength="6"
                  />
                </div>
  
                <button
                  type="submit"
                  className="btn btn-primary btn-lg w-100 mt-3"
                  disabled={loading}
                >
                  {loading ? 'Creating Account...' : 'Register'}
                </button>
              </form>
  
              <div className="mt-4 text-center">
              <p style={{ color: 'black' }}>
  Already have an account?{' '}
  <Link to="/login" className="text-decoration-none">
    Sign In
  </Link>

                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Register;