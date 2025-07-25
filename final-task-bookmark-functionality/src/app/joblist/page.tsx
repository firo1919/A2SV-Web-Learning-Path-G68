"use client";

import { Poppins } from "next/font/google";
import { ImSpinner2 } from "react-icons/im";
import JobListCard from "../components/JobListCard";
import { useGetJobPostsQuery } from "../store/features/api/jobsSlice";
import JobPost from "../types/jobPost";

const poppins = Poppins({
	subsets: ["latin"],
	display: "swap",
	weight: "900",
});

export default function JoblistingPage() {
	const { data: jobPosts = [], isLoading, isSuccess, isError, error } = useGetJobPostsQuery();
	if (isError) {
		console.log(error);
	}
	return (
		<div className=" w-[919px] mx-auto">
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
			<div className="relative flex flex-col gap-[35px]">
				{isSuccess && jobPosts.map((job: JobPost) => <JobListCard key={job.id} jobpost={job} />)}
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
}
