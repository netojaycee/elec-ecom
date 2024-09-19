// src/service/dummyData.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { clearCredentials, setCredentials } from "./slices/authSlice";
import { clearUserInfo } from "./slices/userSlice";
import { setUserInfo } from "./slices/userSlice";
import { jwtDecode } from "jwt-decode";

const baseQuery = fetchBaseQuery({
  // baseUrl: "http://localhost:5000/api/",
  baseUrl: "https://powermartelectricals.com/api/",
  prepareHeaders: (headers, { getState }) => {
    headers.set("Content-Type", "application/json");
    const token = getState().auth.token;
    if (token) {
      headers.set("X-auth-token", token); // Use X-auth-token instead of Authorization
    }
    return headers;
  },

  // Custom response handler to handle text responses
  async responseHandler(response) {
    const text = await response.text();
    try {
      return JSON.parse(text);
    } catch {
      return text;
    }
  },
});

export const productsApi = createApi({
  reducerPath: "products",
  baseQuery,
  tagTypes: ["Category", "Product", "AdminOrders", "UserOrders"],
  endpoints: (builder) => ({
    getAllProduct: builder.query({
      query: () => "/products",
      providesTags: ["Product"],
    }),
    getAllCategory: builder.query({
      query: () => "/categories",
      providesTags: ["Category"],
    }),
    getAllUserOrders: builder.query({
      query: (id) => `/my-orders/${id}`,
      providesTags: ["UserOrders"],
    }),
    getAllOrders: builder.query({
      query: () => `/orders/`,
      providesTags: ["AdminOrders"],
    }),
    getAllUsers: builder.query({
      query: () => `/users/`,
    }),

    addCategory: builder.mutation({
      query: (credentials) => ({
        url: "/category",
        method: "POST",
        body: credentials,
      }),

      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          // console.log("registered");
          await queryFulfilled;
        } catch (err) {
          // console.error("category add failed:", err);
        }
      },
      invalidatesTags: ["Category"],
    }),
    editCategory: builder.mutation({
      query: ({ slug, credentials }) => ({
        url: `categories/${slug}`,
        method: "PUT",
        body: credentials,
      }),

      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          // console.log("registered");
          await queryFulfilled;
        } catch (err) {
          // console.error("category add failed:", err);
        }
      },
      invalidatesTags: ["Category"],
    }),
    addProduct: builder.mutation({
      query: (credentials) => ({
        url: "/products",
        method: "POST",
        body: credentials,
      }),

      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          // console.log("registered");
          await queryFulfilled;
        } catch (err) {
          // console.error("product add failed:", err);
        }
      },
      invalidatesTags: ["Product"],
    }),
    editProduct: builder.mutation({
      query: ({ slug, credentials }) => ({
        url: `products/${slug}`,
        method: "PATCH",
        body: credentials,
      }),

      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          // console.log("registered");
          await queryFulfilled;
        } catch (err) {
          // console.error("product edit failed:", err);
        }
      },
      invalidatesTags: ["Product"],
    }),
    markOrder: builder.mutation({
      query: ({ credentials, id }) => ({
        url: `orders/${id}`,
        method: "PATCH",
        body: credentials,
      }),
      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (err) {
          // console.error("failed to update order status:", err);
        }
      },
      invalidatesTags: ["UserOrders", "AdminOrders"],
    }),
    payment: builder.mutation({
      query: (credentials) => ({
        url: `paystack/pay`,
        method: "POST",
        body: credentials,
      }),
      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (err) {
          // console.error("failed to pay for service:", err);
        }
      },
    }),
    getVerifyPayment: builder.query({
      query: (reference) => `paystack/verify/${reference}`,
    }),

    forgotPass: builder.mutation({
      query: (credentials) => ({
        url: "/forgot-password",
        method: "POST",
        body: credentials,
      }),
      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (err) {
          // console.error("Reset Link send  failed:", err);
        }
      },
    }),

    resetPass: builder.mutation({
      query: ({ credentials, token }) => ({
        url: `/reset-password/${token}`,
        method: "POST",
        body: credentials,
      }),
      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (err) {
          // console.error("Reset Link send  failed:", err);
        }
      },
    }),
    editUser: builder.mutation({
      query: ({ credentials, id }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: credentials,
      }),
      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (err) {
          // console.error("update failed:", err);
        }
      },
    }),
    editUserPassword: builder.mutation({
      query: ({ credentials, id }) => ({
        url: `/users/${id}/password`,
        method: "PATCH",
        body: credentials,
      }),
      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (err) {
          // console.error("update password  failed:", err);
        }
      },
    }),
    contact: builder.mutation({
      query: (credentials) => ({
        url: `/contact`,
        method: "POST",
        body: credentials,
      }),
      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (err) {
          // console.error("Reset Link send  failed:", err);
        }
      },
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const response = await queryFulfilled;
          const token = response.data; // Assuming the response data is the JWT

          const decodedToken = jwtDecode(token);

          // Extract required fields from the decoded token
          const { name, email, isAdmin, _id, phoneNumber, address } =
            decodedToken;

          // Dispatch actions with decoded data
          dispatch(setCredentials({ token }));
          dispatch(
            setUserInfo({
              name,
              email,
              isAdmin,
              _id,
              address,
              phoneNumber,
            })
          );

          // console.log("Login successful:");
        } catch (err) {
          // console.error("Login failed:", err);
        }
      },
    }),

    register: builder.mutation({
      query: (credentials) => ({
        url: "/register",
        method: "POST",
        body: credentials,
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          // console.log("registered");
          const response = await queryFulfilled;
          const token = response.data; // Assuming the response data is the JWT

          const decodedToken = jwtDecode(token);

          // Extract required fields from the decoded token
          const { name, email, isAdmin, _id, address, phoneNumber } =
            decodedToken;

          // Dispatch actions with decoded data
          dispatch(setCredentials({ token }));
          dispatch(
            setUserInfo({ name, email, isAdmin, _id, address, phoneNumber })
          );
        } catch (err) {
          //   console.error("Register failed:", err);
        }
      },
    }),

    logout: builder.mutation({
      queryFn: () => ({ data: null }), // No API call, just return success
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          dispatch(clearCredentials());
          dispatch(clearUserInfo());
        } catch (err) {
          // console.error("Logout failed:", err);
        }
      },
    }),

    deleteCategory: builder.mutation({
      query: (credentials) => ({
        url: `categories/${credentials}`,
        method: "DELETE",
        // body: credentials,
      }),
      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (err) {
          // console.error("fetch failed:", err);
        }
      },
      invalidatesTags: ["Category"],
    }),
    deleteProduct: builder.mutation({
      query: (credentials) => ({
        url: `products/${credentials}`,
        method: "DELETE",
        // body: credentials,
      }),
      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (err) {
          // console.error("fetch failed:", err);
        }
      },
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useLoginMutation,
  useContactMutation,
  useForgotPassMutation,
  useResetPassMutation,
  useEditUserMutation,
  useEditUserPasswordMutation,
  useRegisterMutation,
  useGetAllProductQuery,
  useGetVerifyPaymentQuery,
  useGetAllCategoryQuery,
  useGetAllUserOrdersQuery,
  useGetAllOrdersQuery,
  useGetAllUsersQuery,
  useAddCategoryMutation,
  useEditCategoryMutation,
  useAddProductMutation,
  useEditProductMutation,

  useLogoutMutation,
  useMarkOrderMutation,
  usePaymentMutation,

  useDeleteCategoryMutation,
  useDeleteProductMutation,
} = productsApi;
