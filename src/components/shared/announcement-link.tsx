import { Link } from "@/i18n/navigation";

interface AnnouncementLinkProps {
	href: string;
	className?: string;
	children: React.ReactNode;
}

// site pages go through the locale-aware Link; files and other sites open in a new tab
export function AnnouncementLink({ href, className, children }: AnnouncementLinkProps) {
	if (/^https?:|\.\w+$/.test(href)) {
		return (
			<a href={href} target="_blank" rel="noreferrer noopener" className={className}>
				{children}
			</a>
		);
	}

	return (
		<Link href={href} className={className}>
			{children}
		</Link>
	);
}
