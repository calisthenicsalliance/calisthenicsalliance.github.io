/**
 * Derives the generated image assets. Outputs are committed, so the deploy
 * workflow never needs to run sharp.
 *
 *   brand/<club>.jpg           ->  public/logos/<club>.png           (background keyed out)
 *   brand/cal-transparent.png  ->  public/logos/cal.png              (downscaled for the web)
 *   brand/cal.png              ->  src/app/{icon,apple-icon}.png     (favicons)
 *
 * Run with `npm run assets`.
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const BRAND = path.join(process.cwd(), "brand");
const LOGOS_OUT = path.join(process.cwd(), "public", "logos");
const ICONS_OUT = path.join(process.cwd(), "src", "app");

/** The crest with alpha, for the dark site; and the opaque one, for favicons. */
const CREST_TRANSPARENT = path.join(BRAND, "cal-transparent.png");
const CREST_OPAQUE = path.join(BRAND, "cal.png");
// logos are normalised to equal area, not equal height: a square mark at the same height as a
// wide one reads as half the size. they are then padded to a shared canvas so css can size them alike
const PARTNER_AREA = 230_400;
/** The crest renders at 36-44px; 320 covers that on a 3x display with headroom. */
const LOGO_WIDTH = 320;

/**
 * Partner logos arrive with three incompatible backgrounds, so each is keyed a
 * different way before it can sit on the site's dark cards:
 *
 *   inkToWhite — dark marks on a light background, recoloured to white
 *   keyBlack   — light marks on a dark background, colour preserved
 *   keyWhite   — colour art on a light background, colour preserved
 */
const PARTNER_LOGOS = [
	{ input: "bar-wings.jpg", output: "bar-wings.png", mode: "inkToWhite" },
	{ input: "bg-bars.jpg", output: "bg-bars.png", mode: "keyBlack" },
	{ input: "lion-shield.jpg", output: "lion-shield.png", mode: "keyWhite" },
];

/** Generated from the opaque crest — a transparent favicon disappears against dark browser chrome. */
const ICONS = [
	{ output: "icon.png", size: 64 },
	{ output: "apple-icon.png", size: 180 },
];

const luminance = (r, g, b) => 0.2126 * r + 0.7152 * g + 0.0722 * b;

/** Ramps 0 -> 1 across [edge0, edge1], so keyed edges stay anti-aliased. */
const smoothstep = (edge0, edge1, value) => {
	const t = Math.min(1, Math.max(0, (value - edge0) / (edge1 - edge0)));
	return t * t * (3 - 2 * t);
};

function key(data, width, height, channels, mode, background) {
	const out = Buffer.alloc(width * height * 4);

	for (let i = 0, o = 0; i < data.length; i += channels, o += 4) {
		const r = data[i];
		const g = data[i + 1];
		const b = data[i + 2];
		const l = luminance(r, g, b);

		if (mode === "inkToWhite") {
			out[o] = 255;
			out[o + 1] = 255;
			out[o + 2] = 255;
			out[o + 3] = Math.round(255 * (1 - smoothstep(140, 240, l)));
		} else if (mode === "keyBlack") {
			out[o] = r;
			out[o + 1] = g;
			out[o + 2] = b;
			out[o + 3] = Math.round(255 * smoothstep(12, 70, l));
		} else {
			// only near-neutral pixels close to the sampled backdrop are removed, so
			// saturated colour survives even when it is light
			const max = Math.max(r, g, b);
			const min = Math.min(r, g, b);
			const chroma = max - min;
			const backdrop = chroma > 24 ? 0 : smoothstep(background - 35, background - 5, min);
			out[o] = r;
			out[o + 1] = g;
			out[o + 2] = b;
			out[o + 3] = Math.round(255 * (1 - backdrop));
		}
	}

	return out;
}

await mkdir(LOGOS_OUT, { recursive: true });

// pass one: key each logo, trim it, and scale it to a common area
const marks = [];
for (const { input, output, mode } of PARTNER_LOGOS) {
	const source = sharp(path.join(BRAND, input));
	const { data, info } = await source.raw().toBuffer({ resolveWithObject: true });
	// the backdrop is whatever fills the corner, which is not always pure white
	const background = Math.min(data[0], data[1], data[2]);
	const keyed = key(data, info.width, info.height, info.channels, mode, background);

	const trimmed = await sharp(keyed, { raw: { width: info.width, height: info.height, channels: 4 } })
		.png()
		.trim({ threshold: 1 })
		.toBuffer({ resolveWithObject: true });

	const scale = Math.sqrt(PARTNER_AREA / (trimmed.info.width * trimmed.info.height));
	marks.push({
		output,
		mode,
		input,
		buffer: trimmed.data,
		width: Math.round(trimmed.info.width * scale),
		height: Math.round(trimmed.info.height * scale),
	});
}

// pass two: pad every mark onto the same canvas so css can size them identically
const canvas = {
	width: Math.max(...marks.map((m) => m.width)),
	height: Math.max(...marks.map((m) => m.height)),
};

for (const mark of marks) {
	const left = Math.floor((canvas.width - mark.width) / 2);
	const top = Math.floor((canvas.height - mark.height) / 2);

	await sharp(mark.buffer)
		.resize({ width: mark.width, height: mark.height, fit: "fill" })
		.extend({
			left,
			right: canvas.width - mark.width - left,
			top,
			bottom: canvas.height - mark.height - top,
			background: { r: 0, g: 0, b: 0, alpha: 0 },
		})
		.toFile(path.join(LOGOS_OUT, mark.output));

	console.log(`  brand/${mark.input} -> public/logos/${mark.output}  (${mark.mode})`);
}

await sharp(CREST_TRANSPARENT)
	.resize({ width: LOGO_WIDTH, withoutEnlargement: true })
	.png()
	.toFile(path.join(LOGOS_OUT, "cal.png"));
console.log(`  brand/cal-transparent.png -> public/logos/cal.png  (${LOGO_WIDTH}px, transparent)`);

for (const { output, size } of ICONS) {
	await sharp(CREST_OPAQUE).resize(size, size).png().toFile(path.join(ICONS_OUT, output));

	console.log(`  brand/cal.png -> src/app/${output}  (${size}px)`);
}
