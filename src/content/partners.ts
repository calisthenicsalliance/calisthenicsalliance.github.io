// logo points at a keyed PNG produced by npm run assets from brand/
export interface Partner {
	id: string;
	name: string;
	location: string;
	url: string;
	logo: string;
}

export const partners: Partner[] = [
	{
		id: "bar-wings",
		name: "Bar-Wings",
		location: "Caldas da Rainha",
		url: "https://www.instagram.com/barwings.calisthenicsclub/",
		logo: "/logos/bar-wings.png",
	},
	{
		id: "bg-bars",
		name: "BG Bars",
		location: "Calisthenics Team",
		url: "https://www.instagram.com/bgbarsteam/",
		logo: "/logos/bg-bars.png",
	},
	{
		id: "lion-shield",
		name: "Lion Shield",
		location: "Calisthenics Club",
		url: "https://www.instagram.com/lion_shield_calisthenics/",
		logo: "/logos/lion-shield.png",
	},
];
