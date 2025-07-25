import { PostsResponse } from "@/app/types/jobPost";
import { auth } from "@/auth";

const baseUrl = process.env.API_URL;

export async function GET() {
	console.log("Fetching jobPosts");
	const session = await auth();
	const response = await fetch(`${baseUrl}opportunities/search`, {
		headers: { Authorization: `Bearer ${session?.user.accessToken}` },
	});
	const jobPosts: PostsResponse = await response.json();
	console.log("Successfully fetched jobPosts", jobPosts);
	return new Response(JSON.stringify(jobPosts.data));
}
