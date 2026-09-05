import { routing } from "@/i18n/routing";

const { defaultLocale, locales } = routing;

// a static export has no middleware, so / forwards to a locale in the browser
const redirectScript = `
(function () {
	var supported = ${JSON.stringify(locales)};
	var preferred = (navigator.languages || [navigator.language || ""])
		.map(function (tag) { return String(tag).slice(0, 2).toLowerCase(); })
		.find(function (tag) { return supported.indexOf(tag) !== -1; });
	window.location.replace("/" + (preferred || "${defaultLocale}") + "/");
})();
`;

export default function RootPage() {
	return (
		<html lang={defaultLocale}>
			<head>
				<meta httpEquiv="refresh" content={`0; url=/${defaultLocale}/`} />
				<link rel="canonical" href={`/${defaultLocale}/`} />
				<title>Calisthenics Alliance</title>
				<script dangerouslySetInnerHTML={{ __html: redirectScript }} />
			</head>
			<body style={{ background: "#08080a", color: "#f4f4f5", fontFamily: "system-ui, sans-serif" }}>
				<noscript>
					<a href={`/${defaultLocale}/`}>Calisthenics Alliance</a>
				</noscript>
			</body>
		</html>
	);
}
