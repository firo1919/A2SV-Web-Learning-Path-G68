export interface User {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
}

export interface AuthResponse {
	success: boolean;
	message: string;
	count: number;
}

export interface ResendOtp {
	email: string;
}

export interface Verify {
	email: string;
	OTP: string;
}
