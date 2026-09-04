export type EventPhase = "open" | "regular" | "final";

export interface SeasonEvent {
	id: string;
	slug: string | null; // route slug, or null when the event has no page of its own yet
	date: string | null; // ISO date, or null when the date is still to be announced
	venue: string | null; // event venue, or null when the venue is still to be announced
	city: string | null; // event city, or null when the city is still to be announced
	phase: EventPhase;
}

export interface ScheduledEvent extends SeasonEvent {
	date: string;
	venue: string;
	city: string;
}

export const openCal: ScheduledEvent = {
	id: "open-cal",
	slug: "/open-cal",
	date: "2026-10-24",
	venue: "Pavilhão Desportivo Rainha D. Leonor",
	city: "Caldas da Rainha",
	phase: "open",
};

const tba = (id: string, phase: EventPhase): SeasonEvent => ({
	id,
	slug: null,
	date: null,
	venue: null,
	city: null,
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
		draw: 25,
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
		deadline: null as string | null,
	},
};

export const battleResults = [
	{ key: "win", points: season.scoring.win },
	{ key: "draw", points: season.scoring.draw },
	{ key: "loss", points: season.scoring.loss },
	{ key: "absent", points: season.scoring.absent },
] as const;
