import { Poppins } from "next/font/google";
import { CiCircleCheck, CiLocationOn } from "react-icons/ci";
import { FaRegCalendarCheck, FaRegCalendarPlus } from "react-icons/fa";
import { FaCirclePlus, FaFireFlameCurved, FaLocationDot } from "react-icons/fa6";
import Category from "../../components/Category";
import Skill from "../../components/Skill";
import JobPostService from "../../services/jobPostService";

const poppins = Poppins({
	display: "swap",
	subsets: ["latin"],
	weight: "900",
});

async function JobDescription({ params }: { params: Promise<{ jobId: string }> }) {
	const { jobId } = await params;
	const jobPost = await JobPostService.getJobPost(parseInt(jobId));
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
						{jobPost.responsibilities.map((resp, id) => (
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
						{jobPost.ideal_candidate.traits.map((trait, id) => (
							<li key={id} className="list-disc ml-6 leading-7">
								{trait}
							</li>
						))}
					</ul>
				</div>
				<div className="">
					<h1 className={`${poppins.className} text-2xl mb-4`}>When and where</h1>
					<div className="flex items-center gap-2 pb-2">
						<CiLocationOn className="border w-11 h-11 text-[#26A4FF] border-[#D6DDEB] rounded-full p-2" />
						{jobPost.when_where}
					</div>
				</div>
			</div>
			<div className="flex-1/4 shrink-0 flex flex-col gap-5">
				<div className="">
					<h1 className={`${poppins.className} text-2xl mb-4`}>About</h1>
					<div className="flex flex-col gap-5">
						<div className="flex gap-4">
							<FaCirclePlus className="border w-11 h-11 text-[#26A4FF] border-[#D6DDEB] rounded-full p-2" />
							<div className="">
								<div className="text-[16px] font-normal text-[#515B6F]">Posted On</div>
								<div className="text-[16px] font-semibold">{jobPost.about.posted_on}</div>
							</div>
						</div>
						<div className="flex gap-4">
							<FaFireFlameCurved className="border w-11 h-11 text-[#26A4FF] border-[#D6DDEB] rounded-full p-2" />
							<div className="">
								<div className="text-[16px] font-normal text-[#515B6F]">Deadline</div>
								<div className="text-[16px] font-semibold">{jobPost.about.deadline}</div>
							</div>
						</div>
						<div className="flex gap-4">
							<FaLocationDot className="border w-11 h-11 text-[#26A4FF] border-[#D6DDEB] rounded-full p-2" />
							<div className="">
								<div className="text-[16px] font-normal text-[#515B6F]">Location</div>
								<div className="text-[16px] font-semibold">{jobPost.about.location}</div>
							</div>
						</div>
						<div className="flex gap-4">
							<FaRegCalendarPlus className="border w-11 h-11 text-[#26A4FF] border-[#D6DDEB] rounded-full p-2" />
							<div className="">
								<div className="text-[16px] font-normal text-[#515B6F]">Start Date</div>
								<div className="text-[16px] font-semibold">{jobPost.about.start_date}</div>
							</div>
						</div>
						<div className="flex gap-4">
							<FaRegCalendarCheck className="border w-11 h-11 text-[#26A4FF] border-[#D6DDEB] rounded-full p-2" />
							<div className="">
								<div className="text-[16px] font-normal text-[#515B6F]">End Date</div>
								<div className="text-[16px] font-semibold">{jobPost.about.end_date}</div>
							</div>
						</div>
					</div>
				</div>
				<div className="w-full h-[1px] bg-[#D6DDEB]"></div>
				<div className="">
					<h1 className={`${poppins.className} text-2xl mb-4`}>Categories</h1>
					<div className="flex gap-2">
						{jobPost.about.categories.map((cat, id) => (
							<Category key={id} category={cat} />
						))}
					</div>
				</div>
				<div className="w-full h-[1px] bg-[#D6DDEB]"></div>
				<div className="">
					<h1 className={`${poppins.className} text-2xl mb-4`}>Required Section</h1>
					<div className="flex flex-wrap gap-2">
						{jobPost.about.required_skills.map((skill, id) => (
							<Skill key={id} skill={skill} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
export default JobDescription;
