import type { ScheduledEvent } from "@/content/season";
import { cn } from "@/lib/utils";

interface VenueLinkProps {
	event: ScheduledEvent;
	className?: string;
}

export function VenueLink({ event, className }: VenueLinkProps) {
	return (
		<a
			href={event.mapUrl}
			target="_blank"
			rel="noreferrer noopener"
			className={cn("underline-offset-4 transition-colors hover:text-brand hover:underline", className)}>
			{event.venue}, {event.city}
		</a>
	);
}
