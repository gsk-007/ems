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
    updateLeaveRequest: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `${LEAVE_URL}/request/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    getUserLeaveApprovalRequests: builder.mutation({
      query: () => ({
        url: `${LEAVE_URL}/approval`,
        method: "GET",
      }),
    }),
    updateUserLeaveApprovalRequest: builder.mutation({
      query: (data) => ({
        url: `${LEAVE_URL}/approval`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetUserLeavesMutation,
  useCreateUserLeavesMutation,
  useGetUserLeaveRequestsMutation,
  useUpdateLeaveRequestMutation,
  useGetUserLeaveApprovalRequestsMutation,
  useUpdateUserLeaveApprovalRequestMutation,
} = leaveApiSlice;
