import { useTranslations } from "next-intl";
import { Section, SectionHeader } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";

export function Divisions() {
	const t = useTranslations("home.divisions");
	const items = t.raw("items") as { name: string; body: string }[];
	const categories = t.raw("categories") as string[];

	return (
		<Section>
			<div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
				<SectionHeader eyebrow={t("eyebrow")} title={t("title")} lead={t("lead")} className="max-w-2xl" />

				<div className="shrink-0">
					<p className="mb-3 text-[0.65rem] tracking-[0.25em] text-muted-foreground uppercase">
						{t("categoriesLabel")}
					</p>
					<div className="flex gap-3">
						{categories.map((category) => (
							<span
								key={category}
								className="rounded-sm border border-brand/40 bg-brand/10 px-4 py-2 text-sm font-semibold tracking-[0.1em] uppercase">
								{category}
							</span>
						))}
					</div>
				</div>
			</div>

			<div className="mt-14 grid gap-6 md:grid-cols-3">
				{items.map((item, index) => (
					<Reveal key={item.name} delay={index * 0.08} className="h-full">
						<article className="group relative flex h-full flex-col gap-4 overflow-hidden rounded-md border border-white/10 p-8 transition-colors hover:border-brand/50">
							<span
								aria-hidden
								className="absolute -top-10 -right-10 size-28 rotate-45 bg-brand/10 transition-transform duration-500 group-hover:scale-150"
							/>
							<h3 className="relative text-3xl text-brand">{item.name}</h3>
							<p className="relative text-sm leading-relaxed text-muted-foreground">{item.body}</p>
						</article>
					</Reveal>
				))}
			</div>

			<p className="mt-8 text-sm text-muted-foreground/80">{t("note")}</p>
		</Section>
	);
}
