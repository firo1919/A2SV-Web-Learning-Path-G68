import AppProvider from "@/app/components/AppProvider";
import JobListCard from "@/app/components/JobListCard";
import { render, screen } from "@testing-library/react";

jest.mock("next-auth/react", () => ({
	useSession: () => ({ data: null }),
}));

jest.mock("next/image");

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
describe("JobListCard", () => {
	it("renders the title of the job", () => {
		render(
			<AppProvider>
				<JobListCard jobpost={mockJobPost} />
			</AppProvider>
		);

		expect(screen.getByText(/Frontend Developer/i)).toBeInTheDocument();
	});
	it("renders the description of the job", () => {
		render(
			<AppProvider>
				<JobListCard jobpost={mockJobPost} />
			</AppProvider>
		);

		expect(screen.getByText(mockJobPost.description)).toBeInTheDocument();
	});
});
