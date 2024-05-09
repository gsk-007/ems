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
        body: { status: data.status, date: data.date, time_in: data.time_in },
      }),
    }),
    updateAttendance: builder.mutation({
      query: (data) => ({
        url: `${ATTENDANCE_URL}/${data.id}`,
        method: "PUT",
        body: { date: data.date, time_out: data.time_out },
      }),
    }),
  }),
});

export const {
  useGetAttendanceMutation,
  useCreateAttendanceMutation,
  useUpdateAttendanceMutation,
} = attendanceApiSlice;
