import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  attendance: localStorage.getItem("attendanceInfo")
    ? JSON.parse(localStorage.getItem("attendanceInfo"))
    : null,
};

const attendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {
    setAttendance: (state, action) => {
      state.attendance = action.payload;
      localStorage.setItem("attendanceInfo", JSON.stringify(action.payload));
    },
    removeAttendance: (state) => {
      state.attendance = null;
      localStorage.removeItem("attendanceInfo");
    },
  },
});

export const { setAttendance, removeAttendance } = attendanceSlice.actions;

export default attendanceSlice.reducer;
