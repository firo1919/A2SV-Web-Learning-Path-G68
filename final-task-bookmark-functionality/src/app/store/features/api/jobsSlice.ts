import JobPost from "@/app/types/jobPost";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = `/api/jobposts/`;

export const jobs = createApi({
	reducerPath: "jobsapi",
	baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
	tagTypes: ["Jobs"],
	endpoints: (builder) => ({
		getJobPosts: builder.query<JobPost[], void>({
			query: () => ({
				url: "",
				method: "GET",
			}),
			providesTags: ["Jobs"],
		}),
		getJobPost: builder.query<JobPost, string>({
			query: (jobId: string) => ({
				url: jobId,
				method: "GET",
			}),
		}),
	}),
});

export const { useGetJobPostQuery, useGetJobPostsQuery } = jobs;
