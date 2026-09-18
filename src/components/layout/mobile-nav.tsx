"use client";

import { useState } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { navigation, navigationLinks, site, type NavGroup, type NavLink } from "@/config/site";
import { season } from "@/content/season";
import { buttonVariants } from "@/components/ui/button";
import { LocaleSwitcher } from "./locale-switcher";

// consecutive top-level links share one block; each group gets its own
const blocks = navigation.reduce<(NavGroup | NavLink[])[]>((acc, item) => {
	const last = acc[acc.length - 1];
	if ("links" in item) acc.push(item);
	else if (Array.isArray(last)) last.push(item);
	else acc.push([item]);
	return acc;
}, []);

export function MobileNav() {
	const [open, setOpen] = useState(false);
	const t = useTranslations();
	const close = () => setOpen(false);

	return (
		<Dialog.Root open={open} onOpenChange={setOpen}>
			<Dialog.Trigger
				aria-label={t("common.openMenu")}
				className="-mr-2 inline-flex size-10 items-center justify-center transition-colors hover:text-brand lg:hidden">
				<Menu className="size-6" />
			</Dialog.Trigger>

			<Dialog.Portal>
				<Dialog.Backdrop className="fixed inset-0 z-100 bg-black/70 backdrop-blur-sm transition-opacity duration-200 data-closed:opacity-0" />
				<Dialog.Popup className="fixed inset-0 z-100 flex flex-col bg-background transition-opacity duration-200 data-closed:opacity-0">
					<Dialog.Title className="sr-only">{t("common.menu")}</Dialog.Title>

					<div className="flex h-20 items-center justify-between px-5 sm:px-8">
						<LocaleSwitcher />
						<Dialog.Close
							aria-label={t("common.closeMenu")}
							className="-mr-2 inline-flex size-10 items-center justify-center transition-colors hover:text-brand">
							<X className="size-6" />
						</Dialog.Close>
					</div>

					<nav className="flex min-h-0 flex-1 flex-col overflow-y-auto px-5 sm:px-8">
						<div className="my-auto flex flex-col gap-8 py-6">
							{blocks.map((block) =>
								Array.isArray(block) ? (
									<div key={block[0].href} className="flex flex-col border-l border-transparent pl-4">
										{block.map((link) => (
											<MobileLink key={link.href} href={link.href} onNavigate={close}>
												{t(`nav.${link.key}`)}
											</MobileLink>
										))}
									</div>
								) : (
									<div key={block.key} className="flex flex-col">
										<p className="mb-2 eyebrow">{t(`nav.${block.key}`)}</p>
										{/* the line marks what belongs to the heading; top-level links share the indent without it */}
										<div className="flex flex-col border-l border-brand/30 pl-4">
											{block.links.map((link) => (
												<MobileLink key={link.href} href={link.href} onNavigate={close}>
													{t(`nav.${link.key}`)}
												</MobileLink>
											))}
										</div>
									</div>
								),
							)}
						</div>
					</nav>

					<div className="px-5 pb-10 sm:px-8">
						<a
							href={site.registrationUrl}
							target="_blank"
							rel="noreferrer noopener"
							className={buttonVariants({ variant: "brand", size: "xl", className: "w-full" })}>
							{t("common.registerLong", { season: season.label })}
						</a>
					</div>
				</Dialog.Popup>
			</Dialog.Portal>
		</Dialog.Root>
	);
}

function MobileLink({
	href,
	onNavigate,
	children,
}: {
	href: string;
	onNavigate: () => void;
	children: React.ReactNode;
}) {
	const index = navigationLinks.findIndex((link) => link.href === href);

	return (
		<Link
			href={href}
			onClick={onNavigate}
			className="border-b border-white/5 py-4 font-display text-2xl uppercase transition-colors hover:text-brand sm:text-3xl">
			<span className="inline-block w-9 align-super text-xs text-brand/50 tabular-nums">
				{String(index + 1).padStart(2, "0")}
			</span>
			{children}
		</Link>
	);
}
