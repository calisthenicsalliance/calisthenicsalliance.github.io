import type { Metadata } from "next";
import { ArrowRight, Trophy } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { localeAlternates, localeParams, type Locale, type LocaleProps } from "@/i18n/routing";
import { battleResults, openCal, season } from "@/content/season";
import { formatDayMonth } from "@/lib/format";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Section, SectionHeader } from "@/components/shared/section";
import { PageHero } from "@/components/shared/page-hero";
import { OrderedList } from "@/components/shared/lists";
import { Card } from "@/components/ui/card";
import { BonusFormula } from "@/components/shared/bonus-formula";
import { Reveal } from "@/components/shared/reveal";

export const generateStaticParams = localeParams;

export async function generateMetadata({ params }: LocaleProps): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "rankings.meta" });
	return { title: t("title"), description: t("description"), alternates: localeAlternates(locale, "/rankings") };
}

export default async function RankingsPage({ params }: LocaleProps) {
	const { locale } = await params;
	setRequestLocale(locale);

	const t = await getTranslations({ locale, namespace: "rankings" });
	const scoring = await getTranslations({ locale, namespace: "home.scoring" });

	return (
		<>
			<PageHero
				eyebrow={t("hero.eyebrow", { season: season.label })}
				title={t("hero.title")}
				lead={t("hero.lead")}
			/>

			{/* standings go live after the opening event */}
			<Section tone="raised">
				<Reveal>
					<Card className="flex flex-col items-center gap-6 bg-hatch py-20 text-center">
						<Trophy className="size-12 text-brand/60" />
						<h2 className="max-w-xl text-3xl sm:text-4xl">{t("empty.title")}</h2>
						<p className="max-w-lg leading-relaxed text-muted-foreground">
							{t("empty.body", { date: formatDayMonth(openCal.date, locale as Locale) })}
						</p>
						<Link href="/open-cal" className={buttonVariants({ variant: "brand", size: "xl" })}>
							{t("empty.cta")}
							<ArrowRight />
						</Link>
					</Card>
				</Reveal>
			</Section>

			<Section>
				<SectionHeader eyebrow={t("how.eyebrow")} title={t("how.title")} />

				<h3 className="mt-12 mb-5 text-xl">{t("how.baseTitle")}</h3>
				<div className="grid grid-cols-2 gap-px overflow-hidden rounded-md border border-white/10 bg-white/10 sm:grid-cols-4">
					{battleResults.map((result) => (
						<div
							key={result.key}
							className="flex flex-col items-center justify-center gap-2 bg-background p-8 text-center">
							<span
								className={cn(
									"font-display text-5xl sm:text-6xl",
									result.key === "win" && "text-brand",
								)}>
								{result.points}
							</span>
							<span className="text-[0.65rem] tracking-[0.2em] text-muted-foreground uppercase">
								{scoring(result.key)}
							</span>
						</div>
					))}
				</div>

				<div className="mt-12 grid gap-6 lg:grid-cols-2">
					<div className="flex flex-col">
						<h3 className="mb-5 text-xl">{t("how.bonusTitle")}</h3>
						{/* flex-1 fills the column; h-full would resolve against a height this card defines */}
						<Card className="flex flex-1 flex-col items-center justify-center gap-5 border-brand/30 bg-gradient-to-br from-brand/15 to-transparent text-center">
							<BonusFormula />
							<p className="text-sm leading-relaxed text-muted-foreground">{t("how.bonusBody")}</p>
						</Card>
					</div>

					<div>
						<h3 className="mb-5 text-xl">{t("how.tiebreakTitle")}</h3>
						<OrderedList items={t.raw("how.tiebreak") as string[]} />
					</div>
				</div>
			</Section>
		</>
	);
}
