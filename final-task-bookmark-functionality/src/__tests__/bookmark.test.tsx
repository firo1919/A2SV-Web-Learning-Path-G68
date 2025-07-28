import AppProvider from "@/app/components/AppProvider";
import JobListCard from "@/app/components/JobListCard";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

// Mock next-auth/react to simulate a logged-in user
jest.mock("next-auth/react", () => ({
	useSession: () => ({ data: { user: { id: "user-1" } } }),
}));

// Mock RTK Query hooks
const createBookmarkMock = jest.fn();
const deleteBookmarkMock = jest.fn();

jest.mock("@/app/store/features/api/bookmarksSlice", () => ({
	bookmarks: {
		reducerPath: "bookmarksapi",
		reducer: (state = {}) => state,
		middleware: () => (next: (action: unknown) => unknown) => (action: unknown) => next(action),
	},
	useCreateBookmarkMutation: () => [createBookmarkMock],
	useDeleteBookmarkMutation: () => [deleteBookmarkMock],
}));

const mockJobPost = {
	id: "job-1",
	title: "Frontend Developer",
	description: "Build amazing web applications.",
	responsibilities: "Develop UI components.",
	requirements: "Experience with React.",
	idealCandidate: "Team player with attention to detail.",
	categories: ["Engineering", "Web"],
	whenAndWhere: "Remote, Flexible",
	requiredSkills: ["React", "TypeScript"],
	deadline: "2025-08-31",
	location: ["Remote", "Ethiopia"],
	startDate: "2025-09-01",
	opType: "Remote",
	endDate: "2025-12-31",
	company: "A2SV",
	image: "/company.png",
	createdBy: "user-1",
	orgID: "org-1",
	datePosted: "2025-07-28",
	status: "Open",
	applicantsCount: 10,
	viewsCount: 100,
	orgName: "A2SV",
	logoUrl: "",
	isBookmarked: false,
	isRolling: false,
	questions: "Why do you want this job?",
	perksAndBenefits: "Flexible hours, Remote work",
	createdAt: "2025-07-01T12:00:00Z",
	updatedAt: "2025-07-15T12:00:00Z",
	orgPrimaryPhone: "+251900000000",
	orgEmail: "hr@a2sv.org",
	orgWebsite: "https://a2sv.org",
	isPaid: true,
	average_rating: 4.5,
	total_reviews: 20,
	engagementType: "Full-time",
	paymentOption: {
		currency: "USD",
		paymentType: "Monthly",
	},
};

describe("JobListCard bookmark functionality", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("calls createBookmark when the bookmark button is clicked and job is not bookmarked", async () => {
		createBookmarkMock.mockReturnValue({ unwrap: () => Promise.resolve({}) });

		render(
			<AppProvider>
				<JobListCard jobpost={{ ...mockJobPost, isBookmarked: false }} />
			</AppProvider>
		);

		const bookmarkBtn = screen.getByRole("button");
		fireEvent.click(bookmarkBtn);

		await waitFor(() => {
			expect(createBookmarkMock).toHaveBeenCalledWith(mockJobPost.id);
		});
	});

	it("calls deleteBookmark when the bookmark button is clicked and job is bookmarked", async () => {
		deleteBookmarkMock.mockReturnValue({ unwrap: () => Promise.resolve({}) });

		render(
			<AppProvider>
				<JobListCard jobpost={{ ...mockJobPost, isBookmarked: true }} />
			</AppProvider>
		);

		const bookmarkBtn = screen.getByRole("button");
		fireEvent.click(bookmarkBtn);

		await waitFor(() => {
			expect(deleteBookmarkMock).toHaveBeenCalledWith(mockJobPost.id);
		});
	});
});
