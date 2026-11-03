# UniversalChatGames site — DESIGN.md

The page is a blocky server at night, and game chat is the hero: a visitor
watches a round, sees someone get paid, and buys. Pixel art sits on a dark,
modern page; the art carries the Minecraft feel, and the page stays readable.

This file describes the site as built. The asset specs and their history live
in `REDESIGN-SPEC.md`; read that before drawing anything new.

## Originality
- All art is ours. Never use Mojang textures, GUI sprites, mob designs or logos.
- Nothing may suggest Mojang made or endorsed the plugin (it is a paid product).

## Page tokens (`styles.css` `:root`)

```css
--bg: #0d0e12;       /* page canvas */
--card: #14161f;     /* card fill behind 9-slice frames */
--codebg: #101319;   /* inline code */
--line: #232635;     /* hairlines, ghost button border */
--ink: #f2f5f3;      /* primary text */
--mute: #9db3a8;     /* secondary text */
--amber: #f5b301;    /* THE action colour */
--on-amber: #161006; /* text on amber */
--violet: #a855f7;   /* Quizmaster identity, epic tier */
--teal: #2dd4bf;     /* secondary identity */
```

- Amber means "act": buy buttons, badges, focus rings, step numbers. It never decorates.
- Violet and teal mark identity only and never act.
- Muted text keeps 4.5:1 against the canvas.

## Pixel-art rules
- Palette: the 16 colours in `REDESIGN-SPEC.md` Part B, plus the listed exceptions (mascot skin `#d9b48f`/`#a67c52`, robe shade `#7a3cc0`). A new colour needs a written reason there first.
- Native grid only. Every sprite is shown at a whole-number scale (1×, 2×, 3× or 4×) with `image-rendering: pixelated`. Never scale by a fraction or let the browser smooth.
- Light comes from the top-left, with a 1px `#131313` outline on standalone sprites.
- Small sprites (icons, chips, poses, tiles) are drawn as palette-letter grids and checked pixel by pixel. Large painted scenes don't suit that method; draw them by eye or commission them.

## Type
- **Pixel font:** Press Start 2P, self-hosted as `font.ttf` under the family name `MinecraftFont`. It is used only for the h1, badges, primary buttons and Minecraft chat text, and only at multiples of 8px (h1 24 → 32 → 40px; badges and buttons 16px). It is monospace, so measure layouts after `document.fonts.ready`.
- **Everything else:** Inter 400/600/700 from Google Fonts. Section titles are 24px bold.
- One h1 per page; sections get h2.

## Components

| Component | How it's built |
|---|---|
| Primary button | `btn-normal.png` 9-slice (slice 8, border 8px, no radius); `btn-hover.png` on hover; `btn-pressed.png` on `:active`. The header `.btn-sm` stays a flat amber pill. Below 600px the header button drops its price and reads "Buy". |
| Ghost button | 2px `--line` border, ink text. Secondary actions only. |
| Card / FAQ / checkout | `panel-stone.png` 9-slice (slice 8 fill) over `--card`. Card hover adds a soft amber glow and swaps the icon for its `-lit` version. |
| Quizmaster card | Full-width card with a 2px violet outline and `mascot-full-ask.png` at 3×. |
| Chat panel | `panel-chat.png` 9-slice (60% black, stone border). Frames the hero chat loop and every capture. |
| Mode icons | `icon-<mode>.png` 16×16 shown at 48px (3×). |
| Reward chips | `chip-coin`, `chip-rare`, `chip-epic`, `chip-command`, 12×12 shown at 24px (2×), as list markers in Rewards. |
| Dividers | `divider-grass` under the hero, `divider-stone` between Rewards and Pricing, `divider-dirt` above the footer; all 16×16 tiles shown at 32px (2×). |
| Chat text | Minecraft chat colours: `.mc-white #fff`, `.mc-gray #aaa`, `.mc-green #5f5`, `.mc-yellow #ff5`, `.mc-gold #fa0`, `.mc-red #f55`. The `.rar-*` classes (`#5f5`, `#fa0`, `#a855f7`) colour reward types in Rewards. |

## Hero stage
The scene is 480×270 at 1×, built from stacked layers: `hero-sky-f1..f4`, `hero-far`, `hero-near`, `hero-torch-f1..f4`. On top sit `mascot-full-idle-f1/f2` at scene position (362,162) and `nameplate.png` at (366,149). The ledge starts at scene x=264.

| Viewport | Mode | Scale N |
|---|---|---|
| ≥ 1600px | Overlay: the stage sits behind the hero, anchored bottom-right | 3 |
| 1100–1599px | Overlay | 2 (h1 drops to 32px at 1100–1199px) |
| < 1100px | Band: text first, then scene rows 140–270 as their own block, anchored right | 2 |

In overlay mode the hero text and the chat loop must end at least 24px left of the ledge (`stageLeft + 264 × N`).

## Motion
- Sky stars and the torch flame: 4 frames, 250ms each, CSS `steps()`.
- Quizmaster idle: frame 1 for 1200ms, blink frame for 150ms.
- Hero chat loop: alternates a Math and a Trivia round every 3.6s (`app.js`). The static Math round is in the HTML, so the page is complete without JS.
- Cards and FAQ entries fade up on scroll.
- Under `prefers-reduced-motion`, every animation stops, frame 1 shows, and the chat loop stays on the static round.

## Layout and responsive
- `.wrap` content is at most 1024px wide with 24px side gutters; sections use `padding-block: 56px`.
- The feature grid is 3 columns, collapsing to 1 below 800px.
- Captures show at native width (659–858px) in one column, so the Minecraft text is never resampled; on phones they shrink to fit.
- Below 600px the header hides its nav; the footer repeats every nav link on both pages.
- No horizontal page scroll at any width (checked at 1600, 1440, 1280, 1100, 1024, 760 and 375px).

## Accessibility
- A visible amber `:focus-visible` outline on every link, button and summary.
- Touch targets at least 44px tall; the header button is 46px.
- Decorative sprites use `alt=""`. Captures carry alt text describing the round.

## Assets
- **Page art:** `site/assets/` — hero layers, mascot poses (idle, ask, point in use; cheer drawn but not placed yet), nameplate, icons with `-lit` and `-64` variants, panels, buttons, chips, dividers, captures, logo.
- **App icons:** `icon-192.png`, `icon-512.png` (maskable: the logo must fit a centred circle 80% of the canvas wide) and `apple-touch-icon.png` in `site/`.
- **Social card:** `assets/og-card.png`, 1200×630.
- **Unused, kept on disk:** `hero-bg.png`, `hero-bg-b.png`, `btn-9patch.png` and `mascot-quizmaster.png`. Safe to delete once nothing references them.
