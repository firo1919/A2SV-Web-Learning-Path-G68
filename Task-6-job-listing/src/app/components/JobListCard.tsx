import JobListImage from "@/public/job1.png";
import Image from "next/image";
import Link from "next/link";
import type JobPost from "../types/jobPost";

interface Props {
	readonly jobpost: JobPost;
}

function JobListCard({ jobpost }: Props) {
	return (
		<Link href={`/joblist/${jobpost.id}`} className="flex p-6 rounded-[30px] border border-[#D6DDEB]">
			<div className="w-[66px] mr-6 relative shrink-0">
				<Image src={JobListImage} fill alt="company image" className=" object-contain object-top" />
			</div>
			<div className="flex flex-col gap-2">
				<p className="text-xl font-semibold">{jobpost.title}</p>
				<div className="flex items-center text-[16px] font-normal text-[#7C8493]">
					<p>{jobpost.company}</p>
					<div className="mx-2 w-1 h-1 bg-[#7C8493] rounded-full"></div>
					<p>{jobpost.about.location}</p>
				</div>
				<p className="text-[16px] leading-7">{jobpost.description}</p>
				<div className="flex gap-2 items-center h-[31px]">
					<div className="bg-green-100 text-[#56CDAD] text-[12px] font-semibold w-[76px] h-full flex items-center justify-center rounded-full">
						In Person
					</div>
					<div className="w-[1px] bg-[#D6DDEB] h-full"></div>
					<div className="text-[12px] text-yellow-400 border border-yellow-400 font-semibold w-[81px] h-full flex items-center justify-center rounded-full">
						Education
					</div>
					<div className="text-[12px] text-[#4640DE] border border-[#4640DE] font-semibold w-[60px] h-full flex items-center justify-center rounded-full">
						IT
					</div>
				</div>
			</div>
		</Link>
	);
}
export default JobListCard;
