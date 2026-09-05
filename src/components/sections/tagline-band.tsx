import { Marquee } from "@/components/shared/marquee";

// the poster's tagline, running as a red band directly under the hero
export function TaglineBand() {
	return (
		<div className="bg-brand text-white">
			<Marquee items={["Strength", "Endurance", "For All Levels"]} duration={35} className="py-4" />
		</div>
	);
}
