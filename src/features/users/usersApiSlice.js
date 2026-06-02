// src/features/users/userApiSlice.js

import { apiSlice } from "../../api/umaxApiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: ({ page = 1, limit = 10 }) =>
        `/admin/users?page=${page}&limit=${limit}`,
      providesTags: ["Users"],
    }),

    getUserById: builder.query({
      query: (id) => `/admin/users/${id}`,
      providesTags: (result, error, id) => [
        { type: "Users", id },
      ],
    }),
    blockUser: builder.mutation({
      query: (credentials) => ({
        url: "Admin/userBlock",
        method: "POST",
        body: credentials,
      }),
    }),
    sendTransaction: builder.mutation({
      query: (credentials) => ({
        url: "Admin/send_transaction_user",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useBlockUserMutation,
  useSendTransactionMutation,
} = userApiSlice;