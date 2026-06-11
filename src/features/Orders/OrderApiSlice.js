import { apiSlice } from "../../api/umaxApiSlice";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: (queryParams = "") => ({
        url: `admin/orders${queryParams ? `?${queryParams}` : ""}`,
        method: "GET",
      }),
      providesTags: ["Orders"],
    }),

    getOrderLogs: builder.query({
      query: ({ orderId, queryParams = "" }) => ({
        url: `admin/orders/${orderId}/logs${
          queryParams ? `?${queryParams}` : ""
        }`,
        method: "GET",
      }),
      providesTags: ["OrderLogs"],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetOrderLogsQuery,
} = orderApiSlice;