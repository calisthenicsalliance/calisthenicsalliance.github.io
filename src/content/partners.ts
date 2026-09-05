// logo points at a keyed PNG produced by npm run assets from brand/
export interface Partner {
	id: string;
	name: string;
	url: string;
	logo: string;
	// the club that runs the league (Art. 4.º)
	organizer?: boolean;
}

export const partners: Partner[] = [
	{
		id: "bar-wings",
		name: "Bar-Wings",
		url: "https://www.instagram.com/barwings.calisthenicsclub/",
		logo: "/logos/bar-wings.png",
		organizer: true,
	},
	{
		id: "bg-bars",
		name: "BG Bars",
		url: "https://www.instagram.com/bgbarsteam/",
		logo: "/logos/bg-bars.png",
	},
	{
		id: "lion-shield",
		name: "Lion Shield",
		url: "https://www.instagram.com/lion_shield_calisthenics/",
		logo: "/logos/lion-shield.png",
	},
];
