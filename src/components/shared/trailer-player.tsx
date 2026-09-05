"use client";

import { useRef, useState } from "react";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

interface TrailerPlayerProps {
	src: string;
	poster: string;
	playLabel: string;
	className?: string;
}

export function TrailerPlayer({ src, poster, playLabel, className }: TrailerPlayerProps) {
	const ref = useRef<HTMLVideoElement>(null);
	const [started, setStarted] = useState(false);

	function play() {
		void ref.current?.play();
		setStarted(true);
	}

	return (
		<div className={cn("group relative overflow-hidden bg-black", className)}>
			<video
				ref={ref}
				src={src}
				poster={poster}
				preload="none"
				playsInline
				controls={started}
				onPlay={() => setStarted(true)}
				className="size-full object-contain"
			/>

			{!started ? (
				<button
					type="button"
					onClick={play}
					aria-label={playLabel}
					className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors hover:bg-black/10">
					<span className="flex size-16 items-center justify-center rounded-full border border-brand/60 bg-brand/20 backdrop-blur-sm transition-colors group-hover:bg-brand">
						<Play className="ml-1 size-6 fill-current" />
					</span>
				</button>
			) : null}
		</div>
	);
}
