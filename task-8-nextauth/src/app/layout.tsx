import type { Metadata } from "next";
import { Epilogue } from "next/font/google";

import { SessionProvider } from "next-auth/react";
import { AppProvider } from "./components/AppProvider";
import "./globals.css";

const epilogue = Epilogue({
	display: "swap",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Nexthauth Authentication",
	description: "Demo Nexthauth Authentication project for a2sv",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en">
			<AppProvider>
				<SessionProvider>
					<body className={`${epilogue.className}`}>{children}</body>
				</SessionProvider>
			</AppProvider>
		</html>
	);
}
