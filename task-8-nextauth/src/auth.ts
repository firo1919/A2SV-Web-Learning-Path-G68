import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [Google],
	callbacks: {
		authorized: async ({ auth }) => {
			console.log("auth checking", auth);
			return !!auth?.user;
		},
	},
	pages: {
		signIn: "/login",
		newUser: "/register",
	},
});
