export interface BookmarkResponse {
	success: boolean;
	message: string;
	data: [
		{
			eventID: string;
			title: string;
			opType: string;
			orgName: string;
			datePosted: string;
			dateBookmarked: string;
			logoUrl: string;
			location: string;
		}
	];
}

export interface Bookmark {
	eventID: string;
	title: string;
	opType: string;
	orgName: string;
	datePosted: string;
	dateBookmarked: string;
	logoUrl: string;
	location: string;
}
