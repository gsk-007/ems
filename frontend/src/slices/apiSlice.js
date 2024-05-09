import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// empty string because we are using a proxy
export const baseQuery = fetchBaseQuery({
  baserUrl: "http://localhost:5000/api/",
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["User"],
  endpoints: (builder) => ({}),
});
