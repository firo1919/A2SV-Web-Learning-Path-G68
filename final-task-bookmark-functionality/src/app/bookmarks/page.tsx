"use client";

import { Poppins } from "next/font/google";
import { ImSpinner2 } from "react-icons/im";
import BookmarkCard from "../components/BookmarkCard";
import { useGetBookmarksQuery } from "../store/features/api/bookmarksSlice";
import { Bookmark } from "../types/bookmarks";

const poppins = Poppins({
	subsets: ["latin"],
	display: "swap",
	weight: "900",
});

export default function BookmarksPage() {
	const { data: bookmarks = [], isLoading, isSuccess, isError, error } = useGetBookmarksQuery();
	if (isError) {
		console.log(error);
		throw new Error();
	}
	if (isSuccess) {
		console.log(bookmarks);
	}
	return (
		<div className=" w-[919px] mx-auto">
			<div className="mb-8">
				<h1 className={`${poppins.className} text-[32px] mb-1`}>Bookmarks</h1>
				<p className="text-[16px] text-[#7C8493]">Showing {bookmarks.length} results</p>
			</div>
			<div className="relative flex flex-col gap-[35px]">
				{isSuccess &&
					bookmarks.map((bookmark: Bookmark) => <BookmarkCard key={bookmark.eventID} bookmark={bookmark} />)}
				{isLoading && (
					<div
						className="absolute top-0 left-0 mt-20 right-0 flex items-center justify-center
	                    bg-white opacity-50"
					>
						<ImSpinner2 className="text-7xl animate-spin" />
					</div>
				)}
			</div>
		</div>
	);

	return <h1>hello</h1>;
}
