import JobListImage from "@/public/job1.png";
import Image from "next/image";
import Link from "next/link";
import type JobPost from "../types/jobPost";
import Category from "./Category";
import JopPlace from "./JopPlace";

interface Props {
	readonly jobpost: JobPost;
}

function JobListCard({ jobpost }: Props) {
	const categories = [];
	for (let i = 0; i < 2 && i < jobpost.categories.length; i += 1) {
		categories.push(jobpost.categories[i]);
	}
	return (
		<Link
			href={`/joblist/${jobpost.id}`}
			className="flex p-6 rounded-[30px] border border-[#D6DDEB] hover:-translate-y-1 hover:shadow-md hover:scale-105 transition delay-150 duration-300"
		>
			<div className="w-[66px] mr-6 relative shrink-0">
				<Image src={JobListImage} fill alt="company image" className=" object-contain object-top" />
			</div>
			<div className="flex flex-col gap-2">
				<p className="text-xl font-semibold">{jobpost.title}</p>
				<div className="flex items-center text-[16px] font-normal text-[#7C8493]">
					<p>{jobpost.orgName}</p>
					<div className="mx-2 w-1 h-1 bg-[#7C8493] rounded-full"></div>
					<p>{jobpost.location.join(", ")}</p>
				</div>
				<p className="text-[16px] leading-7">{jobpost.description}</p>
				<div className="flex gap-2 items-center h-[31px]">
					<JopPlace opType={jobpost.opType} />
					<div className="w-[1px] bg-[#D6DDEB] h-full"></div>
					<div className="flex gap-2">
						{categories.map((cat, id) => (
							<Category key={id} category={cat} />
						))}
					</div>
				</div>
			</div>
		</Link>
	);
}
export default JobListCard;
