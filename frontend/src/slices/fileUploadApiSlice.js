import { apiSlice } from "./apiSlice";
const UPLOAD_URL = "/api/upload";

export const fileUploadApiSLice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadFile: builder.mutation({
      query: (data) => ({
        url: `${UPLOAD_URL}`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useUploadFileMutation } = fileUploadApiSLice;
