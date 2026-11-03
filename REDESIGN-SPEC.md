# UniversalChatGames site — "Night Server" redesign spec

Audit date: 2026-11-03. Supersedes the asset list in `PIXEL-SPEC.md` (keep it
for history). `DESIGN.md` is out of date and gets rewritten from this file once
the new assets land.

Direction: the page is a blocky server at night, and game chat is the hero.
A visitor should feel they log in, watch a round, and see someone get paid.
All art is original and Minecraft-like. Never use Mojang textures, GUI sprites,
mob designs or logos, and nothing on the page may suggest Mojang made or
endorsed the plugin.

(A "Mob Vote" style pass was tried on 2026-11-03 and dropped; its files were
deleted. This spec is back to the Night Server style below.)

---

## Part A — Fix before the redesign (code)

| # | Problem | Where | Fix | Status |
|---|---|---|---|---|
| A1 | Content touches the screen edge. `.section { padding: 56px 0 }` and `.hero-inner { padding: 88px 0 64px }` override the 24px side padding from `.wrap`. | `styles.css` | Use `padding-block` instead of the `padding` shorthand | Done |
| A2 | Returning visitors see stale pages. The service worker serves the cache first and the cache name `ucg-site-v1` never changes. | `sw.js` | Load HTML from the network first, or change `CACHE` on every deploy | Done, including caching only `response.ok` and `skipWaiting` + `clients.claim` (runtime not testable in the in-app browser) |
| A3 | The page says "Real captures ship after release", but the captures already exist | `index.html` `#captures` | Replace the 2 mockups with `capture-*.png` | Open, done during the layout wire-up |
| A4 | Stale numbers: "Five games" next to 7 cards, docs label says v1.2, `bbb-header.png` says v1.3, and the banner shows 3 modes in a non-pixel style | `index.html`, `docs.html`, `assets/` | Make every version number and count match | Page copy done. `bbb-header.png` and the banner move to C7 |
| A5 | The header is 141px tall on phones because the nav wraps | `styles.css` | Below 600px, show only the logo and the Buy button | Done. Below 600px the header button reads "Buy" and fits at 375px |
| A6 | `font.ttf` is Press Start 2P, which is also loaded from Google Fonts | `index.html` | Use only the local font and remove the Google Fonts links for it | Done |
| A7 | The pixel font is sized with `clamp()`, so it lands on in-between sizes and blurs | `styles.css` `h1` | Use fixed 16/24/32/40px and change size with breakpoints | Done |
| A8 | Every capture shows a "ChatGames round started" line | `capture-*-win.png` | That line is the `/chatgames start` admin confirmation (`ChatGamesCommand.java:67`), not debug output. Retake as natural rounds, or crop it | Open, Felix's call |

---

## Part B — Rules for every asset

- Transparent PNG unless stated, drawn on the native grid only.
- Shown at whole-number scale (2×, 3× or 4×) with `image-rendering: pixelated`.
- Light comes from the top-left. Use a 1px `#131313` outline, darker on the bottom and right edges.
- Use only the palette below. A new colour needs its reason written in this file.
- Shading uses ordered (checkerboard) dither only, never random noise.
- Animations use whole frames and CSS `steps()`. With `prefers-reduced-motion`, show frame 1 only.

### Palette (16 colours)

| Role | Hex |
|---|---|
| Outline | `#131313` |
| Night sky, 3 shades | `#0e1a3a` `#2a3a66` `#274b8f` |
| Grass | `#1e5c2e` `#3fa34d` `#7ed07a` (highlight) |
| Dirt | `#4a2c17` `#7a4a2b` |
| Stone | `#3a3d47` `#6b6f7a` |
| Amber (actions and money only) | `#f5b301` `#ffd94a` (highlight) |
| Cream (text and paper) | `#f4ecd8` |
| Violet (Quizmaster, epic tier) | `#a855f7` |
| Teal (secondary identity) | `#2dd4bf` |

Exceptions:
- The mascot skin keeps `#d9b48f` and `#a67c52`, carried over from `PIXEL-SPEC.md`.
- The robe shade uses darker violet `#7a3cc0`, already used in the `mascot-quizmaster.png` collar.
- `#7a4a2b` doubles as the amber button shadow, because `#131313` does not show on `#0d0e12`.
- Recolour the current icon gold `#e8b848` to `#f5b301`.

---

## Part C — Assets, in priority order

### C1. Hero scene (3 layers + animation) — done
- Files: `hero-sky.png` (= `hero-sky-f1.png`), `hero-far.png` and `hero-near.png`, each 480×270, shown at 3× (1440px).
- **Sky**: a stepped gradient in the 3 night shades (no smooth blend), 20–30 one-pixel stars, and an 8×8 square moon in the top-right quarter.
- **Far layer**: blocky hill silhouettes in `#0e1a3a`/`#2a3a66`, no outline, along the bottom 40%.
- **Near layer**: a grass-block ledge in the bottom 60px on the right 45%. The Quizmaster (`mascot-full-idle-f1/f2.png`) stands on it as a separate sprite placed by CSS, with `nameplate.png` above.
- **Left 55%**: no detail brighter than `#2a3a66`, so the headline and buttons stay readable.
- **Animation**: `hero-sky-f1..f4.png`, 250ms per frame. 3–4 stars twinkle and one torch on the ledge flickers. The torch flame lives in `hero-torch-f1..f4.png`, drawn above the near layer. The left-55% rule is checked on the stacked layers (sky+far+near+torch).
- **Accept**: every colour is in the palette, and the headline reads at 1440px and at 375px. Under reduced motion, frame 1 shows and nothing moves.

