import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";

export function Navbar() {
	const locale = useLocale();
	const translations = useTranslations("navbar");

	return (
		<header className="fixed inset-x-0 top-0 z-50 border-b bg-background/70 backdrop-blur supports-backdrop-filter:bg-background/60">
			<div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:grid md:grid-cols-3">
				{/* Left: Logo */}
				<div className="flex justify-start">
					<Link href="/" locale={locale} className="font-semibold tracking-tight">
						CAL
					</Link>
				</div>

				{/* Center: Links */}
				<nav className="hidden justify-center gap-8 text-sm text-muted-foreground md:flex">
					<Link href="/regulation" locale={locale} className="transition hover:text-foreground">
						{translations("regulation")}
					</Link>

					<Link href="/rankings" locale={locale} className="transition hover:text-foreground">
						{translations("rankings")}
					</Link>
				</nav>
			</div>
		</header>
	);
}
