import { ArrowRight, CalendarDays, MapPin, Signal } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { openCal } from "@/content/season";
import { formatDate } from "@/lib/format";
import { buttonVariants } from "@/components/ui/button";
import { Section, Eyebrow } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";
import { VenueLink } from "@/components/shared/venue-link";
import { TrailerPlayer } from "@/components/shared/trailer-player";

export function NextEvent() {
	const t = useTranslations("home.nextEvent");
	const common = useTranslations("common");
	const locale = useLocale() as Locale;

	const facts = [
		{ icon: CalendarDays, label: t("dateLabel"), value: formatDate(openCal.date, locale) },
		{ icon: MapPin, label: t("venueLabel"), value: <VenueLink event={openCal} /> },
		{ icon: Signal, label: t("levelLabel"), value: t("level") },
	];

	return (
		<Section tone="raised">
			<div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
				<Reveal className="relative">
					<TrailerPlayer
						src="/videos/open-cal-trailer.mp4"
						poster="/images/open-cal-poster.jpg"
						playLabel={common("watchTrailer")}
						className="aspect-[4/5] rounded-md border border-brand/30"
					/>
					<span
						aria-hidden
						className="absolute -top-3 -left-3 -z-10 size-24 rounded-md bg-brand opacity-30"
					/>
				</Reveal>

				<Reveal delay={0.1} className="flex flex-col gap-7">
					<Eyebrow>{t("eyebrow")}</Eyebrow>
					<h2 className="text-5xl sm:text-6xl lg:text-7xl">{t("title")}</h2>
					<p className="text-base leading-relaxed text-muted-foreground sm:text-lg">{t("lead")}</p>

					<dl className="divide-y divide-white/10 border-y border-white/10">
						{facts.map((fact) => (
							<div key={fact.label} className="flex items-center gap-4 py-4">
								<fact.icon className="size-5 shrink-0 text-brand" />
								<dt className="w-24 shrink-0 text-xs tracking-[0.2em] text-muted-foreground uppercase">
									{fact.label}
								</dt>
								<dd className="text-sm font-medium sm:text-base">{fact.value}</dd>
							</div>
						))}
					</dl>

					<div>
						<Link href="/open-cal" className={buttonVariants({ variant: "brand", size: "xl" })}>
							{t("cta")}
							<ArrowRight />
						</Link>
					</div>
				</Reveal>
			</div>
		</Section>
	);
}
