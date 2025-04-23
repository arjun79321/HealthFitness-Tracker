import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  alerts: []
};

export const alertSlice = createSlice({
  name: 'alerts',
  initialState,
  reducers: {
    setAlert: (state, action) => {
      state.alerts.push({
        id: Date.now(),
        message: action.payload.message,
        type: action.payload.type,
        timeout: action.payload.timeout || 5000
      });
    },
    removeAlert: (state, action) => {
      state.alerts = state.alerts.filter(alert => alert.id !== action.payload);
    }
  }
});

export const { setAlert, removeAlert } = alertSlice.actions;
export default alertSlice.reducer;