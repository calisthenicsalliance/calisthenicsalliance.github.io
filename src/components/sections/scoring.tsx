import { useTranslations } from "next-intl";
import { battleResults } from "@/content/season";
import { Section, SectionHeader } from "@/components/shared/section";
import { BonusFormula } from "@/components/shared/bonus-formula";
import { Reveal } from "@/components/shared/reveal";

export function Scoring() {
	const t = useTranslations("home.scoring");

	return (
		<Section tone="raised">
			<SectionHeader eyebrow={t("eyebrow")} title={t("title")} lead={t("lead")} />

			<div className="mt-14 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
				<div className="grid grid-cols-2 gap-px overflow-hidden rounded-md border border-white/10 bg-white/10 sm:grid-cols-4">
					{battleResults.map((result, index) => (
						<Reveal key={result.key} delay={index * 0.06} className="bg-background">
							<div className="flex h-full flex-col items-center justify-center gap-2 p-8 text-center">
								<span
									className={
										result.key === "win"
											? "font-display text-5xl text-brand sm:text-6xl"
											: "font-display text-5xl sm:text-6xl"
									}>
									{result.points}
								</span>
								<span className="text-[0.65rem] tracking-[0.2em] text-muted-foreground uppercase">
									{t(result.key)}
								</span>
							</div>
						</Reveal>
					))}
				</div>

				<Reveal delay={0.15}>
					<div className="flex h-full flex-col items-center justify-center gap-5 rounded-md border border-brand/30 bg-gradient-to-br from-brand/15 to-transparent p-8 text-center">
						<h3 className="text-2xl">{t("bonusTitle")}</h3>
						<BonusFormula />
						<p className="text-sm leading-relaxed text-muted-foreground">{t("bonusBody")}</p>
						<p className="text-xs tracking-wider text-muted-foreground/70 uppercase">{t("bonusLegend")}</p>
					</div>
				</Reveal>
			</div>
		</Section>
	);
}
