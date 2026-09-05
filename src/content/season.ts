export type EventPhase = "open" | "regular" | "final";

export interface SeasonEvent {
	id: string;
	slug: string | null; // route slug, or null when the event has no page of its own yet
	date: string | null; // ISO date, or null when the date is still to be announced
	venue: string | null; // event venue, or null when the venue is still to be announced
	city: string | null; // event city, or null when the city is still to be announced
	mapUrl: string | null; // google maps link for the venue
	phase: EventPhase;
}

export interface ScheduledEvent extends SeasonEvent {
	date: string;
	venue: string;
	city: string;
	mapUrl: string;
}

export const openCal: ScheduledEvent = {
	id: "open-cal",
	slug: "/open-cal",
	date: "2026-10-24",
	venue: "Pavilhão Desportivo Rainha D. Leonor",
	city: "Caldas da Rainha",
	// the pin is Bar-Wings, the calisthenics club inside the pavilion
	mapUrl: "https://www.google.com/maps/place/Bar-Wings+Clube+de+Calistenia+de+Caldas+da+Rainha/@39.4028125,-9.1440602,17z/data=!4m6!3m5!1s0xd18b3004b592f69:0x267d42a0c56b1ce5!8m2!3d39.4028125!4d-9.1440602!16s%2Fg%2F11xw23_93b",
	phase: "open",
};

const tba = (id: string, phase: EventPhase): SeasonEvent => ({
	id,
	slug: null,
	date: null,
	venue: null,
	city: null,
	mapUrl: null,
	phase,
});

export const season = {
	label: "2027",

	events: [
		openCal,
		tba("round-1", "regular"),
		tba("round-2", "regular"),
		tba("round-3", "regular"),
		tba("round-4", "regular"),
		tba("grand-final", "final"),
	] satisfies SeasonEvent[],

	scoring: {
		win: 50,
		draw: 30,
		loss: 10,
		absent: 0,
		maxBonus: 30, // performance bonus: B = 30 x (N - P) / (N - 1)
	},

	registration: {
		currency: "EUR",
		total: 100,
		installments: [
			{ id: "on-registration", amount: 50 },
			{ id: "before-first-round", amount: 50 },
		],

		// ISO date of the last day to register, or null while unannounced
		deadline: "2026-10-23" as string | null,
	},
};

export const battleResults = [
	{ key: "win", points: season.scoring.win },
	{ key: "draw", points: season.scoring.draw },
	{ key: "loss", points: season.scoring.loss },
	{ key: "absent", points: season.scoring.absent },
] as const;
