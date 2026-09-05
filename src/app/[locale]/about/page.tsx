import type { Metadata } from "next";
import NextLink from "next/link";
import { Download, FileText } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { localeAlternates, localeParams, type Locale, type LocaleProps } from "@/i18n/routing";
import { site } from "@/config/site";
import { season } from "@/content/season";
import { formatDate } from "@/lib/format";
import { buttonVariants } from "@/components/ui/button";
import { CtaBand } from "@/components/sections";
import { Eyebrow, Section, SectionHeader } from "@/components/shared/section";
import { PageHero } from "@/components/shared/page-hero";
import { OrderedList, MarkedList } from "@/components/shared/lists";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/shared/reveal";

export const generateStaticParams = localeParams;

export async function generateMetadata({ params }: LocaleProps): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "about.meta" });
	return { title: t("title"), description: t("description"), alternates: localeAlternates(locale, "/about") };
}

export default async function AboutPage({ params }: LocaleProps) {
	const { locale } = await params;
	setRequestLocale(locale);

	const t = await getTranslations({ locale, namespace: "about" });
	const common = await getTranslations({ locale, namespace: "common" });
	const home = await getTranslations({ locale, namespace: "home.cta" });

	const formatBlocks = [
		{ title: t("format.battleTitle"), body: t("format.battleBody") },
		{ title: t("format.routineTitle"), body: t("format.routineBody") },
		{ title: t("format.callupTitle"), body: t("format.callupBody") },
		{ title: t("format.finalTitle"), body: t("format.finalBody") },
	];

	return (
		<>
			<PageHero eyebrow={t("hero.eyebrow")} title={t("hero.title")} lead={t("hero.lead")} />

			<Section tone="raised">
				<div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
					<SectionHeader title={t("story.title")} lead={t("story.body")} />
					<div className="flex flex-col gap-6">
						<SectionHeader eyebrow={t("objectives.eyebrow")} title={t("objectives.title")} />
						<MarkedList items={t.raw("objectives.items") as string[]} />
					</div>
				</div>
			</Section>

			<Section>
				<SectionHeader eyebrow={t("format.eyebrow")} title={t("format.title")} />
				<div className="mt-12 grid gap-6 sm:grid-cols-2">
					{formatBlocks.map((block, index) => (
						<Reveal key={block.title} delay={index * 0.06} className="h-full">
							<Card className="h-full">
								<h3 className="text-2xl text-brand">{block.title}</h3>
								<p className="mt-4 text-sm leading-relaxed text-muted-foreground">{block.body}</p>
							</Card>
						</Reveal>
					))}
				</div>
			</Section>

			<Section tone="raised">
				<div className="grid gap-12 lg:grid-cols-[1.10fr_0.90fr] lg:gap-16">
					<SectionHeader eyebrow={t("judging.eyebrow")} title={t("judging.title")} lead={t("judging.body")} />
					<div className="flex flex-col gap-6">
						<h3 className="text-xl">{t("judging.criteriaTitle")}</h3>
						<OrderedList items={t.raw("judging.criteria") as string[]} />
					</div>
				</div>
			</Section>

			{/* The regulation itself: a summary lives on this site, the PDF is the source of truth. */}
			<Section>
				<Reveal>
					<Card className="flex flex-col gap-6 border-brand/40 bg-gradient-to-br from-brand/15 to-transparent sm:p-12">
						<div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
							<div className="max-w-[39rem]">
								<Eyebrow className="mb-4">{t("regulation.eyebrow")}</Eyebrow>
								<h2 className="flex items-center gap-4 text-3xl sm:text-4xl">
									<FileText className="size-8 shrink-0 text-brand" />
									{t("regulation.title")}
								</h2>
								<p className="mt-4 leading-relaxed text-muted-foreground">{t("regulation.body")}</p>
							</div>

							<NextLink
								href={site.regulation.pt}
								target="_blank"
								rel="noreferrer noopener"
								hrefLang="pt"
								download
								className={buttonVariants({ variant: "brand", size: "2xl", className: "shrink-0" })}>
								<Download />
								{common("downloadRegulation")}
							</NextLink>
						</div>

						<p className="border-t border-white/10 pt-5 text-xs tracking-wider text-muted-foreground/70 uppercase">
							{t("regulation.meta", {
								version: site.regulation.version,
								date: formatDate(site.regulation.publishedAt, locale as Locale),
							})}
							{locale === "en" ? ` — ${t("regulation.onlyPt")}` : ""}
						</p>
					</Card>
				</Reveal>
			</Section>

			<CtaBand title={home("title")} lead={home("lead", { season: season.label })} />
		</>
	);
}
