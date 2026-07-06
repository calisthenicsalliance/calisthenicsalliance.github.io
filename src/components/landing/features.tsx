export function Features() {
	return (
		<section className="px-6 py-20">
			<div className="mx-auto max-w-6xl">
				<h2 className="text-center text-3xl font-semibold tracking-tight">
					Built for athletes and competitions
				</h2>

				<div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
					<div className="rounded-xl border p-6">
						<h3 className="font-medium">Global Rankings</h3>
						<p className="mt-2 text-sm text-muted-foreground">
							Track athlete performance across official competitions.
						</p>
					</div>

					<div className="rounded-xl border p-6">
						<h3 className="font-medium">Live Events</h3>
						<p className="mt-2 text-sm text-muted-foreground">
							Follow competitions and results in real time.
						</p>
					</div>

					<div className="rounded-xl border p-6">
						<h3 className="font-medium">Athlete Profiles</h3>
						<p className="mt-2 text-sm text-muted-foreground">
							Showcase stats, progress, and achievements.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
