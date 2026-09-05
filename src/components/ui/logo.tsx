import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
	className?: string;
	size?: number;
	withWordmark?: boolean;
}

export function Logo({ className, size = 44, withWordmark = true }: LogoProps) {
	return (
		<span className={cn("flex items-center gap-3", className)}>
			<Image
				src="/logos/cal.png"
				alt="Calisthenics Alliance"
				width={size}
				height={size}
				priority
				className="h-auto w-auto"
				style={{ width: size, height: size }}
			/>
			{withWordmark ? (
				<span className="hidden font-display text-xl leading-none tracking-wide uppercase sm:block">
					Calisthenics <span className="text-brand">Alliance</span>
				</span>
			) : null}
		</span>
	);
}
