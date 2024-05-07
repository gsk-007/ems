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
        url: `${LEAVE_URL}`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetUserLeavesMutation, useCreateUserLeavesMutation } =
  leaveApiSlice;
