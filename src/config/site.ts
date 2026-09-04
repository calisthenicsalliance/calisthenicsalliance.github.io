export const site = {
	name: "Calisthenics Alliance",
	shortName: "CAL",
	url: "https://calisthenicsalliance.github.io",
	organizer: {
		name: "Associação B.W.C.R. — Clube de Calistenia das Caldas da Rainha",
		shortName: "B.W.C.R.",
		city: "Caldas da Rainha",
	},
	social: {
		instagram: "https://www.instagram.com/calisthenicsalliance/",
		instagramHandle: "@calisthenicsalliance",
	},
	contacts: {
		email: "calisthenicsalliance@gmail.com",
		people: [
			{ name: "André Nascimento", phone: "+351 914 409 368", tel: "+351914409368" },
			{ name: "Iúri Lage", phone: "+351 911 913 799", tel: "+351911913799" },
		],
	},
	registrationUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
	regulation: {
		pt: "/regulations/pt.pdf",
		version: "1.0",
		publishedAt: "2026-08-23",
	},
} as const;

export const navigation = [
	{ href: "/about", key: "about" },
	{ href: "/open-cal", key: "openCal" },
	{ href: "/register", key: "register" },
	{ href: "/rankings", key: "rankings" },
	{ href: "/partners", key: "partners" },
] as const;
