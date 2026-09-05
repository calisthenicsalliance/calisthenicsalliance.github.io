import { Mail } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import NextLink from "next/link";
import { Link } from "@/i18n/navigation";
import { navigation, site } from "@/config/site";
import { Logo } from "@/components/ui/logo";
import { InstagramIcon } from "@/components/ui/icons";
import { Container } from "@/components/shared/container";

export function Footer() {
	const t = useTranslations();
	const locale = useLocale();

	return (
		<footer className="border-t border-white/10 bg-black">
			<Container className="py-16">
				<div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
					<div className="flex flex-col gap-5">
						<Logo size={44} />
						<p className="max-w-xs text-sm leading-relaxed text-muted-foreground">{t("footer.tagline")}</p>
						<p className="max-w-xs text-xs leading-relaxed text-muted-foreground/70">
							{t("footer.organizedBy")} {site.organizer.name}
						</p>
					</div>

					<nav className="flex flex-col gap-3">
						<h2 className="text-xs font-semibold tracking-[0.25em] text-brand uppercase">
							{t("footer.navigation")}
						</h2>
						{navigation.map((item) => (
							<Link
								key={item.href}
								href={item.href}
								className="text-sm text-muted-foreground transition-colors hover:text-foreground">
								{t(`nav.${item.key}`)}
							</Link>
						))}
					</nav>

					<div className="flex flex-col gap-3">
						<h2 className="text-xs font-semibold tracking-[0.25em] text-brand uppercase">
							{t("footer.contact")}
						</h2>
						<a
							href={`mailto:${site.contacts.email}`}
							className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
							<Mail className="size-4" />
							{site.contacts.email}
						</a>
						<a
							href={site.social.instagram}
							target="_blank"
							rel="noreferrer noopener"
							className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
							<InstagramIcon className="size-4" />
							{site.social.instagramHandle}
						</a>
						<NextLink
							href={site.regulation.pt}
							target="_blank"
							rel="noreferrer noopener"
							hrefLang="pt"
							className="text-sm text-muted-foreground transition-colors hover:text-foreground">
							{t("footer.regulationNote", { version: site.regulation.version })}
							{locale === "en" ? " (PT)" : ""}
						</NextLink>
					</div>
				</div>

				<p className="mt-14 border-t border-white/10 pt-8 text-xs text-muted-foreground/60">
					{t("footer.copyright", { year: new Date().getFullYear() })}
				</p>
			</Container>
		</footer>
	);
}
