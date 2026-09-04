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
const PARTNER_WIDTH = 640;
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

function key(data, width, height, channels, mode) {
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
			// Only near-neutral, near-white pixels are removed, so bright
			// saturated colour (the gold crest) survives untouched.
			const max = Math.max(r, g, b);
			const min = Math.min(r, g, b);
			const chroma = max - min;
			const whiteness = chroma > 24 ? 0 : smoothstep(225, 250, min);
			out[o] = r;
			out[o + 1] = g;
			out[o + 2] = b;
			out[o + 3] = Math.round(255 * (1 - whiteness));
		}
	}

	return out;
}

await mkdir(LOGOS_OUT, { recursive: true });

for (const { input, output, mode } of PARTNER_LOGOS) {
	const source = sharp(path.join(BRAND, input));
	const { data, info } = await source.raw().toBuffer({ resolveWithObject: true });
	const keyed = key(data, info.width, info.height, info.channels, mode);

	await sharp(keyed, { raw: { width: info.width, height: info.height, channels: 4 } })
		.png()
		.trim({ threshold: 1 })
		.resize({ width: PARTNER_WIDTH, withoutEnlargement: true })
		.toFile(path.join(LOGOS_OUT, output));

	console.log(`  brand/${input} -> public/logos/${output}  (${mode})`);
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
