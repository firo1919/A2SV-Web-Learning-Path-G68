import { BookmarkResponse } from "@/app/types/bookmarks";
import { auth } from "@/auth";

const baseUrl = process.env.API_URL;
export async function GET() {
	const session = await auth();
	console.log("Fetching bookmarks");
	const response = await fetch(`${baseUrl}bookmarks`, {
		headers: { Authorization: `Bearer ${session?.user.accessToken}` },
	});
	const bookmarks: BookmarkResponse = await response.json();
	console.log("Successfully fetched bookmarks", bookmarks);
	return new Response(JSON.stringify(bookmarks.data));
}
