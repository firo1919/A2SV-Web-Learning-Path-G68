import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { UserLoginSchema } from "./app/types/schema";

interface LoginResponse {
	success: boolean;
	message: string;
	data?: {
		id: string;
		accessToken: string;
		refreshToken: string;
		name: string;
		email: string;
		profilePicUrl: string;
		role: string;
		profileComplete: boolean;
		profileStatus: string;
	};
}

const baseUrl = process.env.API_URL;

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		Google({
			profile(profile) {
				return { role: profile.role ?? "user", ...profile };
			},
		}),
		Credentials({
			credentials: {
				email: {
					type: "email",
					label: "Email Address",
					placeholder: "Enter email address",
				},
				password: {
					type: "password",
					label: "Password",
					placeholder: "Enter password",
				},
			},
			authorize: async (credentials) => {
				console.log("Attempting authorization with credentials:", credentials);
				try {
					const { email, password } = await UserLoginSchema.parseAsync(credentials);

					const responseData = await loginUser(email, password);
					console.log("Response from loginUser:", responseData);

					if (!responseData || !responseData.success || !responseData.data) {
						console.log("Login failed: No data or success is false.");
						return null;
					}

					const user = {
						id: responseData.data.id,
						name: responseData.data.name,
						email: responseData.data.email,
						image: responseData.data.profilePicUrl || "",
						accessToken: responseData.data.accessToken,
						refreshToken: responseData.data.refreshToken,
						role: responseData.data.role,
						profileComplete: responseData.data.profileComplete,
						profileStatus: responseData.data.profileStatus,
					};

					console.log("User successfully authorized:", user);
					return user;
				} catch (error) {
					console.error("Error during authorization:", error);
					return null;
				}
			},
		}),
	],
	callbacks: {
		authorized: async ({ auth }) => {
			console.log("Checking authorization status:", auth);
			return !!auth?.user;
		},
		jwt({ token, user }) {
			if (user) token.role = user.role;
			if (user) token.id = user.id;
			if (user) token.name = user.name;
			if (user) token.email = user.email;
			if (user) token.image = user.image;
			if (user) token.accessToken = user.accessToken;
			if (user) token.refreshToken = user.refreshToken;
			if (user) token.role = user.role;
			if (user) token.profileComplete = user.profileComplete;
			if (user) token.profileStatus = user.profileStatus;
			return token;
		},
		session({ session, token }) {
			session.user.role = token.role;
			session.user.id = token.id;
			session.user.name = token.name;
			session.user.email = token.email;
			session.user.image = token.image;
			session.user.accessToken = token.accessToken;
			session.user.refreshToken = token.refreshToken;
			session.user.role = token.role;
			session.user.profileComplete = token.profileComplete;
			session.user.profileStatus = token.profileStatus;
			return session;
		},
	},
	pages: {
		signIn: "/login",
		newUser: "/register",
	},
	session: {
		strategy: "jwt",
	},
	trustHost: true,
});

async function loginUser(email: unknown, password: unknown): Promise<LoginResponse | null> {
	try {
		const url = `${baseUrl}login`;
		console.log(`Attempting to fetch from: ${url}`);

		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email: email, password: password }),
		});

		console.log(`Response status: ${response.status}`);
		console.log(`Response headers:`, response.headers);

		if (!response.ok) {
			const errorText = await response.text();
			console.error(`Backend login API returned an error (${response.status}):`, errorText);
			try {
				const errorJson = JSON.parse(errorText);
				return errorJson as LoginResponse;
			} catch (jsonParseError) {
				console.error("Failed to parse error response as JSON:", jsonParseError);
				return null;
			}
		}

		const data: LoginResponse = await response.json();
		console.log("Successfully parsed JSON data from backend:", data);
		return data;
	} catch (error) {
		console.error("Error during loginUser API call or JSON parsing:", error);
		return null;
	}
}
