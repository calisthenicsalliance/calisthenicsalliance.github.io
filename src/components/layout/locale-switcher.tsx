"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function LocaleSwitcher({ className }: { className?: string }) {
	const active = useLocale();
	const pathname = usePathname();

	return (
		<div className={cn("flex items-center gap-1 text-xs font-semibold tracking-widest uppercase", className)}>
			{routing.locales.map((locale, index) => (
				<span key={locale} className="flex items-center gap-1">
					{index > 0 ? <span className="text-muted-foreground/40">/</span> : null}
					<Link
						href={pathname}
						locale={locale}
						hrefLang={locale}
						aria-current={locale === active ? "true" : undefined}
						className={cn(
							"px-1 py-1 transition-colors",
							locale === active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
						)}>
						{locale}
					</Link>
				</span>
			))}
		</div>
	);
}
