import { apiSlice } from "./apiSlice";
const ATTENDANCE_URL = "/api/attendance";

export const attendanceApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAttendance: builder.mutation({
      query: (data) => ({
        url: `${ATTENDANCE_URL}/?month=${data.month}&year=${data.year}`,
        method: "GET",
      }),
    }),
    createAttendance: builder.mutation({
      query: (data) => ({
        url: `${ATTENDANCE_URL}/${data.id}`,
        method: "POST",
        body: { status: data.status, date: data.date },
      }),
    }),
  }),
});

export const { useGetAttendanceMutation, useCreateAttendanceMutation } =
  attendanceApiSlice;
