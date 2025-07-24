import { AuthResponse, ResendOtp } from "@/app/types/auth";

const baseUrl = process.env.API_URL;

export async function POST(request: Request) {
	const data: ResendOtp = await request.json();
	console.log("Starting otp request");
	const response = await fetch(`${baseUrl}resend-otp`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});

	const res: AuthResponse = await response.json();
	console.log("Completed otp request", res);

	return new Response(JSON.stringify(res));
}
