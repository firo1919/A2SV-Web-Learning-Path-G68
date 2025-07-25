import { BookmarkResponse } from "@/app/types/bookmarks";
import { auth } from "@/auth";
const baseUrl = process.env.API_URL;

export async function POST(request: Request, { params }: { params: Promise<{ eventId: string }> }) {
	const eventId = (await params).eventId;
	const session = await auth();
	console.log("Adding to bookmark");
	const response = await fetch(`${baseUrl}bookmarks/${eventId}`, {
		headers: { Authorization: `Bearer ${session?.user.accessToken}` },
		method: "POST",
		body: "",
	});
	const bookmark: BookmarkResponse = await response.json();
	console.log("Successfully added bookmark", bookmark);
	return new Response(JSON.stringify(bookmark.data));
}

export async function DELETE(request: Request, { params }: { params: Promise<{ eventId: string }> }) {
	const eventId = (await params).eventId;
	const session = await auth();
	console.log("Removing from bookmark");
	const response = await fetch(`${baseUrl}bookmarks/${eventId}`, {
		headers: { Authorization: `Bearer ${session?.user.accessToken}` },
		method: "DELETE",
		body: "",
	});
	const bookmark: BookmarkResponse = await response.json();
	console.log("Successfully removed bookmark", bookmark);
	return new Response(JSON.stringify(bookmark.data));
}
