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

    userGoogleLogin: builder.mutation({
      query: (data) => ({
        url: `/auth/google`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    userFacebookLogin: builder.mutation({
      query: (data) => ({
        url: `/auth/facebook`,
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
  useUserGoogleLoginMutation,
  useUserFacebookLoginMutation,
} = registerApi;
