import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../../services/authService';

// Register user
export const register = createAsyncThunk(
  'auth/register',
  async (userData, thunkAPI) => {
    try {
      return await authService.register(userData);
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// Login user
export const login = createAsyncThunk(
    'auth/login',
    async (userData, thunkAPI) => {
      try {
        return await authService.login(userData);
      } catch (error) {
        const message = error.response?.data?.message || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
  );
  
  // Logout user
  export const logout = createAsyncThunk('auth/logout', async () => {
    await authService.logout();
  });
  
  const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    isAuthenticated: localStorage.getItem('user') ? true : false,
    loading: false,
    error: null
  };
  
  export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      reset: (state) => {
        state.loading = false;
        state.error = null;
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(register.pending, (state) => {
          state.loading = true;
        })
        .addCase(register.fulfilled, (state, action) => {
          state.loading = false;
          state.isAuthenticated = true;
          state.user = action.payload;
        })
        .addCase(register.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
          state.user = null;
          state.isAuthenticated = false;
        })
        .addCase(login.pending, (state) => {
          state.loading = true;
        })
        .addCase(login.fulfilled, (state, action) => {
          state.loading = false;
          state.isAuthenticated = true;
          state.user = action.payload;
        })
        .addCase(login.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
          state.user = null;
          state.isAuthenticated = false;
        })
        .addCase(logout.fulfilled, (state) => {
          state.user = null;
          state.isAuthenticated = false;
        });
    }
  });
  
  export const { reset } = authSlice.actions;
  export default authSlice.reducer;
  

  