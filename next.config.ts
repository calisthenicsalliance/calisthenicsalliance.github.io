import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin();

// served from the domain root, so no basePath is needed
const nextConfig: NextConfig = {
	reactCompiler: true,
	output: "standalone",
	trailingSlash: true,
	images: { unoptimized: true },
};

export default withNextIntl(nextConfig);
