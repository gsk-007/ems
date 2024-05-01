import { apiSlice } from "./apiSlice";
const DEPARTMENT_URL = "/api/department";

export const departmentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDepartments: builder.mutation({
      query: () => ({
        url: `${DEPARTMENT_URL}/`,
        method: "GET",
      }),
    }),
    createDepartment: builder.mutation({
      query: (data) => ({
        url: `${DEPARTMENT_URL}/`,
        method: "POST",
        body: data,
      }),
    }),
    updateDepartment: builder.mutation({
      query: ({ id, data }) => ({
        url: `${DEPARTMENT_URL}/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteDepartment: builder.mutation({
      query: (data) => ({
        url: `${DEPARTMENT_URL}/${data.id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetDepartmentsMutation,
  useCreateDepartmentMutation,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
} = departmentApiSlice;
