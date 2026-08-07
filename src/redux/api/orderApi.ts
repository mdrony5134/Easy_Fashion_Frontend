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
  }),
});

export const {
    useGetMyOrdersQuery,
} = orderApi;
