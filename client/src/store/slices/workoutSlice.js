import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import workoutService from '../../services/workoutService';

// Get all workouts
export const getWorkouts = createAsyncThunk(
  'workouts/getAll',
  async (_, thunkAPI) => {
    try {
      return await workoutService.getWorkouts();
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create new workout
export const createWorkout = createAsyncThunk(
  'workouts/create',
  async (workoutData, thunkAPI) => {
    try {
      return await workoutService.createWorkout(workoutData);
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update workout
export const updateWorkout = createAsyncThunk(
  'workouts/update',
  async ({ id, workoutData }, thunkAPI) => {
    try {
      return await workoutService.updateWorkout(id, workoutData);
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete workout
export const deleteWorkout = createAsyncThunk(
  'workouts/delete',
  async (id, thunkAPI) => {
    try {
      await workoutService.deleteWorkout(id);
      return id;
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  workouts: [],
  loading: false,
  error: null,
  success: false
};

export const workoutSlice = createSlice({
  name: 'workouts',
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    }
  },
  extraReducers: (builder) => {
    builder
      // Get all workouts
      .addCase(getWorkouts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWorkouts.fulfilled, (state, action) => {
        state.loading = false;
        state.workouts = action.payload;
        state.success = true;
      })
      .addCase(getWorkouts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create workout
      .addCase(createWorkout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createWorkout.fulfilled, (state, action) => {
        state.loading = false;
        state.workouts.unshift(action.payload);  // Add to beginning of array
        state.success = true;
      })
      .addCase(createWorkout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update workout
      .addCase(updateWorkout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateWorkout.fulfilled, (state, action) => {
        state.loading = false;
        state.workouts = state.workouts.map(workout => 
          workout.id === action.payload.id ? action.payload : workout
        );
        state.success = true;
      })
      .addCase(updateWorkout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete workout
      .addCase(deleteWorkout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteWorkout.fulfilled, (state, action) => {
        state.loading = false;
        state.workouts = state.workouts.filter(workout => workout.id !== action.payload);
        state.success = true;
      })
      .addCase(deleteWorkout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { reset } = workoutSlice.actions;
export default workoutSlice.reducer;