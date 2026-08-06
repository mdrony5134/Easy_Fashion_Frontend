import baseApi from "./baseApi";

const userApi = baseApi.injectEndpoints({
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
} = userApi;
