import type { Metadata } from "next";
import { Anton, Inter, Geist_Mono } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { localeAlternates, localeParams, routing, type LocaleProps } from "@/i18n/routing";
import { site } from "@/config/site";
import { Navbar, Footer } from "@/components/layout";
import { MotionProvider } from "@/components/shared/motion-provider";
import { cn } from "@/lib/utils";

const fontDisplay = Anton({ subsets: ["latin"], weight: "400", variable: "--font-anton" });
const fontSans = Inter({ subsets: ["latin"], variable: "--font-inter" });
const fontMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

interface LocaleLayoutProps extends LocaleProps {
	children: React.ReactNode;
}

export const generateStaticParams = localeParams;

export async function generateMetadata({ params }: LocaleLayoutProps): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "metadata" });

	return {
		metadataBase: new URL(site.url),
		title: { default: t("title"), template: t("template") },
		description: t("description"),
		applicationName: site.name,
		alternates: localeAlternates(locale),
		openGraph: {
			type: "website",
			siteName: site.name,
			locale: locale === "pt" ? "pt_PT" : "en_GB",
			title: t("title"),
			description: t("description"),
			images: [{ url: "/images/open-cal-poster.jpg", width: 1080, height: 1350, alt: "Open CAL" }],
		},
		twitter: {
			card: "summary_large_image",
			title: t("title"),
			description: t("description"),
			images: ["/images/open-cal-poster.jpg"],
		},
	};
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
	const { locale } = await params;

	if (!hasLocale(routing.locales, locale)) {
		notFound();
	}

	setRequestLocale(locale);

	return (
		<html
			lang={locale}
			data-scroll-behavior="smooth"
			className={cn(fontSans.variable, fontDisplay.variable, fontMono.variable)}>
			<body className="flex min-h-screen flex-col overflow-x-hidden">
				<NextIntlClientProvider locale={locale}>
					<MotionProvider>
						<Navbar />
						<main className="flex-1">{children}</main>
						<Footer />
					</MotionProvider>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
