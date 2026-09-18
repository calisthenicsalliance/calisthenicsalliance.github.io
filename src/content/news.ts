// the text lives in the translations under news.items.<id>
export interface Announcement {
	id: string;
	// ISO date of publication
	date: string;
	// a site page, a file in public/ or an external url
	href: string;
	// switch off to take it down; with nothing active the site shows no announcement at all
	active: boolean;
}

const all: Announcement[] = [
	{
		id: "openCalRoutines",
		date: "2026-09-18",
		href: "/open-cal#routines",
		active: true,
	},
];

// the newest active announcement is the one on show
export const currentAnnouncement = all
	.filter((announcement) => announcement.active)
	.sort((a, b) => b.date.localeCompare(a.date))[0];
