import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
	locales: ["pt", "en"],
	defaultLocale: "pt",
	// no middleware in a static export, so every locale is addressed explicitly
	localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];

export interface LocaleProps {
	params: Promise<{ locale: string }>;
}

export function localeParams() {
	return routing.locales.map((locale) => ({ locale }));
}
