import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
	interface Session {
		user: {
			id: string;
			name: string;
			email: string;
			image: string;
			accessToken: string;
			refreshToken: string;
			role: string;
			profileComplete: boolean;
			profileStatus: string;
		} & DefaultSession;
	}

	interface User extends DefaultUser {
		id: string;
		name: string;
		email: string;
		image: string;
		accessToken: string;
		refreshToken: string;
		role: string;
		profileComplete: boolean;
		profileStatus: string;
	}
}

declare module "next-auth/jwt" {
	interface JWT extends DefaultJWT {
		id: string;
		name: string;
		email: string;
		image: string;
		accessToken: string;
		refreshToken: string;
		role: string;
		profileComplete: boolean;
		profileStatus: string;
	}
}
