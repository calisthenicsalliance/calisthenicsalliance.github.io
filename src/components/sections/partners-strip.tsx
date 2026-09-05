import Image from "next/image";
import { useTranslations } from "next-intl";
import { partners } from "@/content/partners";
import { Section, SectionHeader } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";

export function PartnersStrip() {
	const t = useTranslations("home.partners");

	return (
		<Section>
			<SectionHeader eyebrow={t("eyebrow")} title={t("title")} lead={t("lead")} align="center" />

			<div className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-6 sm:grid-cols-3">
				{partners.map((partner, index) => (
					<Reveal key={partner.id} delay={index * 0.08}>
						<a
							href={partner.url}
							target="_blank"
							rel="noreferrer noopener"
							title={partner.name}
							className="group flex aspect-[3/2] items-center justify-center rounded-md border border-white/10 bg-white/[0.03] p-8 transition-colors hover:border-brand/40">
							<Image
								src={partner.logo}
								alt={partner.name}
								width={314}
								height={264}
								className="max-h-24 w-auto opacity-60 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0"
							/>
						</a>
					</Reveal>
				))}
			</div>
		</Section>
	);
}
