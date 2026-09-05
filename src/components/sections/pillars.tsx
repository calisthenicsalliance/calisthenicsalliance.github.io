import { Repeat, ScaleIcon, Trophy } from "lucide-react";
import { useTranslations } from "next-intl";
import { Section, SectionHeader } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";

const icons = [Repeat, ScaleIcon, Trophy];

export function Pillars() {
	const t = useTranslations("home.pillars");
	const items = t.raw("items") as { title: string; body: string }[];

	return (
		<Section>
			<SectionHeader eyebrow={t("eyebrow")} title={t("title")} lead={t("lead")} />

			<div className="mt-14 grid gap-px overflow-hidden rounded-md border border-white/10 bg-white/10 sm:grid-cols-3">
				{items.map((item, index) => {
					const Icon = icons[index] ?? Trophy;
					return (
						<Reveal
							key={item.title}
							delay={index * 0.08}
							className="group relative flex flex-col gap-4 bg-background p-8">
							<span className="absolute top-6 right-6 font-display text-4xl text-muted-foreground/25">
								{String(index + 1).padStart(2, "0")}
							</span>
							<Icon className="size-7 text-brand" />
							<h3 className="text-2xl">{item.title}</h3>
							<p className="text-sm leading-relaxed text-muted-foreground">{item.body}</p>
							<span
								aria-hidden
								className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-brand transition-transform duration-300 group-hover:scale-x-100"
							/>
						</Reveal>
					);
				})}
			</div>
		</Section>
	);
}
