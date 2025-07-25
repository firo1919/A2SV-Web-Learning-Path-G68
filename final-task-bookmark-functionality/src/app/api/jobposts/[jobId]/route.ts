import { PostResponse } from "@/app/types/jobPost";
import { auth } from "@/auth";

const baseUrl = process.env.API_URL;

export async function GET(request: Request, { params }: { params: Promise<{ jobId: string }> }) {
	const jobId = (await params).jobId;
	const session = await auth();

	console.log("Fetching jobPost", jobId);
	const response = await fetch(`${baseUrl}opportunities/${jobId}`, {
		headers: { Authorization: `Bearer ${session?.user.accessToken}` },
	});
	const jobPost: PostResponse = await response.json();
	console.log("Successfully fetched jobPost", jobPost);
	return new Response(JSON.stringify(jobPost.data));
}
