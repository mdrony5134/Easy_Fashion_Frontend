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

     getSingleProduct: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
      providesTags: ["products"],
    }),

     getHomeSummary: builder.query({
      query: () => ({
        url: `/home/summary`,
        method: "GET",
      }),
      providesTags: ["products"],
    }),
     getCategory: builder.query({
      query: () => ({
        url: `/categories`,
        method: "GET",
      }),
      providesTags: ["products"],
    }),
     getStyles: builder.query({
      query: () => ({
        url: `/styles`,
        method: "GET",
      }),
      providesTags: ["products"],
    }),
     getSizes: builder.query({
      query: () => ({
        url: `/sizes`,
        method: "GET",
      }),
      providesTags: ["products"],
    }),
  }),
});

export const {
    useGetProductListQuery,
    useGetSingleProductQuery,
    useGetHomeSummaryQuery,
    useGetCategoryQuery,
    useGetStylesQuery,
    useGetSizesQuery,
} = productApi;
