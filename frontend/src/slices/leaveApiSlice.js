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
  }),
});

export const { useGetUserLeavesMutation } = leaveApiSlice;
