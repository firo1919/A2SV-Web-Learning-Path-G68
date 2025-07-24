import { AuthResponse, User } from "@/app/types/auth";

const baseUrl = process.env.API_URL;

export async function POST(request: Request) {
	const data: User = await request.json();
	console.log("Starting registration");
	const response = await fetch(`${baseUrl}signup`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});

	const res: AuthResponse = await response.json();
	console.log("Completed registration", res);

	return new Response(JSON.stringify(res));
}
