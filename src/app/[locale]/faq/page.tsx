import type { Metadata } from "next";
import { Mail, Phone, Plus } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { localeAlternates, localeParams, type Locale, type LocaleProps } from "@/i18n/routing";
import { site } from "@/config/site";
import { openCal, season } from "@/content/season";
import { formatCurrency, formatDate } from "@/lib/format";
import { CtaBand } from "@/components/sections";
import { Section } from "@/components/shared/section";
import { PageHero } from "@/components/shared/page-hero";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/shared/reveal";

export const generateStaticParams = localeParams;

export async function generateMetadata({ params }: LocaleProps): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "faq.meta" });
	return { title: t("title"), description: t("description"), alternates: localeAlternates(locale, "/faq") };
}

const linkClass = "font-medium text-brand underline-offset-4 transition-colors hover:text-brand-bright hover:underline";

export default async function FaqPage({ params }: LocaleProps) {
	const { locale } = await params;
	setRequestLocale(locale);

	const t = await getTranslations({ locale, namespace: "faq" });
	const home = await getTranslations({ locale, namespace: "home.cta" });
	const common = await getTranslations({ locale, namespace: "common" });

	const groups = t.raw("groups") as { title: string; items: { question: string }[] }[];
	const { registration } = season;
	const values = {
		season: season.label,
		total: formatCurrency(registration.total, registration.currency, locale as Locale),
		installment: formatCurrency(registration.installments[0].amount, registration.currency, locale as Locale),
		deadline: registration.deadline ? formatDate(registration.deadline, locale as Locale) : common("tba"),
		instagram: site.social.instagramHandle,
		register: (chunks: React.ReactNode) => (
			<Link href="/register" className={linkClass}>
				{chunks}
			</Link>
		),
		openCal: (chunks: React.ReactNode) => (
			<Link href="/open-cal" className={linkClass}>
				{chunks}
			</Link>
		),
		instagramLink: (chunks: React.ReactNode) => (
			<a href={site.social.instagram} target="_blank" rel="noreferrer noopener" className={linkClass}>
				{chunks}
			</a>
		),
		map: (chunks: React.ReactNode) => (
			<a href={openCal.mapUrl} target="_blank" rel="noreferrer noopener" className={linkClass}>
				{chunks}
			</a>
		),
	};

	return (
		<>
			<PageHero eyebrow={t("hero.eyebrow")} title={t("hero.title")} lead={t("hero.lead")} />

			<Section tone="raised">
				<div className="flex flex-col gap-16 sm:gap-20">
					{groups.map((group, groupIndex) => (
						<Reveal key={group.title}>
							<div className="grid gap-6 lg:grid-cols-[1fr_2fr] lg:gap-16">
								<div className="flex items-baseline gap-4 lg:sticky lg:top-28 lg:flex-col lg:gap-2 lg:self-start">
									<span className="font-display text-3xl text-brand sm:text-4xl">
										{String(groupIndex + 1).padStart(2, "0")}
									</span>
									<h2 className="text-3xl sm:text-4xl">{group.title}</h2>
								</div>

								<div className="divide-y divide-white/10 border-y border-white/10">
									{group.items.map((item, itemIndex) => (
										<details key={item.question} className="group">
											<summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 font-semibold transition-colors hover:text-brand sm:text-lg [&::-webkit-details-marker]:hidden">
												{item.question}
												<Plus className="mt-0.5 size-5 shrink-0 text-brand transition-transform duration-200 group-open:rotate-45 sm:mt-1" />
											</summary>
											<p className="pr-11 pb-6 text-sm leading-relaxed text-muted-foreground sm:text-base">
												{t.rich(`groups.${groupIndex}.items.${itemIndex}.answer`, values)}
											</p>
										</details>
									))}
								</div>
							</div>
						</Reveal>
					))}
				</div>

				<Reveal className="mt-20">
					<Card className="flex flex-col items-start gap-3 bg-hatch">
						<h2 className="text-2xl">{t("more.title")}</h2>
						<p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">{t("more.body")}</p>
						<div className="mt-2 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-10">
							<a
								href={`mailto:${site.contacts.email}`}
								className="inline-flex items-center gap-3 text-sm wrap-anywhere transition-colors hover:text-brand">
								<Mail className="size-4 shrink-0 text-brand" />
								{site.contacts.email}
							</a>
							{site.contacts.people.map((person) => (
								<a
									key={person.tel}
									href={`tel:${person.tel}`}
									className="group inline-flex items-center gap-3 text-sm transition-colors hover:text-brand">
									<Phone className="size-4 shrink-0 text-brand" />
									{person.name}
									<span className="text-muted-foreground transition-colors group-hover:text-brand">
										{person.phone}
									</span>
								</a>
							))}
						</div>
					</Card>
				</Reveal>
			</Section>

			<CtaBand
				title={home("title")}
				lead={home("lead", { season: season.label })}
				secondaryLabel={home("secondary")}
				secondaryHref={site.regulation.pt}
			/>
		</>
	);
}
