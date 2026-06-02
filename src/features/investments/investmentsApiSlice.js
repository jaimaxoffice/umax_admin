// src/features/investments/investmentsApiSlice.js

import { apiSlice } from "../../api/umaxApiSlice";

export const investmentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getInvestments: builder.query({
      query: ({
        page = 1,
        limit = 20,
        userId,
        status,
        startDate,
        endDate,
      } = {}) => {
        const params = new URLSearchParams();

        params.append("page", page);
        params.append("limit", limit);

        if (userId) params.append("userId", userId);
        if (status) params.append("status", status);
        if (startDate) params.append("startDate", startDate);
        if (endDate) params.append("endDate", endDate);

        return `/admin/investments?${params.toString()}`;
      },
      providesTags: ["Investments"],
    }),
  }),
});

export const {
  useGetInvestmentsQuery,
} = investmentsApiSlice;