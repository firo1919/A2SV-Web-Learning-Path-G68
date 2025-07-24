export default interface JobPost {
	id: string;
	title: string;
	description: string;
	responsibilities: string;
	requirements: string;
	idealCandidate: string;
	categories: string[];
	whenAndWhere: string;
	requiredSkills: string[];
	deadline: string;
	location: string[];
	startDate: string;
	opType: string;
	endDate: string;
	company: string;
	image: string;
	createdBy: string;
	orgID: string;
	datePosted: string;
	status: string;
	applicantsCount: number;
	viewsCount: number;
	orgName: string;
	logoUrl: string;
	isBookmarked: boolean;
	isRolling: boolean;
	questions: string;
	perksAndBenefits: string;
	createdAt: string;
	updatedAt: string;
	orgPrimaryPhone: string;
	orgEmail: string;
	orgWebsite: string;
	isPaid: boolean;
	average_rating: number;
	total_reviews: number;
	engagementType: string;
	paymentOption: {
		currency: string;
		paymentType: string;
	};
}

export interface PostResponse {
	success: boolean;
	message: string;
	data: JobPost;
	errors: string;
	count: string;
}

export interface PostsResponse {
	success: boolean;
	message: string;
	data: JobPost[];
	errors: string;
	count: string;
}
