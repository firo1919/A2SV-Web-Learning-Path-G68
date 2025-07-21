import type { NextConfig } from "next";
import { URL } from "url";

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [new URL("https://lh3.googleusercontent.com/**")],
	},
};

export default nextConfig;
