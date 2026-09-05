import { cn } from "@/lib/utils";

// the bordered surface every interior page builds its blocks from
export function Card({ className, ...props }: React.ComponentProps<"div">) {
	return <div className={cn("rounded-md border border-white/10 bg-white/[0.02] p-8", className)} {...props} />;
}
