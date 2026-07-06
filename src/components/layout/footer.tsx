"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function Footer() {
	const locale = useLocale();
	const translations = useTranslations("footer");

	return (
		<footer className="border-t">
			<div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-6 text-sm text-muted-foreground sm:flex-row">
				<p>{translations("copyright", { year: new Date().getFullYear() })}</p>

				<nav className="flex items-center gap-6">
					<Link href="/privacy" locale={locale} className="transition hover:text-foreground">
						{translations("privacy")}
					</Link>
					<Link href="/terms" locale={locale} className="transition hover:text-foreground">
						{translations("termsOfService")}
					</Link>
					<Link href="/contact" locale={locale} className="transition hover:text-foreground">
						{translations("contact")}
					</Link>
				</nav>
			</div>
		</footer>
	);
}
