import type { Locale } from "@/i18n/routing";

// en-GB, not en-US, so English dates read "24 October 2026"
const INTL_LOCALES: Record<Locale, string> = {
	pt: "pt-PT",
	en: "en-GB",
};

// T00:00:00 parses as local midnight; a bare ISO date is UTC and shows a day early west of Greenwich
export function formatDate(iso: string, locale: Locale, options?: Intl.DateTimeFormatOptions) {
	return new Intl.DateTimeFormat(INTL_LOCALES[locale], {
		day: "numeric",
		month: "long",
		year: "numeric",
		...options,
	}).format(new Date(`${iso}T00:00:00`));
}

export function formatDayMonth(iso: string, locale: Locale) {
	return formatDate(iso, locale, { year: undefined });
}

export function formatCurrency(amount: number, currency: string, locale: Locale) {
	return new Intl.NumberFormat(INTL_LOCALES[locale], {
		style: "currency",
		currency,
		minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
	}).format(amount);
}
