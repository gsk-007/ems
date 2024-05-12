import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  attendance: null,
};

const attendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {
    setAttendance: (state, action) => {
      state.attendance = action.payload;
    },
    removeAttendance: (state) => {
      state.attendance = null;
    },
  },
});

export const { setAttendance, removeAttendance } = attendanceSlice.actions;

export default attendanceSlice.reducer;
