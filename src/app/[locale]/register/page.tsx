import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { localeAlternates, localeParams, type Locale, type LocaleProps } from "@/i18n/routing";
import { site } from "@/config/site";
import { season } from "@/content/season";
import { formatCurrency, formatDate } from "@/lib/format";
import { buttonVariants, fluidButton } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CtaBand } from "@/components/sections";
import { Eyebrow, Section, SectionHeader } from "@/components/shared/section";
import { PageHero } from "@/components/shared/page-hero";
import { MarkedList } from "@/components/shared/lists";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/shared/reveal";

export const generateStaticParams = localeParams;

export async function generateMetadata({ params }: LocaleProps): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "register.meta" });
	return {
		title: t("title"),
		description: t("description", { season: season.label }),
		alternates: localeAlternates(locale, "/register"),
	};
}

export default async function RegisterPage({ params }: LocaleProps) {
	const { locale } = await params;
	setRequestLocale(locale);

	const t = await getTranslations({ locale, namespace: "register" });
	const common = await getTranslations({ locale, namespace: "common" });

	const steps = t.raw("steps.items") as { title: string; body: string }[];
	const conditions = t.raw("conditions.items") as { title: string; body: string }[];
	const installmentCopy = t.raw("fee.installments") as { title: string; body: string }[];
	const { registration } = season;

	return (
		<>
			<PageHero
				eyebrow={t("hero.eyebrow", { season: season.label })}
				title={t("hero.title")}
				lead={t("hero.lead")}>
				<div className="mt-10">
					<a
						href={site.registrationUrl}
						target="_blank"
						rel="noreferrer noopener"
						className={cn(buttonVariants({ variant: "brand", size: "2xl" }), fluidButton)}>
						{common("registerLong", { season: season.label })}
						<ArrowRight />
					</a>
				</div>
			</PageHero>

			<Section tone="raised">
				<SectionHeader eyebrow={t("steps.eyebrow")} title={t("steps.title")} />
				<ol className="mt-12 grid gap-6 sm:grid-cols-3">
					{steps.map((step, index) => (
						<Reveal key={step.title} delay={index * 0.06} className="h-full">
							<li className="flex h-full flex-col gap-4 rounded-md border border-white/10 bg-black/30 p-7">
								<span className="font-display text-4xl text-brand">
									{String(index + 1).padStart(2, "0")}
								</span>
								<h3 className="text-xl">{step.title}</h3>
								<p className="text-sm leading-relaxed text-muted-foreground">{step.body}</p>
							</li>
						</Reveal>
					))}
				</ol>
			</Section>

			<Section>
				<div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
					<div className="flex flex-col gap-8">
						<SectionHeader eyebrow={t("fee.eyebrow")} title={t("fee.title")} />

						<Card className="border-brand/40 bg-gradient-to-br from-brand/15 to-transparent">
							<p className="text-[0.65rem] tracking-[0.25em] text-muted-foreground uppercase">
								{t("fee.totalLabel")}
							</p>
							<p className="mt-2 font-display text-6xl sm:text-7xl">
								{formatCurrency(registration.total, registration.currency, locale as Locale)}
							</p>

							<p className="mt-8 mb-4 text-[0.65rem] tracking-[0.25em] text-muted-foreground uppercase">
								{t("fee.orLabel")}
							</p>
							<div className="grid gap-px overflow-hidden rounded-md border border-white/10 bg-white/10 sm:grid-cols-2">
								{registration.installments.map((installment, index) => (
									<div key={installment.id} className="flex flex-col gap-1 bg-card p-5">
										<span className="font-display text-3xl text-brand">
											{formatCurrency(
												installment.amount,
												registration.currency,
												locale as Locale,
											)}
										</span>
										<span className="text-sm font-medium">{installmentCopy[index]?.title}</span>
										<span className="text-xs leading-relaxed text-muted-foreground">
											{installmentCopy[index]?.body}
										</span>
									</div>
								))}
							</div>

							<p className="mt-6 text-xs leading-relaxed text-muted-foreground/70">{t("fee.support")}</p>
						</Card>

						<div className="flex flex-col gap-5">
							<Eyebrow>{t("payment.eyebrow")}</Eyebrow>
							<h3 className="text-2xl">{t("payment.title")}</h3>

							<div className="flex flex-col gap-2 rounded-md border border-brand/50 bg-card p-6">
								<div className="flex items-center justify-between gap-3">
									<span className="text-[0.65rem] tracking-[0.25em] text-brand uppercase">
										{t("payment.cashLabel")}
									</span>
									<span className="shrink-0 rounded-sm bg-brand px-2 py-0.5 text-[0.6rem] font-bold tracking-[0.15em] text-white uppercase">
										{t("payment.preferred")}
									</span>
								</div>
								<span className="text-sm">{t("payment.cashNote")}</span>
							</div>

							<div className="grid gap-4 sm:grid-cols-[1.7fr_1fr]">
								<div className="flex flex-col gap-2 rounded-md border border-white/10 bg-card p-6">
									<span className="text-[0.65rem] tracking-[0.25em] text-muted-foreground uppercase">
										{t("payment.ibanLabel")}
									</span>
									<span className="font-mono text-sm whitespace-nowrap">{site.payment.iban}</span>
								</div>
								<div className="flex flex-col gap-2 rounded-md border border-white/10 bg-card p-6">
									<span className="text-[0.65rem] tracking-[0.25em] text-muted-foreground uppercase">
										{t("payment.mbwayLabel")}
									</span>
									<span className="font-mono text-sm">{site.payment.mbway}</span>
								</div>
							</div>

							<p className="text-xs leading-relaxed text-muted-foreground/70">
								{t.rich("payment.proof", {
									tel: site.payment.mbway,
									link: (chunks) => (
										<a
											href={`https://wa.me/${site.payment.proofTel.replace("+", "")}`}
											target="_blank"
											rel="noreferrer noopener"
											className="font-medium text-brand underline-offset-4 transition-colors hover:text-brand-bright hover:underline">
											{chunks}
										</a>
									),
								})}
							</p>
						</div>

						<div className="flex flex-wrap items-baseline gap-3 border-t border-white/10 pt-6">
							<span className="text-[0.65rem] tracking-[0.25em] text-muted-foreground uppercase">
								{t("fee.deadlineLabel")}
							</span>
							<span className="font-display text-lg uppercase">
								{registration.deadline
									? formatDate(registration.deadline, locale as Locale)
									: common("tba")}
							</span>
						</div>
					</div>

					<div className="flex flex-col gap-8">
						<Card>
							<h3 className="mb-5 text-xl">{t("fee.includesTitle")}</h3>
							<MarkedList items={t.raw("fee.includes") as string[]} />
						</Card>
						<Card>
							<Eyebrow className="mb-4">{t("eligibility.eyebrow")}</Eyebrow>
							<h3 className="mb-5 text-xl">{t("eligibility.title")}</h3>
							<MarkedList items={t.raw("eligibility.items") as string[]} />
						</Card>
					</div>
				</div>
			</Section>

			<Section tone="raised">
				<SectionHeader eyebrow={t("conditions.eyebrow")} title={t("conditions.title")} />
				<div className="mt-12 grid gap-6 sm:grid-cols-2">
					{conditions.map((condition, index) => (
						<Reveal key={condition.title} delay={index * 0.06} className="h-full">
							<Card className="h-full bg-black/30">
								<h3 className="text-xl text-brand">{condition.title}</h3>
								<p className="mt-3 text-sm leading-relaxed text-muted-foreground">{condition.body}</p>
							</Card>
						</Reveal>
					))}
				</div>
			</Section>

			<CtaBand title={t("cta.title")} lead={t("cta.lead")} note={t("cta.note")} />
		</>
	);
}
