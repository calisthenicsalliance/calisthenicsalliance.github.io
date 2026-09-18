import type { Metadata } from "next";
import { ArrowDown } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { localeAlternates, localeParams, type Locale, type LocaleProps } from "@/i18n/routing";
import { openCalRoutines } from "@/content/routines";
import { openCal, season } from "@/content/season";
import { formatDate, formatDayMonth } from "@/lib/format";
import { buttonVariants } from "@/components/ui/button";
import { CtaBand, Routines } from "@/components/sections";
import { Section, SectionHeader } from "@/components/shared/section";
import { PageHero, Facts } from "@/components/shared/page-hero";
import { OrderedList, MarkedList } from "@/components/shared/lists";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/shared/reveal";
import { VenueLink } from "@/components/shared/venue-link";
import { TrailerPlayer } from "@/components/shared/trailer-player";

export const generateStaticParams = localeParams;

export async function generateMetadata({ params }: LocaleProps): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "openCal.meta" });
	return {
		title: t("title"),
		description: t("description", { date: formatDayMonth(openCal.date, locale as Locale) }),
		alternates: localeAlternates(locale, "/open-cal"),
	};
}

export default async function OpenCalPage({ params }: LocaleProps) {
	const { locale } = await params;
	setRequestLocale(locale);

	const t = await getTranslations({ locale, namespace: "openCal" });
	const common = await getTranslations({ locale, namespace: "common" });

	const highlights = t.raw("what.highlights") as { title: string; body: string }[];
	const steps = t.raw("day.steps") as { title: string; body: string }[];
	const date = formatDate(openCal.date, locale as Locale);
	const dayMonth = formatDayMonth(openCal.date, locale as Locale);

	return (
		<>
			<PageHero
				eyebrow={t("hero.eyebrow", { season: season.label })}
				title={t("hero.title")}
				lead={t("hero.subtitle")}>
				<Facts
					// the venue gets the room to stay on one line
					className="lg:grid-cols-[1fr_1.9fr_0.7fr]"
					items={[
						{ label: t("hero.dateLabel"), value: date },
						{ label: t("hero.venueLabel"), value: <VenueLink event={openCal} /> },
						{ label: t("hero.statusLabel"), value: t("hero.statusOpen") },
					]}
				/>
				{openCalRoutines ? (
					<a href="#routines" className={buttonVariants({ variant: "brand", size: "xl", className: "mt-8" })}>
						{t("routines.cta")}
						<ArrowDown />
					</a>
				) : null}
			</PageHero>

			<Section tone="raised">
				<div className="grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
					<div className="flex flex-col gap-8">
						<SectionHeader eyebrow={t("what.eyebrow")} title={t("what.title")} lead={t("what.body")} />

						<Reveal className="grid gap-px overflow-hidden rounded-md border border-white/10 bg-white/10 sm:grid-cols-2">
							{highlights.map((item) => (
								<div key={item.title} className="flex h-full flex-col gap-3 bg-card p-6">
									<h3 className="text-xl text-brand">{item.title}</h3>
									<p className="text-sm leading-relaxed text-muted-foreground">{item.body}</p>
								</div>
							))}
						</Reveal>
					</div>

					<Reveal delay={0.1}>
						<TrailerPlayer
							src="/videos/open-cal-trailer.mp4"
							poster="/images/open-cal-poster.jpg"
							playLabel={common("watchTrailer")}
							className="aspect-[4/5] rounded-md border border-brand/30"
						/>
					</Reveal>
				</div>
			</Section>

			<Section>
				<div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
					<div className="flex flex-col gap-8">
						<SectionHeader
							eyebrow={t("classification.eyebrow")}
							title={t("classification.title")}
							lead={t("classification.lead")}
						/>
						<OrderedList items={t.raw("classification.items") as string[]} />
						<p className="text-sm leading-relaxed text-muted-foreground/80">{t("classification.note")}</p>
					</div>

					<div className="flex flex-col gap-8">
						<SectionHeader eyebrow={t("day.eyebrow")} title={t("day.title")} />
						<ol className="relative flex flex-col gap-6 border-l border-white/10 pl-8">
							{steps.map((step, index) => (
								<li key={step.title} className="relative">
									<span
										aria-hidden
										className="absolute top-1.5 -left-[2.15rem] size-2.5 rotate-45 bg-brand"
									/>
									<h3 className="text-xl">
										<span className="mr-2 text-sm text-brand/60">
											{String(index + 1).padStart(2, "0")}
										</span>
										{step.title}
									</h3>
									<p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
								</li>
							))}
						</ol>
					</div>
				</div>

				<Reveal className="mt-16">
					<Card className="border-brand/40 bg-gradient-to-br from-brand/15 to-transparent">
						<h3 className="text-2xl sm:text-3xl">{t("special.title")}</h3>
						<p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">{t("special.body")}</p>
					</Card>
				</Reveal>
			</Section>

			<Section tone="raised">
				<div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
					<div className="flex flex-col gap-8">
						<SectionHeader
							eyebrow={t("exercises.eyebrow")}
							title={t("exercises.title")}
							lead={t("exercises.lead")}
						/>
						<ul className="grid gap-px overflow-hidden rounded-md border border-white/10 bg-white/10 sm:grid-cols-2">
							{(t.raw("exercises.items") as string[]).map((exercise) => (
								<li key={exercise} className="bg-card px-6 py-5 font-display text-lg uppercase">
									{exercise}
								</li>
							))}
						</ul>
					</div>

					<div className="flex flex-col gap-8">
						<SectionHeader eyebrow={t("equipment.eyebrow")} title={t("equipment.title")} />
						<div className="grid gap-6 sm:grid-cols-2">
							<Card>
								<h3 className="mb-5 text-lg text-brand">{t("equipment.allowedTitle")}</h3>
								<MarkedList items={t.raw("equipment.allowed") as string[]} />
							</Card>
							<Card>
								<h3 className="mb-5 text-lg text-muted-foreground">{t("equipment.forbiddenTitle")}</h3>
								<MarkedList items={t.raw("equipment.forbidden") as string[]} tone="negative" />
							</Card>
						</div>
					</div>
				</div>
			</Section>

			{openCalRoutines ? <Routines set={openCalRoutines} /> : null}

			<CtaBand title={t("cta.title", { date: dayMonth })} lead={t("cta.lead")} />
		</>
	);
}
