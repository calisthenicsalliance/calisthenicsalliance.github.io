"use client";

import { useState } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { navigation, site } from "@/config/site";
import { season } from "@/content/season";
import { buttonVariants } from "@/components/ui/button";
import { LocaleSwitcher } from "./locale-switcher";

export function MobileNav() {
	const [open, setOpen] = useState(false);
	const t = useTranslations();

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

					<nav className="flex flex-1 flex-col justify-center gap-2 px-5 sm:px-8">
						{navigation.map((item, index) => (
							<Link
								key={item.href}
								href={item.href}
								onClick={() => setOpen(false)}
								className="border-b border-white/5 py-4 font-display text-2xl uppercase transition-colors hover:text-brand sm:text-3xl">
								<span className="mr-4 align-super text-xs text-brand/50">
									{String(index + 1).padStart(2, "0")}
								</span>
								{t(`nav.${item.key}`)}
							</Link>
						))}
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
