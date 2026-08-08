import baseApi from "./baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyOrders: builder.query({
      query: () => ({
        url: `/orders/my`,
        method: "GET",
      }),
      providesTags: ["orders"],
    }),
    createOrder: builder.mutation({
      query: (data) => ({
        url: `/orders/checkout`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["orders"],
    }),
  }),
});

export const { useGetMyOrdersQuery, useCreateOrderMutation } = orderApi;
