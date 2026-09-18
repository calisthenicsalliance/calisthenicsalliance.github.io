"use client";

import { useState } from "react";
import { ArrowRight, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { currentAnnouncement } from "@/content/news";
import { Container } from "@/components/shared/container";
import { AnnouncementLink } from "@/components/shared/announcement-link";

// closing it lasts until the next reload
export function AnnouncementBar() {
	const t = useTranslations("news");
	const [closed, setClosed] = useState(false);

	if (!currentAnnouncement || closed) return null;

	return (
		<div className="bg-brand text-white">
			<Container className="flex h-10 items-center gap-4">
				<AnnouncementLink
					href={currentAnnouncement.href}
					className="group flex min-w-0 flex-1 items-center gap-3 text-sm">
					<span className="relative flex size-2 shrink-0">
						<span className="absolute inline-flex size-full animate-ping rounded-full bg-white/70" />
						<span className="relative inline-flex size-2 rounded-full bg-white" />
					</span>
					<span className="hidden shrink-0 text-[0.65rem] font-bold tracking-[0.2em] uppercase sm:inline">
						{t("label")}
					</span>
					<span className="truncate font-medium">{t(`items.${currentAnnouncement.id}.title`)}</span>
					<span className="ml-auto hidden shrink-0 items-center gap-1 text-[0.65rem] font-bold tracking-[0.2em] uppercase sm:inline-flex">
						{t("cta")}
						<ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
					</span>
				</AnnouncementLink>
				<button
					type="button"
					onClick={() => setClosed(true)}
					aria-label={t("close")}
					className="-mr-2 inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-sm transition-colors hover:bg-white/15">
					<X className="size-4" />
				</button>
			</Container>
		</div>
	);
}
