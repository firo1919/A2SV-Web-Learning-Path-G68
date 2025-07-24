import { AuthResponse, Verify } from "@/app/types/auth";

const baseUrl = process.env.API_URL;

export async function POST(request: Request) {
	const data: Verify = await request.json();
	console.log("Starting email verification");
	const response = await fetch(`${baseUrl}verify-email`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});

	const res: AuthResponse = await response.json();
	console.log("Completed email verification", res);

	return new Response(JSON.stringify(res));
}
