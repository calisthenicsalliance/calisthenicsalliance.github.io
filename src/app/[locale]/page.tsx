import { getTranslations, setRequestLocale } from "next-intl/server";
import { site } from "@/config/site";
import { season } from "@/content/season";
import {
	Hero,
	TaglineBand,
	NextEvent,
	Pillars,
	SeasonTimeline,
	Divisions,
	Scoring,
	PartnersStrip,
	CtaBand,
} from "@/components/sections";

interface PageProps {
	params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: PageProps) {
	const { locale } = await params;
	setRequestLocale(locale);

	const t = await getTranslations({ locale, namespace: "home.cta" });

	return (
		<>
			<Hero />
			<TaglineBand />
			<NextEvent />
			<Pillars />
			<SeasonTimeline />
			<Divisions />
			<Scoring />
			<PartnersStrip />
			<CtaBand
				title={t("title")}
				lead={t("lead", { season: season.label })}
				secondaryLabel={t("secondary")}
				secondaryHref={site.regulation.pt}
			/>
		</>
	);
}
