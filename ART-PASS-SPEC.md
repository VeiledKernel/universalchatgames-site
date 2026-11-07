# Art pass: "Dig down" (site, 1.5.0)

Written 2026-11-06. This adds art to the existing site; it does not replace the layout, components or palette. `REDESIGN-SPEC.md` Part B (pixel rules, palette) and `DESIGN.md` still apply to everything here.

The work goes into `site/` on `master`, which already holds the 1.5 pages. It goes live together with 1.5.0, when the site is synced to the public repo. Do not sync it before then.

## The idea

Scrolling the home page digs down through a Minecraft-like world. The hero is the surface at night; each section below is one layer deeper, and the footer is bedrock. The grass, stone and dirt dividers already hint at this; the art pass makes it the backbone of the page.

| Order | Section(s) | Layer | Background | Art |
|---|---|---|---|---|
| 1 | Hero | Surface | unchanged | unchanged |
| — | divider | grass → dirt | `divider-grass.png` (exists) | |
| 2 | Features, How a round looks | Dirt | `tile-dirt.png` | 64px game icons in stone-framed cards, 3 new game icons |
| — | divider | dirt → stone | `divider-stone.png` (exists, moved) | |
| 3 | Rewards, Pricing | Stone with ores | `tile-stone.png` + ore blocks | reward chest, wall torches beside the price card |
| — | divider | stone → deep | `divider-deep.png` (new) | |
| 4 | Setup, FAQ | Deep stone | `tile-deep.png` | three step pictures |
| — | divider | deep → bedrock | `divider-bedrock.png` (new, replaces `divider-dirt` above the footer) | |
| 5 | Footer | Bedrock | `tile-bedrock.png` | small waving Quizmaster |

Docs and changelog keep a plain background but get one header picture each.

## Rules on top of REDESIGN-SPEC Part B

