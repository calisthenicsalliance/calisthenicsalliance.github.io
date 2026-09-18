"use client";

import { NavigationMenu } from "@base-ui/react/navigation-menu";
import { ChevronDown } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { navigation } from "@/config/site";
import { openCal, season } from "@/content/season";
import { formatDayMonth } from "@/lib/format";
import { cn } from "@/lib/utils";

const itemClass =
	"relative inline-flex items-center gap-1.5 py-1 text-[0.875rem] font-semibold tracking-[0.1em] uppercase transition-colors";

function ActiveBar() {
	return <span className="absolute -bottom-0.5 left-0 h-0.5 w-full bg-brand" />;
}

export function DesktopNav({ className }: { className?: string }) {
	const t = useTranslations("nav");
	const locale = useLocale() as Locale;
	const pathname = usePathname();

	const hintValues = { date: formatDayMonth(openCal.date, locale), city: openCal.city };
	const undatedEvents = season.events.some((event) => !event.date);

	return (
		<NavigationMenu.Root className={className}>
			<NavigationMenu.List className="flex items-center gap-8">
				{navigation.map((item) => {
					if (!("links" in item)) {
						const active = pathname === item.href;
						return (
							<NavigationMenu.Item key={item.key}>
								<NavigationMenu.Link
									render={<Link href={item.href} />}
									active={active}
									className={cn(
										itemClass,
										active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
									)}>
									{t(item.key)}
									{active ? <ActiveBar /> : null}
								</NavigationMenu.Link>
							</NavigationMenu.Item>
						);
					}

					const active = item.links.some((link) => pathname === link.href);
					return (
						<NavigationMenu.Item key={item.key}>
							<NavigationMenu.Trigger
								className={cn(
									itemClass,
									"group cursor-pointer data-popup-open:text-foreground",
									active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
								)}>
								{t(item.key)}
								<ChevronDown className="size-3.5 transition-transform duration-200 group-data-popup-open:rotate-180" />
								{active ? <ActiveBar /> : null}
							</NavigationMenu.Trigger>

							<NavigationMenu.Content className="w-80 p-2 transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0">
								<ul className="flex flex-col">
									{item.links.map((link) => (
										<li key={link.href}>
											<NavigationMenu.Link
												render={<Link href={link.href} />}
												active={pathname === link.href}
												className="group/link flex flex-col gap-1 rounded-sm p-3 transition-colors hover:bg-white/5 focus-visible:bg-white/5">
												<span className="text-sm font-semibold tracking-[0.1em] uppercase transition-colors group-hover/link:text-brand group-data-active/link:text-brand">
													{t(link.key)}
												</span>
												<span className="text-xs text-muted-foreground">
													{t(`hints.${link.key}`, hintValues)}
												</span>
											</NavigationMenu.Link>
										</li>
									))}
								</ul>
								{item.key === "events" && undatedEvents ? (
									<p className="mx-3 mt-1 mb-2 border-t border-white/10 pt-3 text-xs text-muted-foreground/70">
										{t("eventsSoon")}
									</p>
								) : null}
							</NavigationMenu.Content>
						</NavigationMenu.Item>
					);
				})}
			</NavigationMenu.List>

			<NavigationMenu.Portal>
				<NavigationMenu.Positioner
					sideOffset={18}
					align="start"
					alignOffset={-12}
					collisionPadding={16}
					className="z-60">
					<NavigationMenu.Popup className="h-(--popup-height) w-(--popup-width) origin-(--transform-origin) rounded-md border border-white/10 bg-background/95 shadow-2xl shadow-black/60 backdrop-blur-md transition-[opacity,transform,width,height] duration-200 data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0">
						<NavigationMenu.Viewport className="relative size-full overflow-hidden" />
					</NavigationMenu.Popup>
				</NavigationMenu.Positioner>
			</NavigationMenu.Portal>
		</NavigationMenu.Root>
	);
}
