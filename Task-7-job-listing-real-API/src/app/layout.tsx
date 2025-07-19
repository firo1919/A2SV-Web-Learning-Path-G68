import type { Metadata } from "next";
import { Epilogue } from "next/font/google";
import "./globals.css";

const epilogue = Epilogue({
	subsets: ["latin"],
	display: "swap",
});

export const metadata: Metadata = {
	title: "Job-Listing",
	description: "A job listing site",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en">
			<body className={`${epilogue.className} mx-15 my-18`}>{children}</body>
		</html>
	);
}
