import { apiSlice } from "../../api/umaxApiSlice";

export const bonusTransactionsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBonusTransactions: builder.query({
      query: (queryParams = "") => ({
        url: `admin/bonus/transactions${queryParams ? `?${queryParams}` : ""}`,
        method: "GET",
      }),
      providesTags: ["BonusTransactions"],
    }),

    getBonusTransactionById: builder.query({
      query: (transactionId) => ({
        url: `admin/bonus/transactions/${transactionId}`,
        method: "GET",
      }),
      providesTags: ["BonusTransactions"],
    }),
  }),
});

export const {
  useGetBonusTransactionsQuery,
  useGetBonusTransactionByIdQuery,
} = bonusTransactionsApiSlice;