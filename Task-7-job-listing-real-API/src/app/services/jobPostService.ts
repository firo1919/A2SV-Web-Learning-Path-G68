import type JobPost from "../types/jobPost";
interface PostsResponse {
	success: boolean;
	message: string;
	data: JobPost[];
	errors: string;
	count: string;
}
interface PostResponse {
	success: boolean;
	message: string;
	data: JobPost;
	errors: string;
	count: string;
}

const API_URL = process.env.API_URL || "http://localhost:3001/";
const JobPostService = {
	getJobPosts: async (): Promise<JobPost[]> => {
		const response = await fetch(`${API_URL}opportunities/search`);
		const jobPosts: PostsResponse = await response.json();
		console.log(jobPosts);
		return jobPosts.data;
	},

	getJobPost: async (id: string): Promise<JobPost> => {
		const response = await fetch(`${API_URL}opportunities/${id}`);
		const jobPost: PostResponse = await response.json();
		return jobPost.data;
	},
};

export default JobPostService;
