export const site = {
	name: "Calisthenics Alliance",
	shortName: "CAL",
	url: "https://calisthenicsalliance.com",
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
	payment: {
		iban: "PT50 0035 0326 00699780930 69",
		mbway: "914 409 368",
		// where the proof of payment is sent
		proofTel: "+351914409368",
	},
	registrationUrl: "https://forms.gle/bsuBe6Xymf7QoNzFA",
	regulation: {
		pt: "/regulations/cal-regulamento.pdf",
		version: "1.0",
		publishedAt: "2026-09-08",
	},
} as const;

export const navigation = [
	{ href: "/about", key: "about" },
	{ href: "/open-cal", key: "openCal" },
	{ href: "/register", key: "register" },
	{ href: "/rankings", key: "rankings" },
	{ href: "/partners", key: "partners" },
] as const;
