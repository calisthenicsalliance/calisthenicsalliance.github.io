import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { season } from "@/content/season";
import { formatDate } from "@/lib/format";
import { Section, SectionHeader } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";

export function SeasonTimeline() {
	const t = useTranslations("home.season");
	const common = useTranslations("common");
	const locale = useLocale() as Locale;
	const phases = t.raw("phases") as { tag: string; title: string; body: string }[];

	// one card per phase, annotated with the dates known so far
	const dates = [
		season.events.filter((event) => event.phase === "open"),
		season.events.filter((event) => event.phase === "regular"),
		season.events.filter((event) => event.phase === "final"),
	];

	return (
		<Section tone="raised">
			<SectionHeader eyebrow={t("eyebrow")} title={t("title")} lead={t("lead")} />

			<ol className="mt-14 grid gap-6 lg:grid-cols-3">
				{phases.map((phase, index) => {
					const events = dates[index] ?? [];
					const scheduled = events.filter((event) => event.date);

					return (
						<Reveal key={phase.title} delay={index * 0.08} className="h-full">
							<li className="relative flex h-full flex-col gap-4 rounded-md border border-white/10 bg-black/40 p-8">
								{/* Connector between cards on wide screens. */}
								{index < phases.length - 1 ? (
									<span
										aria-hidden
										className="absolute top-14 -right-3 hidden h-px w-6 bg-white/15 lg:block"
									/>
								) : null}

								<div className="flex items-center justify-between">
									<span className="rounded-sm bg-brand/15 px-2 py-1 text-[0.65rem] font-semibold tracking-[0.2em] text-brand uppercase">
										{phase.tag}
									</span>
									<span className="font-display text-3xl text-muted-foreground/25">
										{String(index + 1).padStart(2, "0")}
									</span>
								</div>

								<h3 className="text-3xl">{phase.title}</h3>
								<p className="flex-1 text-sm leading-relaxed text-muted-foreground">{phase.body}</p>

								<p className="border-t border-white/10 pt-4 text-xs tracking-[0.15em] uppercase">
									{scheduled.length > 0 ? (
										<span className="text-foreground">
											{scheduled.map((event) => formatDate(event.date!, locale)).join(" · ")}
										</span>
									) : (
										<span className="text-muted-foreground/70">{common("tba")}</span>
									)}
								</p>
							</li>
						</Reveal>
					);
				})}
			</ol>
		</Section>
	);
}
