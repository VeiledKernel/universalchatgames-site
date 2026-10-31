# Pixel Art Build Spec — Customer-Eye Polish Pass

All rasters: transparent PNG unless stated, native grid only, integer display
with `image-rendering: pixelated`. Palette discipline: reuse page tokens
first (`--amber #f5b301`, `--violet #a855f7`, `--teal #2dd4bf`,
card `#14161f`, line `#232635`); new colors need a reason written here.

Palette reasons (mascot only): villager skin `#d9b48f` base + `#a67c52`
shade — no page token reads as skin; unibrow/pupil reuse line/card tokens,
collar reuses `--violet` + derived shade. Nothing else adds colors.

## 1. Quizmaster mascot (`mascot-quizmaster.png`, 32x32)

Villager face, front view. Nose 4 wide centered, unibrow 1px, robe collar
bottom 4 rows in violet (brand tie-in, not vanilla brown). Eyes: white 1px
with single dark pupil, no shine — shine reads cute, we want wry.
Accept: silhouette readable at 1x, nose lands on even columns.

## 2. Hero shimmer frames (`hero-bg.png` stays frame 1, add `hero-bg-b.png`)

Same 480x270 grid, identical except water/torch pixels. Pick 6–10 highlight
pixels in the brightest band; shift each exactly 1px right in frame B.
Swap via CSS steps() every 900ms, `prefers-reduced-motion` disables.
Accept: loop invisible except the shimmer; file delta under 60KB.

## 3. Icon lit variants (`icon-*-lit.png`, 16x16, 7 files)

Same silhouette as base icons. Shift every fill one step lighter toward
white, keep outlines. Swap on card hover via CSS. Covers all six mode icons
plus broadcast.
Accept: side-by-side, lit reads as "same icon, powered on".

## 4. Dithered hero transition (edit `hero-bg.png` rows)

On the sky-to-ground band only: checkerboard alternate the two band colors
for 4 rows (2 sky-heavy, 2 ground-heavy). Ordered dither, never random noise.
Accept: no visible hard line at 4x zoom, bands gone at 1x.

## 5. Logo depth pass (edit `logo-mark.png`, still 32x32, still 6 colors)

Add 1px darker outline on bottom-right edges only (light from top-left),
one highlight pixel row on the diamond's top facet. No new colors: derive
dark/light by scaling existing channels ±30%.
Accept: 6 opaque colors before and after (count them).

## 6. Reward rarity text (CSS only, no assets)

Map reward tiers to Minecraft's own language: green `#5f5` under 500,
gold `#fa0` 500–999, purple `#a855f7` 1000+. Apply to mockup panels and
checkout price annotated "launch tier". Document the bands in DESIGN.md.

## Wire-up (Sebastian's part on delivery)

- `mascot-*`, `*-lit.png`, revised `hero-bg*.png`/`logo-mark.png` → `site/assets/`
- CSS: hover swaps, `steps()` shimmer, rarity classes
- Verify: counts, sizes, seamlessness, byte-check PNGs, commit