1. **Palette only.** Every asset uses the 16 palette colours plus the listed exceptions (#d9b48f #a67c52 skin, #7a3cc0 robe). Alpha is 0 or 255.
2. **Whole-number scale.** Layer tiles are 32×32 and dividers 16×16, both shown at 2× (64px and 32px). A 16×16 layer tile repeats so often that its marks read as wallpaper (tried 2026-11-06). Pictures say their display scale below.
3. **Text stays readable.** Tiles are drawn in their true palette colours, and the darkening is done in CSS: each layer is `background: linear-gradient(rgba(13,14,18,A), rgba(13,14,18,A)), url(tile) repeat`, with A between 0.65 and 0.85, starting at 0.75. At 0.85 the texture almost disappears; contrast maths shows 4.5:1 still holds at 0.60 on dirt and 0.50 on the other layers. A is chosen so that body text (`--ink`) and muted text (`--mute`) on the darkest and the lightest tile pixel, after the overlay, both have a contrast ratio of at least 4.5:1. The check script in W1 proves it.
4. **Cards and panels stay solid.** Text sits on `--card` or a 9-slice panel, never directly on a tile, except section headings and the one-line `.sub` under them.
5. **Original art only.** No Minecraft textures, no other plugins' art. `ender_chest_logo.png`, `shulker_box_mc.png` and `upside_diamond.png` in `site/assets/` are other sellers' marketplace icons kept as references: move them to `docs/references/` (untracked) and never reference them from a page.
6. **Weight.** All new assets together stay under 40 KB. Tiles must tile seamlessly in both directions.
7. **Motion.** Nothing new moves except the reused torch animation, which already stops under `prefers-reduced-motion`.

## Part A: assets (design session)

All new files go in `site/assets/`. Layer tiles are 32×32 and must tile seamlessly in both directions; dividers are 16×16 and tile horizontally, like the existing ones.

### A1. Layer tiles

To hide the repeat: marks are irregular in size and spacing, no mark appears twice in one tile, and at least two marks run off one edge and continue on the opposite edge, so the tile border is not a calm band. Keep at least two thirds of each tile (bedrock: about half) as plain base colour so the texture stays quiet behind text.

| File | Colours | Look |
|---|---|---|
| `tile-dirt.png` | #7a4a2b base, #4a2c17 clumps, a few #a67c52 grains | Same family as `divider-dirt.png`, calmer: fewer, larger clumps so it reads as texture, not noise |
| `tile-stone.png` | #6b6f7a base, #3a3d47 cracks, a few #131313 pits | Uneven blocks of stone, 2–3 crack lines, no brick grid (a grid fights the cards' edges) |
| `tile-deep.png` | #3a3d47 base, #131313 cracks, a few #2a3a66 flecks | Darker, denser version of stone; the navy flecks tie it to the night sky |
| `tile-bedrock.png` | #131313, #3a3d47, #6b6f7a in irregular 2–4px blobs | Chaotic and high-contrast; it is the floor of the page |

### A2. Ore veins (16×16, shown at 2×, 32px)

Transparent background: only the mineral clusters are drawn, so the darkened stone wall shows through and the ore reads as part of the wall, not a block stuck on it. Shown at 2×, the same pixel size as the wall tiles. (A first version with its own stone base and outline, shown at 3×, looked like bright stickers on the dark wall; rejected 2026-11-07.)
- `ore-coin.png`: 4–5 amber clusters (#f5b301 with a #ffd94a top-left pixel each).
- `ore-epic.png`: violet clusters (#a855f7, #7a3cc0 shadow, one #f4ecd8 glint).
- `ore-rare.png`: green clusters (#3fa34d, #1e5c2e shadow, #7ed07a highlight).
- Each cluster gets a 1px #131313 shadow on its bottom and right edges so it sits in the rock.

The code places them in the margins of the stone layer, outside the 1024px content column, on screens 1200px and wider only.

### A3. Dividers (16×16, tile horizontally, shown at 2×)

- `divider-deep.png`: top half `tile-stone.png` style, bottom half `tile-deep.png` style, with a ragged 2–3px boundary.
- `divider-bedrock.png`: top half deep stone, bottom half bedrock, ragged boundary.

### A4. New game icons (1.5)

Same set as the existing icons: `icon-<name>.png` 16×16, `icon-<name>-lit.png` 16×16, `icon-<name>-64.png` 64×64, same outline weight and top-left light as `icon-math`. Lit versions swap the main accent to its lighter tone, as the existing lit icons do.
- `unreverse`: a cream card (#f4ecd8, #6b6f7a bottom edge) showing "ZA" with a teal (#2dd4bf) U-turn arrow curving over the top from right to left.
- `fillin`: a cream card with "A_C": the letters in #131313 and the blank as a 2px amber (#f5b301) underline; lit version turns the blank #ffd94a.
- `randomchars`: two overlapping keycaps, back one at top-left with "7", front one at bottom-right with "#". Cream keycaps with a 2px #6b6f7a bottom edge, violet (#a855f7) glyphs; lit version turns the glyphs #ffd94a.

### A5. Reward chest (96×64, shown at 2×, 192×128)

An open treasure trunk, our own design (not a Minecraft chest): rounded lid tipped back, wood #7a4a2b with #4a2c17 planks, amber (#f5b301/#ffd94a) metal bands and a lock plate. Spilling out of it and over the front edge: 3–4 coins, one violet gem and one green gem drawn in the chip style (`chip-coin`, `chip-epic`, `chip-rare` can be pasted 1:1). A soft pile on the ground made of a few extra coins. Light from the top-left; #131313 outline.

### A6. Setup step pictures (32×32 each, shown at 2×, 64px)

- `step-drop.png`: an amber-labelled glass jar (#f4ecd8 glass outline, #2dd4bf contents) dropping into an open wooden crate (#7a4a2b), with two motion lines above the jar.
- `step-run.png`: a wall torch, flame #f5b301/#ffd94a with a #f4ecd8 core, and a small burst of 4 light pixels around it.
- `step-tune.png`: an anvil (#3a3d47/#6b6f7a, #131313 outline) with a cream config scroll lying on it and a small amber wrench leaning against it.

### A7. Footer mascot (32×48, shown at 2×, 64×96)

`mascot-full-wave-f1.png` and `mascot-full-wave-f2.png`: a new pose on the same 32×48 canvas as `mascot-full-idle-f1.png`, built from the idle frame so the head, robe and colours match exactly. One arm is raised: the idle arm's exact structure (2px sleeve between 1px outlines, 2×2 hand) pointing straight up from the shoulder, hand level with the top of the head; in f2 the hand and the top two sleeve rows lean 1px outward. The raised arm must join the body at the shoulder with no gap (a detached 1px stick was rejected 2026-11-07). Only the arm and hand pixels differ between the frames and the idle pose.

### A9. Wall torch (8×16, shown at 3×, 24×48)

`torch-wall-f1.png` … `torch-wall-f4.png`: a small standalone wall torch. The stick is 2px wide, #7a4a2b with a #4a2c17 shadow side, angled slightly as if mounted on a wall, identical in all four frames. The flame is drawn fresh for this sprite in the hero torch's colours (#f5b301, #ffd94a, #f4ecd8 core): its bottom row sits on the stick's top in every frame, it stays within the same 6px-wide footprint, and only its height (5–7px) and the shape of its tip change between frames. No loose pixels. (Cropping the hero flames was tried on 2026-11-07: they drift around in the hero scene, so the frames jumped instead of flickering.)

### A8. Page header pictures (48×48, shown at 2×, 96px)

- `art-book.png` for docs: a closed book in three-quarter view: a #7a3cc0 front cover with #a855f7 highlight, a darker spine on the left with two amber bands, the cream page block showing along the right and bottom edges as part of the book (no gap), and a small cream title label with two #131313 text lines on the cover. No large "?" on the cover: a violet square with an amber "?" reads as a game question block (rejected 2026-11-07).
- `art-clock.png` for changelog: a round pixel clock, amber rim, cream face, #131313 hands at 3:00 (2px thick, minute hand up, hour hand right), four #6b6f7a ticks at 12, 3, 6 and 9, two teal motion ticks on the right. (Hands at 1:50 form a symmetric V that reads as a smile; rejected 2026-11-07.)

## Part B: code (website-dev session)

### W1. Layers

- Wrap the home page sections in layer containers that span the full width: `<div class="layer layer-dirt">` around Features and How a round looks; `layer-stone` around Rewards and Pricing; `layer-deep` around Setup and FAQ. Content stays inside `.wrap`.
- Move `divider-stone` from above Pricing to above Rewards. Add `divider-deep` between Pricing and Setup. Replace `divider-dirt` above the footer with `divider-bedrock`. Give the footer the bedrock background, keeping its text on a solid strip.
- Backgrounds follow rule 3. Write `site/tools/check_contrast.py`: for each layer, it loads the tile, applies the overlay alpha from `styles.css`, and prints the worst contrast ratio of `--ink` and `--mute` against every resulting colour. It fails below 4.5.
- Ore blocks: 4–6 absolutely positioned `<img aria-hidden="true">` per stone layer, in the side margins, shown only at `min-width: 1200px`. They must never overlap the content column.

### W2. Feature cards

- Every game card shows its 64×64 icon at 1×. The three 1.5 games get their new icons, plus lit hover rules matching the existing ones.
- Cards use the `panel-stone.png` 9-slice frame (as `details` does) instead of the flat `--card` box, keeping `--card` as the fill.

### W3. Rewards

At 900px and wider, Rewards becomes two columns: the existing list on the left, the chest on the right at 192×128. Below 900px the chest sits under the list, centred.

### W4. Pricing

Two wall torches (A9) flank the price card at 3×, cycling their four frames with the same `skyCycle` steps animation and delays the hero torches use. Static on frame 1 under reduced motion; hidden below 760px, like the mascot.

### W5. Setup

The three steps become three cards in a row (stacked on phones), each with its step picture at 64px above the step text. Keep the `<ol>` so the numbers stay in the markup; the amber numbers stay visible.

### W6. Footer

The waving mascot sits above the footer links at 64×96. It alternates its two frames using the same `idleA`/`idleB` keyframes as the hero mascot (1.35s cycle, frame 2 shown briefly), and stays on frame 1 under reduced motion.

### W7. Docs and changelog

Each page shows its header picture at 96px to the left of the `<h1>` at 600px and wider, above it on phones.

### W8. Checks for every round

- No horizontal scroll at 375, 768, 1100, 1280 and 1600px.
- Lighthouse accessibility stays at its current score or higher.
- `check_contrast.py` passes.
- 0 console errors.
- Every new asset is referenced, and nothing in `docs/references/` is.

## Order of work

1. Design: A1 tiles and A3 dividers. Code: W1 layers, with placeholder ore positions. This is the change you can see most.
2. Design: A4 game icons. Code: W2 cards.
3. Design: A5 chest and A2 ores. Code: W3 rewards, then the real ore positions.
4. Design: A6 step pictures and A9 wall torch. Code: W4 torches and W5 setup.
5. Design: A7 mascot and A8 header pictures. Code: W6 footer and W7 pages.

Each step is audited and committed on `master` before the next starts. Nothing is synced to the public site until 1.5.0 is released.
