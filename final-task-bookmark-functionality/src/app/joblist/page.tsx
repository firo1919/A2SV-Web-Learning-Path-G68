"use client";

import { Poppins } from "next/font/google";
import { useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import { ToastContainer } from "react-toastify";
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
	const [searchQuery, setSearchQuery] = useState("");
	if (isError) {
		console.log(error);
	}
	const filteredJobs = jobPosts.filter((job) => job.title.toLowerCase().includes(searchQuery));
	return (
		<div className=" w-[919px] mx-auto">
			<div className="flex items-center gap-20 mb-8">
				<div className="">
					<h1 className={`${poppins.className} text-[32px] mb-1`}>Opportunities</h1>
					<p className="text-[16px] text-[#7C8493]">Showing {filteredJobs.length} results</p>
				</div>
				<div className=" gap-2 grow">
					<input
						type="text"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.currentTarget.value)}
						placeholder="Search Opportunities"
						className="border-2 w-full px-4 py-3 outline-none rounded-md border-gray-300"
					/>
				</div>
			</div>
			<div className="relative flex flex-col gap-[35px]">
				{isSuccess && filteredJobs.map((job: JobPost) => <JobListCard key={job.id} jobpost={job} />)}
				{isLoading && (
					<div
						className="absolute top-0 left-0 mt-20 right-0 flex items-center justify-center
                        bg-white opacity-50"
						data-testid="loading"
					>
						<ImSpinner2 className="text-7xl animate-spin" />
					</div>
				)}
			</div>
			<ToastContainer />
		</div>
	);
}
