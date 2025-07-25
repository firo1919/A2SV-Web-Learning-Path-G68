import { configureStore } from "@reduxjs/toolkit";
import { auth } from "./features/api/authSlice";
import { bookmarks } from "./features/api/bookmarksSlice";
import { jobs } from "./features/api/jobsSlice";

export const store = configureStore({
	reducer: {
		[auth.reducerPath]: auth.reducer,
		[jobs.reducerPath]: jobs.reducer,
		[bookmarks.reducerPath]: bookmarks.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(auth.middleware, jobs.middleware, bookmarks.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
