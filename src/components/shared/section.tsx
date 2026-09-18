import { cn } from "@/lib/utils";
import { Container } from "./container";

interface SectionProps extends React.ComponentProps<"section"> {
	// renders the section on the raised surface color instead of the page background
	tone?: "default" | "raised";
}

export function Section({ className, tone = "default", children, ...props }: SectionProps) {
	return (
		<section
			className={cn("relative border-t border-white/5 py-20 sm:py-28", tone === "raised" && "bg-card", className)}
			{...props}>
			<Container>{children}</Container>
		</section>
	);
}

export function Eyebrow({ className, children, ...props }: React.ComponentProps<"p">) {
	return (
		<p className={cn("eyebrow", className)} {...props}>
			<span aria-hidden className="h-px w-8 bg-brand" />
			{children}
		</p>
	);
}

interface SectionHeaderProps {
	eyebrow?: string;
	title: string;
	lead?: string;
	align?: "start" | "center";
	className?: string;
	leadClassName?: string;
}

export function SectionHeader({ eyebrow, title, lead, align = "start", className, leadClassName }: SectionHeaderProps) {
	return (
		<div className={cn("flex flex-col gap-5", align === "center" && "items-center text-center", className)}>
			{eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
			<h2 className="text-4xl sm:text-5xl lg:text-6xl">{title}</h2>
			{lead ? (
				<p
					className={cn(
						"max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg",
						leadClassName,
					)}>
					{lead}
				</p>
			) : null}
		</div>
	);
}
