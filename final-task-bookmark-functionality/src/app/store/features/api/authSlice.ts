import { AuthResponse, ResendOtp, User, Verify } from "@/app/types/auth";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = `/api/auth/`;

export const auth = createApi({
	reducerPath: "authapi",
	baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
	endpoints: (builder) => ({
		registerUser: builder.mutation<AuthResponse, User>({
			// The URL for the request is '/fakeApi/posts'
			query: (data) => ({
				url: "register",
				method: "POST",
				body: data,
			}),
		}),
		verifyUser: builder.mutation<AuthResponse, Verify>({
			query: (data) => ({
				url: "verify-email",
				method: "POST",
				body: data,
			}),
		}),
		resendOtp: builder.mutation<AuthResponse, ResendOtp>({
			query: (data) => ({
				url: "resend-otp",
				method: "POST",
				body: data,
			}),
		}),
	}),
});

export const { useRegisterUserMutation, useVerifyUserMutation, useResendOtpMutation } = auth;
