import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import type { Routine, RoutineSet } from "@/content/routines";
import { formatDate } from "@/lib/format";
import { Section, SectionHeader } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";

export function Routines({ set }: { set: RoutineSet }) {
	const t = useTranslations("openCal.routines");
	const locale = useLocale() as Locale;

	return (
		// the fixed header would otherwise cover the title when arriving through #routines
		<Section id="routines" className="scroll-mt-16">
			<div className="grid gap-6 sm:grid-cols-[1fr_auto] sm:items-end sm:gap-12">
				<SectionHeader
					eyebrow={t("eyebrow")}
					title={t("title")}
					lead={t("lead")}
					leadClassName="max-w-[45rem]"
				/>
				<p className="flex flex-col gap-1 sm:text-right">
					<span className="text-[0.65rem] tracking-[0.25em] text-muted-foreground uppercase">
						{t("publishedLabel")}
					</span>
					<span className="font-display text-lg uppercase">{formatDate(set.publishedAt, locale)}</span>
				</p>
			</div>

			<div className="mt-12 grid gap-6 md:grid-cols-2">
				{set.routines.map((routine, index) => (
					<Reveal key={routine.category} delay={index * 0.08} className="h-full">
						<RoutineCard routine={routine} />
					</Reveal>
				))}
			</div>
		</Section>
	);
}

function RoutineCard({ routine }: { routine: Routine }) {
	const t = useTranslations("openCal.routines");
	const common = useTranslations("common");

	return (
		<div className="flex h-full flex-col rounded-md border border-brand/30 bg-gradient-to-br from-brand/15 to-transparent p-6 sm:p-8">
			<h3 className="text-2xl sm:text-3xl">{t(`categories.${routine.category}`)}</h3>

			{/* equal rows: each takes the height of the tallest, tagged or not */}
			<ol className="mt-5 grid flex-1 auto-rows-fr divide-y divide-white/10 border-y border-white/10">
				{routine.exercises.map((item, index) => (
					// the same exercise can appear more than once, so the position is the key
					<li key={index} className="flex items-center gap-4 py-2.5">
						<span className="w-5 shrink-0 text-xs text-brand/60 tabular-nums">
							{String(index + 1).padStart(2, "0")}
						</span>
						<span className="w-12 shrink-0 font-display text-3xl text-brand tabular-nums sm:w-14 sm:text-4xl">
							{item.amount}
							{item.unit === "seconds" ? "″" : null}
						</span>
						<div className="flex min-w-0 flex-col gap-1">
							<span className="font-display text-xl uppercase sm:text-2xl">{item.exercise}</span>
							{item.load || item.unbroken ? (
								<div className="flex flex-wrap gap-2">
									{item.load ? <Tag>{t(`gear.${item.load.gear}`, { kg: item.load.kg })}</Tag> : null}
									{item.unbroken ? <Tag>{t("unbroken")}</Tag> : null}
								</div>
							) : null}
						</div>
					</li>
				))}
			</ol>

			<div className="mt-5 flex items-baseline justify-between gap-4">
				<span className="text-xs tracking-[0.2em] text-muted-foreground uppercase">{t("timecap")}</span>
				<span className="font-display text-lg uppercase">
					{routine.timecap ? t("minutes", { count: routine.timecap }) : common("tba")}
				</span>
			</div>
		</div>
	);
}

function Tag({ children }: { children: React.ReactNode }) {
	return (
		<span className="rounded-sm bg-brand/15 px-2 py-0.5 text-[0.6rem] font-semibold tracking-[0.2em] text-brand uppercase">
			{children}
		</span>
	);
}
