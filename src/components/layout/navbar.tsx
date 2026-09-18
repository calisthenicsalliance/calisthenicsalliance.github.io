"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { site } from "@/config/site";
import { buttonVariants } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { Container } from "@/components/shared/container";
import { cn } from "@/lib/utils";
import { AnnouncementBar } from "./announcement-bar";
import { DesktopNav } from "./desktop-nav";
import { LocaleSwitcher } from "./locale-switcher";
import { MobileNav } from "./mobile-nav";

export function Navbar() {
	const t = useTranslations();
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
			<AnnouncementBar />
			<Container className="flex h-20 items-center justify-between gap-6">
				<Link href="/" aria-label={site.name} className="shrink-0">
					<Logo size={44} wordmarkClassName="lg:max-[1120px]:hidden" />
				</Link>

				<DesktopNav className="hidden lg:block" />

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