### C2. Quizmaster mascot, full body — idle done
- Files: `mascot-full-<pose>.png`, 32×48, shown at 3× in the hero and 4× in the pricing section.
- Keep the face and violet collar from `mascot-quizmaster.png`. Add a violet robe with a darker violet shade and a cream question scroll.
- **Poses**:
  - `idle`: 2 frames with a blink, 1200ms / 150ms. Idle frames are `mascot-full-idle-f1/f2.png`. Done.
  - `ask`: an 8×8 "?" chat bubble
  - `cheer`: arms up
  - `point`: one arm pointing right
- **Accept**: the same face pixels in every pose, the feet on the same bottom row, and the outline reads against `#0d0e12`.

### C3. Redrawn mode icons — done
- Files: `icon-<mode>.png` and `icon-<mode>-lit.png`, 16×16, shown at 3× (48px), plus `icon-<mode>-64.png` as exact 4× copies.
- **Math**: a 2×2 grid showing `+ − × =`.
- **Unscramble**: "BA" letter tiles with a swap arrow.
- **Typing**: a keycap with "A".
- **Trivia**: an open book with "?".
- **Guess**: a "7?" tile.
- **Broadcast**: keep the current icon.
- **Lit version**: the same shape with every fill one step lighter and the outline unchanged.
- **Accept**: all 6 sit in the same 14×14 area with a 1px margin, and each one reads at 48px without its label.

### C4. UI panel tiles (9-slice) — done
- Files: `panel-stone.png`, `panel-chat.png`, `btn-normal.png`, `btn-hover.png` and `btn-pressed.png`, each 24×24 with 8px corners.
- **Stone panel**: a raised bevel for the feature cards — `#131313` outline, `#6b6f7a` inner top row and left column, `#131313` inner bottom row and right column.
- **Chat panel**: `#131313` at 60% alpha interior with a 1px `#3a3d47` border on all four sides (`#6b6f7a` top row). It frames the real captures.
- **Button**: an amber face. Normal/hover carry a 2px `#7a4a2b` bottom lip (rows 21-22); pressed has no lip, its face shifted down 2px with `#7a4a2b` shade rows 1-2. This replaces `btn-9patch.png`.
- **Accept**: the middle tiles repeat without visible seams at 3×, and the corners stay crisp.

### C5. Reward chips
- Files: `chip-coin.png`, `chip-rare.png`, `chip-epic.png` and `chip-command.png`, each 12×12.
- **coin**: amber, for money rewards.
- **rare**: a green gem.
- **epic**: a violet gem.
- **command**: a generic terminal glyph. Don't use a command-block look.
- **Accept**: all 4 read at 2× next to 16px text.

### C6. Dividers
- `divider-grass.png`: keep it.
- Add `divider-stone.png` and `divider-dirt.png`, each 16×16 and repeating across the page.
- **Accept**: no seams when tiled across 1440px.

### C7. App icons, social card and marketplace art
- `icon-192.png`, `icon-512.png` and `apple-touch-icon.png`: `logo-mark.png` scaled by a whole number on `#0d0e12`. Keep the logo inside the central 80%, because phones crop the icon (it is marked maskable).
- `og-card.png`, 1200×630: hero art, the logo and "Dead chat kills servers."
- Redo `bbb-header.png` (it says v1.3) and the old banner in the same style.
- **Accept**: the logo stays visible inside a circular crop, and the OG card reads at 600px wide.

### C8. Optional
- An animated hotbar nav: 9 slots, one per section, with an amber selected frame.
- A 16×16 pixel cursor.

---

## Part D — Page layout

| Section | Content |
|---|---|
| Hero | Headline and buttons on the left, C1 scene with the C2 idle sprite and nameplate on the ledge on the right. Under the buttons, a chat panel plays real round lines on a loop (question → answer → "You won! $350"). |
| Games | 6 stone-panel cards with 48px icons. The Quizmaster gets a full-width violet card with the C2 `ask` pose. |
| How a round looks | Real captures in chat panels, with `capture-quizmaster-villager.png` shown large. |
| Rewards (new) | Money, command and mixed pools shown with C5 chips and rarity colours. |
| Pricing | The current price card inside the stone panel, with the C2 `point` pose. |
| Setup / FAQ | Keep the content and frame it in panels. |

Type: Press Start 2P only for the h1, h2, badges and buttons, at 16/24/32/40px. All other text uses Inter.

---

## Order of work
1. ~~Finish Part A.~~ Done, except A3 (during the wire-up) and A8 (Felix decides).
2. ~~Draw C1 and the C2 idle pose.~~ Done.
3. ~~Draw C3 and C4.~~ Done.
4. Wire up the page layout (Part D) with the finished art. Pages that need a C2 pose that isn't drawn yet use the idle sprite for now.
5. Draw the C2 `ask`, `cheer` and `point` poses, then C5, C6 and C7, then rewrite `DESIGN.md`.
