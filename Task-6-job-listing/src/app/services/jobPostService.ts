import type JobPost from "../types/jobPost";

const API_URL = process.env.API_URL || "";
const JobPostService = {
	getJobPosts: async (): Promise<JobPost[]> => {
		const response = await fetch(`${API_URL}job_postings`);
		const jobPosts: JobPost[] = await response.json();
		return jobPosts;
	},

	getJobPost: async (id: number): Promise<JobPost> => {
		const response = await fetch(`${API_URL}job_postings/${id}`);
		const jobPost: JobPost = await response.json();
		return jobPost;
	},
};

export default JobPostService;
