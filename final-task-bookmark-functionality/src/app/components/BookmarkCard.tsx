import Image from "next/image";
import Link from "next/link";
import { Bookmark } from "../types/bookmarks";
import JopPlace from "./JopPlace";

interface Props {
	readonly bookmark: Bookmark;
}

function BookmarkCard({ bookmark }: Props) {
	return (
		<div className="relative flex p-6 rounded-[30px] border border-[#D6DDEB] hover:-translate-y-1 hover:shadow-md hover:scale-105 transition delay-150 duration-300">
			<div className="w-[66px] mr-6 relative shrink-0">
				<Image
					src={bookmark.logoUrl || "/job1.png"}
					fill
					alt="company image"
					className=" object-contain object-top"
				/>
			</div>
			<div className="flex flex-col gap-2">
				<p className="text-xl font-semibold">{bookmark.title}</p>
				<div className="flex items-center text-[16px] font-normal text-[#7C8493]">
					<p>{bookmark.orgName}</p>
					<div className="mx-2 w-1 h-1 bg-[#7C8493] rounded-full"></div>
					<p>{bookmark.location}</p>
				</div>
				<div className="flex gap-2 items-center h-[31px]">
					<JopPlace opType={bookmark.opType} />
				</div>
			</div>
			<Link href={`/joblist/${bookmark.eventID}`} className="absolute top-0 left-0 bottom-0 w-3/4"></Link>
		</div>
	);
}
export default BookmarkCard;
