import axios from 'axios';

const API_URL = '/api/calories';

// Get all calorie entries
const getCalorieEntries = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Get today's calorie entries
const getTodayEntries = async () => {
  const response = await axios.get(`${API_URL}/today`);
  return response.data;
};

// Get a single calorie entry
const getCalorieEntry = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Create a new calorie entry
const createCalorieEntry = async (entryData) => {
  const response = await axios.post(API_URL, entryData);
  return response.data;
};

// Update a calorie entry
const updateCalorieEntry = async (id, entryData) => {
  const response = await axios.put(`${API_URL}/${id}`, entryData);
  return response.data;
};

// Delete a calorie entry
const deleteCalorieEntry = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

const calorieService = {
  getCalorieEntries,
  getTodayEntries,
  getCalorieEntry,
  createCalorieEntry,
  updateCalorieEntry,
  deleteCalorieEntry
};

export default calorieService;