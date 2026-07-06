export function Hero() {
	return (
		<section className="flex min-h-[80vh] items-center bg-background px-6">
			<div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-2">
				{/* Left */}
				<div>
					<h1 className="text-5xl font-semibold tracking-tight md:text-6xl">Calisthenics Alliance League</h1>

					<p className="mt-6 text-lg text-muted-foreground">
						A global competitive league for calisthenics athletes. Rankings, events, and performance
						tracking in one place.
					</p>

					<div className="mt-8 flex gap-4">
						<a className="rounded-md bg-foreground px-5 py-2.5 text-sm text-background transition hover:opacity-90">
							View rankings
						</a>
						<a className="text-sm text-muted-foreground transition hover:text-foreground">
							Explore events →
						</a>
					</div>
				</div>

				{/* Right */}
				<div className="flex justify-center md:justify-end">
					<div className="h-95 w-full max-w-md rounded-xl border bg-muted" />
				</div>
			</div>
		</section>
	);
}
