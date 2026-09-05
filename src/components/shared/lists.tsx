import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

// numbered list, used where the regulation applies criteria in order
export function OrderedList({ items, className }: { items: string[]; className?: string }) {
	return (
		<ol className={cn("divide-y divide-white/10 border-y border-white/10", className)}>
			{items.map((item, index) => (
				<li key={item} className="flex items-start gap-5 py-5">
					<span className="w-8 shrink-0 font-display text-2xl text-brand">
						{String(index + 1).padStart(2, "0")}
					</span>
					<span className="text-sm leading-relaxed text-muted-foreground sm:text-base">{item}</span>
				</li>
			))}
		</ol>
	);
}

interface MarkedListProps {
	items: string[];
	tone?: "positive" | "negative";
	className?: string;
}

export function MarkedList({ items, tone = "positive", className }: MarkedListProps) {
	const Icon = tone === "positive" ? Check : X;

	return (
		<ul className={cn("flex flex-col gap-3", className)}>
			{items.map((item) => (
				<li key={item} className="flex items-start gap-3">
					<Icon
						className={cn(
							"mt-0.5 size-4 shrink-0",
							tone === "positive" ? "text-brand" : "text-muted-foreground",
						)}
					/>
					<span className="text-sm leading-relaxed text-muted-foreground">{item}</span>
				</li>
			))}
		</ul>
	);
}
