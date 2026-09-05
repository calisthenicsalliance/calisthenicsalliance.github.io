"use client";

import { useSyncExternalStore } from "react";

interface CountdownProps {
	// ISO date of the target event
	target: string;
	labels: { days: string; hours: string; minutes: string; seconds: string };
	liveLabel: string;
}

// ticks once a second; the returned value only changes at second boundaries
function subscribe(onChange: () => void) {
	const id = setInterval(onChange, 1000);
	return () => clearInterval(id);
}

const getSnapshot = () => Math.floor(Date.now() / 1000);

// null on the server: a static export would otherwise ship a build-time countdown
const getServerSnapshot = () => null;

function remaining(nowInSeconds: number, target: string) {
	const diff = new Date(target).getTime() / 1000 - nowInSeconds;
	if (diff <= 0) return null;

	return {
		days: Math.floor(diff / 86_400),
		hours: Math.floor((diff / 3_600) % 24),
		minutes: Math.floor((diff / 60) % 60),
		seconds: Math.floor(diff % 60),
	};
}

export function Countdown({ target, labels, liveLabel }: CountdownProps) {
	const now = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

	if (now === null) {
		return <div className="h-[74px]" aria-hidden />;
	}

	const time = remaining(now, target);

	if (time === null) {
		return <p className="font-display text-2xl text-brand uppercase">{liveLabel}</p>;
	}

	const units = [
		{ value: time.days, label: labels.days },
		{ value: time.hours, label: labels.hours },
		{ value: time.minutes, label: labels.minutes },
		{ value: time.seconds, label: labels.seconds },
	];

	return (
		<div className="flex items-start gap-3 sm:gap-5">
			{units.map((unit, index) => (
				<div key={unit.label} className="flex items-start gap-3 sm:gap-5">
					<div className="min-w-14 text-center">
						<div className="font-display text-4xl tabular-nums sm:text-5xl">
							{String(unit.value).padStart(2, "0")}
						</div>
						<div className="mt-1 text-[0.65rem] tracking-[0.2em] text-muted-foreground uppercase">
							{unit.label}
						</div>
					</div>
					{index < units.length - 1 ? (
						<span aria-hidden className="pt-1 font-display text-3xl text-brand/50 sm:text-4xl">
							:
						</span>
					) : null}
				</div>
			))}
		</div>
	);
}
