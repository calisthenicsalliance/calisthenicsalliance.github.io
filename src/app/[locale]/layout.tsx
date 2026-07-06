import { routing } from "@/i18n/routing";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Roboto_Slab, Geist, Geist_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar, Footer } from "@/components/layout";

const robotoSlab = Roboto_Slab({
	subsets: ["latin"],
	variable: "--font-serif",
});

const fontSans = Geist({
	subsets: ["latin"],
	variable: "--font-sans",
});

const fontMono = Geist_Mono({
	subsets: ["latin"],
	variable: "--font-mono",
});

interface LocaleLayoutProps {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocaleLayoutProps) {
	const { locale } = await params;
	const translations = await getTranslations({ locale, namespace: "metadata" });

	return {
		title: translations("title"),
		description: translations("description"),
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
			suppressHydrationWarning
			className={cn("antialiased", fontSans.variable, fontMono.variable, "font-serif", robotoSlab.variable)}>
			<body className="flex min-h-screen flex-col">
				<NextIntlClientProvider locale={locale}>
					<ThemeProvider>
						<Navbar />
						<main className="flex-1 pt-16">{children}</main>
						<Footer />
					</ThemeProvider>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
