"use client";

import { useEffect } from "react";

export default function ErrorPage({
	error,
	reset,
}: Readonly<{ error: Error & { digest?: string }; reset: () => void }>) {
	useEffect(() => {
		console.error(error);
	}, [error]);
	return (
		<div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center">
			<div className="border border-[#D6DDEB] flex flex-col gap-6 items-center p-10 w-lg rounded-lg">
				<p className="font-bold text-2xl">Something went wrong</p>
				<p className="text-center">
					We encountered an unexpected error. Don&apos;t worry, it&apos;s not your fault. Please try again or
					refresh the page.
				</p>
				<button
					onClick={() => reset()}
					className="w-full bg-blue-700 hover:bg-blue-800 active:bg-blue-600 text-white h-10 rounded-md font-bold"
				>
					Try Again
				</button>
				<p className="text-sm">If the problem persists, please contact support.</p>
			</div>
		</div>
	);
}
