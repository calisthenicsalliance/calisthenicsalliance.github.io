import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { Highlight } from "@/components/landing/highlight";
import { Sponsors } from "@/components/landing/sponsors";
import { CTA } from "@/components/landing/cta";

export default function HomePage() {
	return (
		<>
			<Hero />
			<Sponsors />
			<Features />
			<Highlight />
			<CTA />
		</>
	);
}
