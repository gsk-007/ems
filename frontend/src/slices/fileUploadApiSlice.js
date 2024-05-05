import { apiSlice } from "./apiSlice";
const UPLOAD_URL = "/api/upload";

export const fileUploadApiSLice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    upload: builder.mutation({
      query: (data) => ({
        url: `${UPLOAD_URL}`,
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: data,
      }),
    }),
  }),
});

export const { useUploadMutation } = fileUploadApiSLice;
