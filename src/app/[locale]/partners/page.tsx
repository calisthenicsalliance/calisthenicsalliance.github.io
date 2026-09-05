import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { localeAlternates, localeParams, type LocaleProps } from "@/i18n/routing";
import { site } from "@/config/site";
import { partners } from "@/content/partners";
import { openCal } from "@/content/season";
import { cn } from "@/lib/utils";
import { Section, SectionHeader } from "@/components/shared/section";
import { PageHero } from "@/components/shared/page-hero";
import { InstagramIcon } from "@/components/ui/icons";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/shared/reveal";
import { VenueLink } from "@/components/shared/venue-link";

export const generateStaticParams = localeParams;

export async function generateMetadata({ params }: LocaleProps): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "partners.meta" });
	return { title: t("title"), description: t("description"), alternates: localeAlternates(locale, "/partners") };
}

export default async function PartnersPage({ params }: LocaleProps) {
	const { locale } = await params;
	setRequestLocale(locale);

	const t = await getTranslations({ locale, namespace: "partners" });

	return (
		<>
			<PageHero
				eyebrow={t("hero.eyebrow")}
				title={t("hero.title")}
				lead={t("hero.lead", { organizer: site.organizer.name })}
			/>

			<Section tone="raised">
				<div className="grid gap-6 md:grid-cols-3">
					{partners.map((partner, index) => (
						<Reveal key={partner.id} delay={index * 0.08} className="h-full">
							<a
								href={partner.url}
								target="_blank"
								rel="noreferrer noopener"
								className={cn(
									"group flex h-full flex-col overflow-hidden rounded-md border bg-black/30 transition-colors",
									partner.organizer
										? "border-brand/50 hover:border-brand"
										: "border-white/10 hover:border-brand/50",
								)}>
								<div
									className={cn(
										"flex aspect-[4/3] items-center justify-center p-8",
										partner.organizer ? "bg-brand/[0.07]" : "bg-white/[0.03]",
									)}>
									<Image
										src={partner.logo}
										alt={partner.name}
										width={314}
										height={264}
										className="max-h-40 w-auto opacity-80 transition duration-300 group-hover:scale-105 group-hover:opacity-100"
									/>
								</div>
								<div className="flex flex-1 flex-col items-start gap-2 border-t border-white/10 p-6">
									<div className="flex flex-wrap items-center gap-3">
										<h2 className="text-2xl">{partner.name}</h2>
										{partner.organizer ? (
											<span className="rounded-sm bg-brand px-2 py-1 text-[0.6rem] font-bold tracking-[0.15em] text-white uppercase">
												{t("organizerBadge")}
											</span>
										) : null}
									</div>
									{/* mt-auto pins every card's link to the bottom, so they line up across the row */}
									<span className="mt-auto inline-flex items-center gap-1 pt-4 text-xs tracking-widest text-brand uppercase">
										{t("visitProfile")}
										<ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
									</span>
								</div>
							</a>
						</Reveal>
					))}
				</div>

				<Reveal className="mt-10">
					<Card className="flex flex-col items-start gap-3 bg-hatch">
						<h2 className="text-2xl">{t("join.title")}</h2>
						<p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">{t("join.body")}</p>
						<a
							href={`mailto:${site.contacts.email}`}
							className="mt-2 text-sm font-semibold tracking-normal wrap-anywhere text-brand uppercase transition-colors hover:text-brand-bright sm:tracking-widest">
							{site.contacts.email}
						</a>
					</Card>
				</Reveal>
			</Section>

			<Section>
				<SectionHeader eyebrow={t("contact.eyebrow")} title={t("contact.title")} lead={t("contact.lead")} />

				<div className="mt-12 grid gap-6 lg:grid-cols-3">
					<Card className="flex flex-col gap-5">
						<h3 className="text-[0.65rem] tracking-[0.25em] text-muted-foreground uppercase">
							{t("contact.phoneLabel")}
						</h3>
						{site.contacts.people.map((person) => (
							<a
								key={person.tel}
								href={`tel:${person.tel}`}
								className="group flex flex-col gap-1 transition-colors">
								<span className="font-display text-lg uppercase transition-colors group-hover:text-brand">
									{person.name}
								</span>
								<span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
									<Phone className="size-3.5" />
									{person.phone}
								</span>
							</a>
						))}
					</Card>

					<Card className="flex flex-col gap-5">
						<h3 className="text-[0.65rem] tracking-[0.25em] text-muted-foreground uppercase">
							{t("contact.emailLabel")} · {t("contact.socialLabel")}
						</h3>
						<a
							href={`mailto:${site.contacts.email}`}
							className="inline-flex items-center gap-3 text-sm break-all transition-colors hover:text-brand">
							<Mail className="size-4 shrink-0 text-brand" />
							{site.contacts.email}
						</a>
						<a
							href={site.social.instagram}
							target="_blank"
							rel="noreferrer noopener"
							className="inline-flex items-center gap-3 text-sm transition-colors hover:text-brand">
							<InstagramIcon className="size-4 shrink-0 text-brand" />
							{site.social.instagramHandle}
						</a>
					</Card>

					<Card className="flex flex-col gap-5">
						<h3 className="text-[0.65rem] tracking-[0.25em] text-muted-foreground uppercase">
							{t("contact.locationLabel")}
						</h3>
						<p className="inline-flex items-start gap-3 text-sm leading-relaxed">
							<MapPin className="mt-0.5 size-4 shrink-0 text-brand" />
							<VenueLink event={openCal} />
						</p>
					</Card>
				</div>
			</Section>
		</>
	);
}
