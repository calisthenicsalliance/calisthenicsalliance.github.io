import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin();

/**
 * The site is deployed to `calisthenicsalliance.github.io`, a GitHub user/org
 * Pages site served from the domain root, so no `basePath` is needed. Should the
 * site ever move to a project repository, set `basePath` and `assetPrefix` here.
 */
const nextConfig: NextConfig = {
	reactCompiler: true,
	output: "export",
	trailingSlash: true,
	images: { unoptimized: true },
};

export default withNextIntl(nextConfig);
