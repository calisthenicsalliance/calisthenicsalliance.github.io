import { cn } from "@/lib/utils";

interface MarqueeProps {
	items: string[];
	className?: string;
	// seconds for one full pass
	duration?: number;
}

// rendered twice and translated -50%, so the loop is seamless at any width
export function Marquee({ items, className, duration = 40 }: MarqueeProps) {
	const track = [...items, ...items];

	return (
		<div className={cn("group relative flex overflow-hidden", className)} aria-hidden>
			<div
				className="flex shrink-0 items-center gap-10 pr-10 group-hover:[animation-play-state:paused]"
				style={{ animation: `marquee ${duration}s linear infinite` }}>
				{track.map((item, index) => (
					<span key={`${item}-${index}`} className="flex shrink-0 items-center gap-10">
						<span className="font-display text-2xl tracking-wide whitespace-nowrap uppercase sm:text-3xl">
							{item}
						</span>
						<span className="size-2 shrink-0 rotate-45 bg-brand" />
					</span>
				))}
			</div>
		</div>
	);
}
