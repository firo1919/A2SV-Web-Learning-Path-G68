"use client";
import { Poppins } from "next/font/google";
import { CiCircleCheck } from "react-icons/ci";
import { FaRegCalendarCheck } from "react-icons/fa";
import { FaCirclePlus, FaFireFlameCurved, FaLocationDot, FaRegCalendarPlus } from "react-icons/fa6";
import { useGetJobPostQuery } from "../store/features/api/jobsSlice";
import Category from "./Category";
import Skill from "./Skill";

interface Props {
	jobId: string;
}

const poppins = Poppins({
	display: "swap",
	subsets: ["latin"],
	weight: "900",
});

function JobDetail({ jobId }: Props) {
	const { data: jobPost, isSuccess, isError, error } = useGetJobPostQuery(jobId);
	if (isError) {
		console.log(error);
	}

	function formatDate(date: Date) {
		return `${date.toLocaleString("default", { month: "short" })} ${date.getDay()}, ${date.getFullYear()}`;
	}

	function parseDate(date: string) {
		const parseDate = Date.parse(date);
		return new Date(parseDate);
	}
	if (isSuccess && jobPost) {
		const responsibilities = jobPost.responsibilities.split(".").filter((j: string) => j.trim() !== "");
		const idealCandidate = jobPost.idealCandidate.split(".").filter((c: string) => c.trim() !== "");
		return (
			<div className="flex gap-[62px]">
				<div className="flex flex-col gap-14">
					<div className="">
						<h1 className={`${poppins.className} text-2xl mb-4`}>Description</h1>
						<p className="leading-7">{jobPost.description}</p>
					</div>
					<div className="">
						<h1 className={`${poppins.className} text-2xl mb-4`}>Responsibilities</h1>
						<ul>
							{responsibilities.map((resp: string, id: number) => (
								<div key={id} className="flex items-center gap-2 pb-2">
									<CiCircleCheck className="text-[#26A4FF] text-xl" />
									<p>{resp}</p>
								</div>
							))}
						</ul>
					</div>
					<div className="">
						<h1 className={`${poppins.className} text-2xl mb-4`}>Ideal Candidate we want</h1>
						<ul>
							{idealCandidate.map((trait: string, id: number) => (
								<li key={id} className="list-disc ml-6 leading-7">
									{trait}
								</li>
							))}
						</ul>
					</div>
					<div className="">
						<h1 className={`${poppins.className} text-2xl mb-4`}>When and where</h1>
						<div className="flex items-center gap-2 pb-2">
							<div className="border w-11 h-11 border-[#D6DDEB] rounded-full flex items-center justify-center">
								<FaLocationDot className=" text-[#26A4FF] text-2xl" />
							</div>
							{jobPost.whenAndWhere}
						</div>
					</div>
				</div>
				<div className="flex-1/4 shrink-0 flex flex-col gap-5">
					<div className="">
						<h1 className={`${poppins.className} text-2xl mb-4`}>About</h1>
						<div className="flex flex-col gap-5">
							<div className="flex gap-4">
								<div className="border w-11 h-11 border-[#D6DDEB] rounded-full flex items-center justify-center">
									<FaCirclePlus className="text-[#26A4FF] text-2xl" />
								</div>
								<div className="">
									<div className="text-[16px] font-normal text-[#515B6F]">Posted On</div>
									<div className="text-[16px] font-semibold">
										{formatDate(parseDate(jobPost.datePosted))}
									</div>
								</div>
							</div>
							<div className="flex gap-4">
								<div className="border w-11 h-11 border-[#D6DDEB] rounded-full flex items-center justify-center">
									<FaFireFlameCurved className=" text-[#26A4FF] text-2xl " />
								</div>
								<div className="">
									<div className="text-[16px] font-normal text-[#515B6F]">Deadline</div>
									<div className="text-[16px] font-semibold">
										{formatDate(parseDate(jobPost.deadline))}
									</div>
								</div>
							</div>
							<div className="flex gap-4">
								<div className="border w-11 h-11 border-[#D6DDEB] rounded-full flex items-center justify-center">
									<FaLocationDot className="text-[#26A4FF] text-2xl" />
								</div>
								<div className="">
									<div className="text-[16px] font-normal text-[#515B6F]">Location</div>
									<div className="text-[16px] font-semibold">{jobPost.location}</div>
								</div>
							</div>
							<div className="flex gap-4">
								<div className="border w-11 h-11 border-[#D6DDEB] rounded-full flex items-center justify-center">
									<FaRegCalendarPlus className="text-[#26A4FF] text-2xl" />
								</div>
								<div className="">
									<div className="text-[16px] font-normal text-[#515B6F]">Start Date</div>
									<div className="text-[16px] font-semibold">
										{formatDate(parseDate(jobPost.startDate))}
									</div>
								</div>
							</div>
							<div className="flex gap-4">
								<div className="border w-11 h-11 border-[#D6DDEB] rounded-full flex items-center justify-center">
									<FaRegCalendarCheck className="text-[#26A4FF] text-2xl" />
								</div>
								<div className="">
									<div className="text-[16px] font-normal text-[#515B6F]">End Date</div>
									<div className="text-[16px] font-semibold">
										{formatDate(parseDate(jobPost.endDate))}
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="w-full h-[1px] bg-[#D6DDEB]"></div>
					<div className="">
						<h1 className={`${poppins.className} text-2xl mb-4`}>Categories</h1>
						<div className="flex flex-wrap gap-2">
							{jobPost.categories.map((cat: string, id: number) => (
								<Category key={id} category={cat} />
							))}
						</div>
					</div>
					<div className="w-full h-[1px] bg-[#D6DDEB]"></div>
					<div className="">
						<h1 className={`${poppins.className} text-2xl mb-4`}>Required Section</h1>
						<div className="flex flex-wrap gap-2">
							{jobPost.requiredSkills.map((skill: string, id: number) => (
								<Skill key={id} skill={skill} />
							))}
						</div>
					</div>
				</div>
			</div>
		);
	}
}
export default JobDetail;
