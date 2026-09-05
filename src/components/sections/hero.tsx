"use client";

import { ArrowRight, ChevronDown } from "lucide-react";
import { motion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { site } from "@/config/site";
import { openCal, season } from "@/content/season";
import { formatDate } from "@/lib/format";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import { Eyebrow } from "@/components/shared/section";
import { Countdown } from "@/components/shared/countdown";
import { LoopingVideo } from "@/components/shared/looping-video";

export function Hero() {
	const t = useTranslations("home.hero");
	const common = useTranslations("common");
	const locale = useLocale() as Locale;

	return (
		<section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pt-20">
			{/* Background: a short, silent loop of the team training. */}
			<LoopingVideo src="/videos/team.mp4" className="absolute inset-0 size-full object-cover" />

			{/* Scrims: vertical for legibility, red wash for brand, hatch for texture. */}
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

			{/* Countdown rail */}
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

					<div className="hidden text-right sm:block">
						<p className="font-display text-2xl uppercase">Open CAL</p>
						<p className="text-sm text-muted-foreground">
							{formatDate(openCal.date, locale)} · {openCal.city}
						</p>
					</div>
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
