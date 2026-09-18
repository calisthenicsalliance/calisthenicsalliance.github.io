import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import NextLink from "next/link";
import { site } from "@/config/site";
import { season } from "@/content/season";
import { buttonVariants, fluidButton } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Container } from "@/components/shared/container";
import { Marquee } from "@/components/shared/marquee";

interface CtaBandProps {
	title: string;
	lead: string;
	secondaryLabel?: string;
	secondaryHref?: string;
	note?: string;
}

// the closing call to action, reused at the bottom of every page
export function CtaBand({ title, lead, secondaryLabel, secondaryHref, note }: CtaBandProps) {
	const common = useTranslations("common");

	return (
		<section className="relative overflow-hidden border-t border-white/10">
			<div className="absolute inset-0 bg-gradient-to-br from-brand/25 via-background to-background" />
			<div className="absolute inset-0 bg-hatch opacity-50" />

			<Container className="relative py-24 text-center sm:py-32">
				<h2 className="mx-auto max-w-3xl text-4xl sm:text-6xl">{title}</h2>
				<p className="mx-auto mt-6 max-w-xl text-base leading-relaxed whitespace-pre-line text-muted-foreground sm:text-lg">
					{lead}
				</p>

				<div className="mt-10 flex flex-wrap items-center justify-center gap-4">
					<a
						href={site.registrationUrl}
						target="_blank"
						rel="noreferrer noopener"
						className={cn(buttonVariants({ variant: "brand", size: "2xl" }), fluidButton)}>
						{common("registerLong", { season: season.label })}
						<ArrowRight />
					</a>
					{secondaryLabel && secondaryHref ? (
						<NextLink
							href={secondaryHref}
							target="_blank"
							rel="noreferrer noopener"
							className={cn(
								buttonVariants({
									variant: "outline",
									size: "2xl",
									className: "border-white/25 bg-white/5",
								}),
								fluidButton,
							)}>
							{secondaryLabel}
						</NextLink>
					) : null}
				</div>

				{note ? <p className="mt-8 text-sm text-muted-foreground/70">{note}</p> : null}
			</Container>

			<div className="border-t border-white/10 py-5">
				<Marquee items={["Strength", "Endurance", "For All Levels"]} duration={30} />
			</div>
		</section>
	);
}
