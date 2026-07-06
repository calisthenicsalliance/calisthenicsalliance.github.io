"use client";

import { routing } from "@/i18n/routing";

export default function Page() {
	return (
		<html>
			<head>
				<meta httpEquiv="refresh" content={`0; url=${routing.defaultLocale}`} />
			</head>
			<body>
				<p>Redirecting…</p>
			</body>
		</html>
	);
}
