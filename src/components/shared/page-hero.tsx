import { cn } from "@/lib/utils";
import { Container } from "./container";
import { Eyebrow } from "./section";

interface PageHeroProps {
	eyebrow: string;
	title: string;
	lead?: string;
	children?: React.ReactNode;
	className?: string;
}

// the banner every interior page opens with
export function PageHero({ eyebrow, title, lead, children, className }: PageHeroProps) {
	return (
		<section className={cn("relative overflow-hidden pt-36 pb-16 sm:pt-44 sm:pb-20", className)}>
			<div className="absolute inset-0 bg-[radial-gradient(90%_70%_at_15%_0%,var(--tw-gradient-from),transparent_65%)] from-brand/20" />
			<div className="absolute inset-0 bg-hatch opacity-40" />

			<Container className="relative">
				<Eyebrow>{eyebrow}</Eyebrow>
				<h1 className="mt-6 max-w-4xl text-5xl sm:text-6xl lg:text-7xl">{title}</h1>
				{lead ? (
					<p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">{lead}</p>
				) : null}
				{children}
			</Container>
		</section>
	);
}

interface FactsProps {
	items: { label: string; value: React.ReactNode }[];
	className?: string;
}

// a row of label/value pairs, used under page heroes
export function Facts({ items, className }: FactsProps) {
	return (
		<dl
			className={cn(
				"mt-10 grid gap-px overflow-hidden rounded-md border border-white/10 bg-white/10 sm:grid-cols-3",
				className,
			)}>
			{items.map((item) => (
				<div key={item.label} className="flex flex-col gap-2 bg-background p-6">
					<dt className="text-[0.65rem] tracking-[0.25em] text-muted-foreground uppercase">{item.label}</dt>
					<dd className="font-display text-xl uppercase">{item.value}</dd>
				</div>
			))}
		</dl>
	);
}
