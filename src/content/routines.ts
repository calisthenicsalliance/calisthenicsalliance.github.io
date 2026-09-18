type Category = "female" | "male";

export interface RoutineExercise {
	// reps, or seconds when the exercise is a hold
	amount: number;
	unit?: "seconds";
	exercise: string;
	// extra load the exercise is done with
	load?: { kg: number; gear: "vest" };
	unbroken?: boolean;
}

// Art. 14.º: the exercises in order, their reps, any extra load and the timecap
export interface Routine {
	category: Category;
	exercises: RoutineExercise[];
	// minutes, null while unannounced
	timecap: number | null;
}

export interface RoutineSet {
	publishedAt: string;
	routines: Routine[];
}

// null until published, at least 30 days before the event
export const openCalRoutines: RoutineSet | null = {
	publishedAt: "2026-09-18",
	routines: [
		{
			category: "female",
			timecap: 10,
			exercises: [
				{ amount: 5, exercise: "Pull-Ups" },
				{ amount: 10, exercise: "Dips" },
				{ amount: 4, exercise: "Pull-Ups" },
				{ amount: 20, exercise: "Low Bar Push-Ups" },
				{ amount: 3, exercise: "Pull-Ups" },
				{ amount: 30, exercise: "Squats", load: { kg: 10, gear: "vest" } },
				{ amount: 2, exercise: "Pull-Ups" },
				{ amount: 20, exercise: "Lunges", load: { kg: 10, gear: "vest" } },
				{ amount: 10, unit: "seconds", exercise: "Bar-Hang + 1 Pull-Up", unbroken: true },
			],
		},
		{
			category: "male",
			timecap: 10,
			exercises: [
				{ amount: 20, exercise: "Pull-Ups" },
				{ amount: 30, exercise: "Dips" },
				{ amount: 15, exercise: "Pull-Ups" },
				{ amount: 40, exercise: "Squats", load: { kg: 20, gear: "vest" } },
				{ amount: 10, exercise: "Pull-Ups" },
				{ amount: 50, exercise: "Low Bar Push-Ups" },
				{ amount: 5, exercise: "Muscle-Ups" },
				{ amount: 10, exercise: "Straight Bar Dips" },
				{ amount: 10, exercise: "Pull-Ups" },
			],
		},
	],
};
