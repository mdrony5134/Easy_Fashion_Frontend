import baseApi from "./baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProductList: builder.query({
      query: ({
        page,
        limit,
        category,
        style,
        size,
        search
      }) => {
        const params = new URLSearchParams();

        params.append("page", page);
        params.append("limit", limit);

        if (category) params.append("category", category);
        if (style) params.append("style", style);
        if (size) params.append("size", size);
        if (search) params.append("search", search);

        return {
          url: `/products?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["products"],
    }),
  }),
});

export const {
    useGetProductListQuery,
} = productApi;
