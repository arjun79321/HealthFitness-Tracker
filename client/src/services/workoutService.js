import axios from 'axios';

const API_URL = '/api/workouts';

// Set up axios interceptor for authentication
axios.interceptors.request.use(
  config => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Get all workouts
const getWorkouts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Get a single workout
const getWorkout = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Create a new workout
const createWorkout = async (workoutData) => {
  const response = await axios.post(API_URL, workoutData);
  return response.data;
};

// Update a workout
const updateWorkout = async (id, workoutData) => {
  const response = await axios.put(`${API_URL}/${id}`, workoutData);
  return response.data;
};

// Delete a workout
const deleteWorkout = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

const workoutService = {
  getWorkouts,
  getWorkout,
  createWorkout,
  updateWorkout,
  deleteWorkout
};

export default workoutService;