"use client";

import { useEffect, useRef } from "react";

interface LoopingVideoProps {
	src: string;
	className?: string;
	// seconds spent fading at each end of the loop
	fade?: number;
}

// a looping <video> cuts hard from its last frame back to its first, so both ends are faded to hide the seam
export function LoopingVideo({ src, className, fade = 0.4 }: LoopingVideoProps) {
	const ref = useRef<HTMLVideoElement>(null);

	useEffect(() => {
		const video = ref.current;
		if (!video) return;

		let frame = requestAnimationFrame(function tick() {
			frame = requestAnimationFrame(tick);
			const { currentTime, duration } = video;
			if (!Number.isFinite(duration) || duration === 0) return;

			const edge = Math.min(currentTime, duration - currentTime);
			video.style.opacity = String(Math.min(1, edge / fade));
		});

		return () => cancelAnimationFrame(frame);
	}, [fade]);

	return (
		<video
			ref={ref}
			autoPlay
			muted
			loop
			playsInline
			preload="auto"
			aria-hidden
			className={className}
			style={{ opacity: 0 }}>
			<source src={src} type="video/mp4" />
		</video>
	);
}
