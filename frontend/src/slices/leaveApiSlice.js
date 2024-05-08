import { apiSlice } from "./apiSlice";
const LEAVE_URL = "/api/leave";

export const leaveApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserLeaves: builder.mutation({
      query: () => ({
        url: `${LEAVE_URL}`,
        method: "GET",
      }),
    }),
    createUserLeaves: builder.mutation({
      query: (data) => ({
        url: `${LEAVE_URL}/request`,
        method: "POST",
        body: data,
      }),
    }),
    getUserLeaveRequests: builder.mutation({
      query: () => ({
        url: `${LEAVE_URL}/request`,
        method: "GET",
      }),
    }),
    getUserLeaveApprovalRequests: builder.mutation({
      query: () => ({
        url: `${LEAVE_URL}/approval`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetUserLeavesMutation,
  useCreateUserLeavesMutation,
  useGetUserLeaveRequestsMutation,
  useGetUserLeaveApprovalRequestsMutation,
} = leaveApiSlice;
