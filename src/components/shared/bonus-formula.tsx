import { season } from "@/content/season";
import { cn } from "@/lib/utils";

// Art. 33.º bonus; the aria-label spells out the symbols for screen readers
export function BonusFormula({ className }: { className?: string }) {
	const { maxBonus } = season.scoring;

	return (
		<p
			// a formula must never wrap, so it scales with the viewport instead of breaking
			className={cn("font-mono text-[clamp(0.8125rem,4.2vw,1.5rem)] whitespace-nowrap text-brand", className)}
			aria-label={`B = ${maxBonus} x (N - P) / (N - 1)`}>
			B = {maxBonus} × (N − P) ÷ (N − 1)
		</p>
	);
}
