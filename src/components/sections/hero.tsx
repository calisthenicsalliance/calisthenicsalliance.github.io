"use client";

import { ArrowRight, ChevronDown } from "lucide-react";
import { motion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { site } from "@/config/site";
import { currentAnnouncement } from "@/content/news";
import { openCal, season } from "@/content/season";
import { formatDate, formatDayMonth } from "@/lib/format";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import { Eyebrow } from "@/components/shared/section";
import { Countdown } from "@/components/shared/countdown";
import { LoopingVideo } from "@/components/shared/looping-video";
import { AnnouncementLink } from "@/components/shared/announcement-link";

export function Hero() {
	const t = useTranslations("home.hero");
	const common = useTranslations("common");
	const locale = useLocale() as Locale;
	const news = useTranslations("news");

	return (
		<section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pt-20">
			<LoopingVideo src="/videos/team.mp4" className="absolute inset-0 size-full object-cover" />

			{/* scrims: vertical for legibility, red wash for brand, hatch for texture */}
			<div className="absolute inset-0 bg-gradient-to-t from-background via-background/75 to-transparent" />
			<div className="absolute inset-0 bg-gradient-to-r from-background/95 via-transparent to-transparent" />
			<div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_85%_10%,var(--tw-gradient-from),transparent_60%)] from-brand/25" />
			<div className="absolute inset-0 bg-hatch opacity-40" />

			<Container className="relative pb-14">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
					className="max-w-4xl">
					<Eyebrow className="mb-6">{t("eyebrow", { season: season.label })}</Eyebrow>

					<h1 className="font-display text-[clamp(3.25rem,13vw,10rem)] leading-[0.82]">
						<span className="block">{t("titleTop")}</span>
						<span className="block text-brand">{t("titleBottom")}</span>
					</h1>

					<p className="mt-7 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
						{t("subtitle")}
					</p>

					<div className="mt-9 flex flex-wrap items-center gap-4">
						<a
							href={site.registrationUrl}
							target="_blank"
							rel="noreferrer noopener"
							className={buttonVariants({ variant: "brand", size: "2xl" })}>
							{common("register")}
							<ArrowRight />
						</a>
						<Link
							href="/open-cal"
							className={buttonVariants({
								variant: "outline",
								size: "2xl",
								className: "border-white/25 bg-white/5 backdrop-blur-sm",
							})}>
							{common("seeOpenCal")}
						</Link>
					</div>
				</motion.div>
			</Container>

			<div className="relative border-t border-white/10 bg-black/50 backdrop-blur-md">
				<Container className="flex flex-wrap items-center justify-between gap-6 py-6">
					<div>
						<p className="mb-3 text-[0.65rem] tracking-[0.25em] text-muted-foreground uppercase">
							{t("countdownLabel")}
						</p>
						<Countdown
							target={openCal.date}
							liveLabel={t("countdownLive")}
							labels={{
								days: t("days"),
								hours: t("hours"),
								minutes: t("minutes"),
								seconds: t("seconds"),
							}}
						/>
					</div>

					{currentAnnouncement ? (
						<AnnouncementLink
							href={currentAnnouncement.href}
							className="group flex w-full items-center justify-between gap-6 rounded-md border border-brand/30 bg-gradient-to-br from-brand/15 to-transparent px-5 py-4 transition-colors hover:border-brand/60 hover:from-brand/25 sm:w-auto sm:max-w-md">
							<div className="min-w-0">
								<p className="mb-1.5 flex items-center gap-2 text-[0.65rem] font-semibold tracking-[0.25em] text-brand uppercase">
									<span className="relative flex size-1.5">
										<span className="absolute inline-flex size-full animate-ping rounded-full bg-brand/70" />
										<span className="relative inline-flex size-1.5 rounded-full bg-brand" />
									</span>
									{news("label")} · {formatDayMonth(currentAnnouncement.date, locale)}
								</p>
								<p className="font-display text-xl leading-tight uppercase sm:text-2xl">
									{news(`items.${currentAnnouncement.id}.title`)}
								</p>
							</div>
							<ArrowRight className="size-5 shrink-0 text-brand transition-transform group-hover:translate-x-1" />
						</AnnouncementLink>
					) : (
						<div className="hidden text-right sm:block">
							<p className="font-display text-2xl uppercase">Open CAL</p>
							<p className="text-sm text-muted-foreground">
								{formatDate(openCal.date, locale)} · {openCal.city}
							</p>
						</div>
					)}
				</Container>
			</div>

			<span
				aria-hidden
				className="pointer-events-none absolute bottom-32 left-1/2 hidden -translate-x-1/2 animate-bounce text-muted-foreground/50 lg:block">
				<ChevronDown className="size-5" />
			</span>
		</section>
	);
}
