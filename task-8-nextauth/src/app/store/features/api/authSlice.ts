import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

interface User {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
}

interface Response {
	success: boolean;
	message: string;
	count: number;
}

interface ResendOtp {
	email: string;
}

interface Verify {
	email: string;
	OTP: string;
}

export const auth = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
	endpoints: (builder) => ({
		registerUser: builder.mutation<Response, User>({
			// The URL for the request is '/fakeApi/posts'
			query: (data) => ({
				url: "signup",
				method: "POST",
				body: data,
			}),
		}),
		verifyUser: builder.mutation<Response, Verify>({
			query: (data) => ({
				url: "verify-email",
				method: "POST",
				body: data,
			}),
		}),
		resendOtp: builder.mutation<Response, ResendOtp>({
			query: (data) => ({
				url: "/resend-otp",
				method: "POST",
				body: data,
			}),
		}),
	}),
});

export const { useRegisterUserMutation, useVerifyUserMutation, useResendOtpMutation } = auth;
