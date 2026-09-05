import { Anton, Inter } from "next/font/google";
import { routing } from "@/i18n/routing";
import en from "@/translations/en.json";
import pt from "@/translations/pt.json";
import { cn } from "@/lib/utils";

const fontDisplay = Anton({ subsets: ["latin"], weight: "400", variable: "--font-anton" });
const fontSans = Inter({ subsets: ["latin"], variable: "--font-inter" });

// served for every unknown path, including inside a locale, so it shows both languages
const messages = { pt, en } as const;

export default function RootNotFound() {
	return (
		<html
			lang={routing.defaultLocale}
			data-scroll-behavior="smooth"
			className={cn(fontSans.variable, fontDisplay.variable)}>
			<body className="bg-background font-sans text-foreground antialiased">
				<main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-hatch px-6 text-center">
					<p className="font-display text-7xl leading-none text-brand sm:text-9xl">{pt.notFound.code}</p>

					<div className="flex flex-col gap-6">
						{routing.locales.map((locale) => (
							<div key={locale}>
								<h1
									className={cn(
										"font-display uppercase",
										locale === routing.defaultLocale
											? "text-3xl sm:text-4xl"
											: "text-xl text-muted-foreground sm:text-2xl",
									)}>
									{messages[locale].notFound.title}
								</h1>
								<p className="mt-2 text-sm text-muted-foreground">{messages[locale].notFound.lead}</p>
							</div>
						))}
					</div>

					<div className="mt-2 flex flex-wrap items-center justify-center gap-4">
						{routing.locales.map((locale) => (
							<a
								key={locale}
								href={`/${locale}/`}
								hrefLang={locale}
								className="inline-flex h-11 items-center bg-brand px-6 text-sm font-extrabold tracking-[0.045em] text-white uppercase transition-colors hover:bg-brand-bright">
								{messages[locale].common.backHome}
								<span className="ml-2 opacity-60">{locale.toUpperCase()}</span>
							</a>
						))}
					</div>
				</main>
			</body>
		</html>
	);
}
