import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice";
import authReducer from "./slices/authSlice";
import attendanceReducer from "./slices/attendanceSlice";
import leaveApprovalReducer from "./slices/leaveApprovalSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    attendance: attendanceReducer,
    leaveApproval: leaveApprovalReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
