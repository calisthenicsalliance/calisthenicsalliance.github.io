import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_ACTIONS === "true";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
	reactCompiler: true,
	output: "export",
	images: {
		unoptimized: true,
	},
	assetPrefix: isGitHubPages ? "/calisthenics-alliance/" : undefined,
};

export default withNextIntl(nextConfig);
