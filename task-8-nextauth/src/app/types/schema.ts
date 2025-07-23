import * as z from "zod";

export const UserRegisterSchema = z
	.object({
		fullname: z
			.string()
			.min(1, "Full name is required")
			.refine((val) => val.trim().split(" ").length >= 2, {
				message: "Please enter your full name (at least two words)",
			}),
		email: z.email("Invalid email address"),
		password: z.string().min(6, "Password must be at least 6 characters"),
		confirmPass: z.string(),
	})
	.refine((data) => data.password === data.confirmPass, {
		message: "Passwords do not match",
		path: ["confirmPass"],
	});

export const UserLoginSchema = z.object({
	email: z.email("Invalid email address"),
	password: z.string().min(6, "Password must be at least 6 characters"),
});
