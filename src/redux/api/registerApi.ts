import baseApi from "./baseApi";

const registerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    userRegistration: builder.mutation({
      query: (data) => ({
        url: `/auth/register`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    userLogin: builder.mutation({
      query: (data) => ({
        url: `/auth/login`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    userStore: builder.mutation({
      query: (data) => ({
        url: `/auth/social/login`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useUserRegistrationMutation,
  useUserLoginMutation,
  useUserStoreMutation
} = registerApi;
