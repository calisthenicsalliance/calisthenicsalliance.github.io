"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { navigation, site } from "@/config/site";
import { buttonVariants } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { Container } from "@/components/shared/container";
import { cn } from "@/lib/utils";
import { LocaleSwitcher } from "./locale-switcher";
import { MobileNav } from "./mobile-nav";

export function Navbar() {
	const t = useTranslations();
	const pathname = usePathname();
	// transparent over the hero, solid once the page starts moving
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 24);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	return (
		<header
			className={cn(
				"fixed inset-x-0 top-0 z-50 transition-colors duration-300",
				scrolled ? "border-b border-white/10 bg-background/85 backdrop-blur-md" : "bg-transparent",
			)}>
			<Container className="flex h-20 items-center justify-between gap-6">
				<Link href="/" aria-label={site.name} className="shrink-0">
					<Logo size={44} />
				</Link>

				<nav className="hidden items-center gap-8 lg:flex">
					{navigation.map((item) => {
						const active = pathname === item.href;
						return (
							<Link
								key={item.href}
								href={item.href}
								aria-current={active ? "page" : undefined}
								className={cn(
									"relative py-1 text-[0.875rem] font-semibold tracking-[0.1em] uppercase transition-colors",
									active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
								)}>
								{t(`nav.${item.key}`)}
								{active ? <span className="absolute -bottom-0.5 left-0 h-0.5 w-full bg-brand" /> : null}
							</Link>
						);
					})}
				</nav>

				<div className="flex items-center gap-4">
					<LocaleSwitcher className="hidden sm:flex" />
					<a
						href={site.registrationUrl}
						target="_blank"
						rel="noreferrer noopener"
						className={buttonVariants({
							variant: "brand",
							size: "xl",
							className: "hidden sm:inline-flex",
						})}>
						{t("common.register")}
					</a>
					<MobileNav />
				</div>
			</Container>
		</header>
	);
}
