import JobDetail from "@/app/components/JobDetail";

async function JobDescription({ params }: { params: Promise<{ jobId: string }> }) {
	const { jobId } = await params;

	return <JobDetail jobId={jobId} />;
}
export default JobDescription;
