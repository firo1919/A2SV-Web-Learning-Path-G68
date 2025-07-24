import { PostsResponse } from "@/app/types/jobPost";

const baseUrl = process.env.API_URL;

export async function GET() {
	console.log("Fetching jobPosts");
	const response = await fetch(`${baseUrl}opportunities/search`);
	const jobPosts: PostsResponse = await response.json();
	console.log("Successfully fetched jobPosts", jobPosts);
	return new Response(JSON.stringify(jobPosts.data));
}
