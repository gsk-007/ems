import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  leaveApprovals: null,
};

const leaveApprovalSlice = createSlice({
  name: "leaveApproval",
  initialState,
  reducers: {
    setLeaveApproval: (state, action) => {
      state.leaveApprovals = action.payload;
    },
  },
});

export const { setLeaveApproval } = leaveApprovalSlice.actions;

export default leaveApprovalSlice.reducer;
