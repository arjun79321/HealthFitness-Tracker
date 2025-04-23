import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import calorieService from '../../services/calorieService';

// Get all calorie entries
export const getCalorieEntries = createAsyncThunk(
  'calories/getAll',
  async (_, thunkAPI) => {
    try {
      return await calorieService.getCalorieEntries();
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get today's entries
export const getTodayEntries = createAsyncThunk(
  'calories/getToday',
  async (_, thunkAPI) => {
    try {
      return await calorieService.getTodayEntries();
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create new calorie entry
export const addCalorieEntry = createAsyncThunk(
  'calories/create',
  async (entryData, thunkAPI) => {
    try {
      return await calorieService.createCalorieEntry(entryData);
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update calorie entry
export const updateCalorieEntry = createAsyncThunk(
  'calories/update',
  async ({ id, entryData }, thunkAPI) => {
    try {
      return await calorieService.updateCalorieEntry(id, entryData);
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete calorie entry
export const deleteCalorieEntry = createAsyncThunk(
  'calories/delete',
  async (id, thunkAPI) => {
    try {
      await calorieService.deleteCalorieEntry(id);
      return id;
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  entries: [],
  dailyTotal: 0,
  loading: false,
  error: null,
  success: false
};

export const calorieSlice = createSlice({
  name: 'calories',
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
      // Get all entries
      .addCase(getCalorieEntries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCalorieEntries.fulfilled, (state, action) => {
        state.loading = false;
        state.entries = action.payload;
        
        // Calculate today's total
        const today = new Date().toDateString();
        state.dailyTotal = state.entries
          .filter(entry => new Date(entry.date).toDateString() === today)
          .reduce((total, entry) => total + entry.calories, 0);
          
        state.success = true;
      })
      .addCase(getCalorieEntries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get today's entries
      .addCase(getTodayEntries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTodayEntries.fulfilled, (state, action) => {
        state.loading = false;
        
        // Update entries with today's entries
        const todayEntries = action.payload.entries;
        const otherEntries = state.entries.filter(entry => {
          const today = new Date().toDateString();
          return new Date(entry.date).toDateString() !== today;
        });
        
        state.entries = [...todayEntries, ...otherEntries];
        state.dailyTotal = action.payload.totalCalories;
        state.success = true;
      })
      .addCase(getTodayEntries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create entry
      .addCase(addCalorieEntry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCalorieEntry.fulfilled, (state, action) => {
        state.loading = false;
        state.entries.unshift(action.payload);  // Add to beginning of array
        
        // Update daily total if entry is for today
        const today = new Date().toDateString();
        if (new Date(action.payload.date).toDateString() === today) {
          state.dailyTotal += action.payload.calories;
        }
        
        state.success = true;
      })
      .addCase(addCalorieEntry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update entry
      .addCase(updateCalorieEntry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCalorieEntry.fulfilled, (state, action) => {
        state.loading = false;
        
        const updatedEntry = action.payload;
        const oldEntry = state.entries.find(entry => entry.id === updatedEntry.id);
        
        // Update entries array
        state.entries = state.entries.map(entry => 
          entry.id === updatedEntry.id ? updatedEntry : entry
        );
        
        // Update daily total if entry is for today
        const today = new Date().toDateString();
        if (new Date(updatedEntry.date).toDateString() === today) {
          state.dailyTotal = state.dailyTotal - (oldEntry?.calories || 0) + updatedEntry.calories;
        }
        
        state.success = true;
      })
      .addCase(updateCalorieEntry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete entry
      .addCase(deleteCalorieEntry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCalorieEntry.fulfilled, (state, action) => {
        state.loading = false;
        
        // Find entry before removing it
        const deletedEntry = state.entries.find(entry => entry.id === action.payload);
        
        // Remove from entries array
        state.entries = state.entries.filter(entry => entry.id !== action.payload);
        
        // Update daily total if entry was for today
        if (deletedEntry) {
          const today = new Date().toDateString();
          if (new Date(deletedEntry.date).toDateString() === today) {
            state.dailyTotal -= deletedEntry.calories;
          }
        }
        
        state.success = true;
      })
      .addCase(deleteCalorieEntry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { reset } = calorieSlice.actions;
export default calorieSlice.reducer;