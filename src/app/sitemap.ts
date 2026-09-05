import type { MetadataRoute } from "next";
import { navigation, site } from "@/config/site";
import { routing } from "@/i18n/routing";

// required for output: export
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
	const paths = ["", ...navigation.map((item) => item.href)];

	return routing.locales.flatMap((locale) =>
		paths.map((path) => ({
			url: `${site.url}/${locale}${path}/`,
			changeFrequency: "monthly" as const,
			priority: path === "" ? 1 : 0.8,
			alternates: {
				languages: Object.fromEntries(routing.locales.map((l) => [l, `${site.url}/${l}${path}/`])),
			},
		})),
	);
}
