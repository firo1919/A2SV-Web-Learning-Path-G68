import { Poppins } from "next/font/google";
import { CiCircleCheck, CiLocationOn } from "react-icons/ci";
import JobPostService from "../services/jobPostService";

const poppins = Poppins({
	display: "swap",
	subsets: ["latin"],
	weight: "900",
});

async function JobDescription({ params }: { params: Promise<{ jobId: string }> }) {
	const { jobId } = await params;
	const jobPost = await JobPostService.getJobPost(parseInt(jobId));
	return (
		<div className="flex gap-[62px]">
			<div className="flex flex-col gap-14">
				<div className="">
					<h1 className={`${poppins.className} text-2xl mb-4`}>Description</h1>
					<p>{jobPost.description}</p>
				</div>
				<div className="">
					<h1 className={`${poppins.className} text-2xl mb-4`}>Responsibilities</h1>
					<ul>
						{jobPost.responsibilities.map((resp, id) => (
							<div key={id} className="flex items-center gap-2 pb-2">
								<CiCircleCheck className="text-[#26A4FF] text-xl" />
								<p>{resp}</p>
							</div>
						))}
					</ul>
				</div>
				<div className="">
					<h1 className={`${poppins.className} text-2xl mb-4`}>Ideal Candidate we want</h1>
					<ul>
						{jobPost.ideal_candidate.traits.map((trait, id) => (
							<li key={id} className="list-disc ml-6">
								{trait}
							</li>
						))}
					</ul>
				</div>
				<div className="">
					<h1 className={`${poppins.className} text-2xl mb-4`}>When and where</h1>
					<div className="flex items-center gap-2 pb-2">
						<CiLocationOn className="border w-11 h-11 text-[#26A4FF] border-[#D6DDEB] rounded-full p-2" />
						{jobPost.when_where}
					</div>
				</div>
			</div>
			<div className="flex-1/4 shrink-0">
				<div className="">
					<h1 className={`${poppins.className} text-2xl mb-4`}>About</h1>
					<p>
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto nulla voluptate magnam eligendi?
						Beatae minus aspernatur debitis, enim nihil aperiam ipsam natus amet? Vero voluptatem ullam quas
						modi aliquam dolore?
					</p>
				</div>
				<div className="">
					<h1 className={`${poppins.className} text-2xl mb-4`}>Categories</h1>
				</div>
				<div className="">
					<h1 className={`${poppins.className} text-2xl mb-4`}>Required Section</h1>
				</div>
			</div>
		</div>
	);
}
export default JobDescription;
