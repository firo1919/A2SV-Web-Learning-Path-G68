import { Bookmark } from "@/app/types/bookmarks";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { jobs } from "./jobsSlice";

const baseUrl = `/api/bookmarks/`;

export const bookmarks = createApi({
	reducerPath: "bookmarksapi",
	baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
	tagTypes: ["Post", "Jobs"],
	invalidationBehavior: "immediately",
	endpoints: (builder) => ({
		getBookmarks: builder.query<Bookmark[], void>({
			query: () => ({
				url: "",
				method: "GET",
			}),
			providesTags: ["Post"],
		}),
		createBookmark: builder.mutation<Bookmark, string>({
			query: (eventId) => ({
				url: eventId,
				method: "POST",
				body: "",
			}),
			invalidatesTags: ["Post"],
			onQueryStarted: (arg, api) => {
				api.queryFulfilled.then(() => {
					api.dispatch(jobs.util.invalidateTags(["Jobs"]));
				});
			},
		}),
		deleteBookmark: builder.mutation<Bookmark, string>({
			query: (eventId) => ({
				url: eventId,
				method: "DELETE",
				body: "",
			}),
			invalidatesTags: ["Post"],
			onQueryStarted: (arg, api) => {
				api.queryFulfilled.then(() => {
					api.dispatch(jobs.util.invalidateTags(["Jobs"]));
				});
			},
		}),
	}),
});

export const { useGetBookmarksQuery, useCreateBookmarkMutation, useDeleteBookmarkMutation } = bookmarks;
