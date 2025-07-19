import { Poppins } from "next/font/google";
import JobListCard from "../components/JobListCard";
import JobPostService from "../services/jobPostService";

const poppins = Poppins({
	subsets: ["latin"],
	display: "swap",
	weight: "900",
});

export default async function Home() {
	const jobPosts = await JobPostService.getJobPosts();
	return (
		<div className="w-[919px] mx-auto">
			<div className="flex items-center justify-between mb-8">
				<div className="">
					<h1 className={`${poppins.className} text-[32px] mb-1`}>Opportunities</h1>
					<p className="text-[16px] text-[#7C8493]">Showing {jobPosts.length} results</p>
				</div>
				<div className="flex gap-2">
					<p className="text-[16px] text-[#7C8493]">Sort by:</p>
					<p className="text-[16px] font-medium">Most relevant </p>
				</div>
			</div>
			<div className="flex flex-col gap-[35px]">
				{jobPosts.map((job) => (
					<JobListCard key={job.id} jobpost={job} />
				))}
			</div>
		</div>
	);
}
