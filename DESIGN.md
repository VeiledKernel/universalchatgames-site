# UniversalChatGames — DESIGN.md

Dark gaming sales page. Amber is the single action color; violet and teal
mark game-mode identity only, never actions. Structure adapted from the
PlayStation system: token discipline, section rhythm, pill CTAs.

## Tokens

```css
--bg: #0d1512;       /* page canvas */
--card: #131d18;     /* raised surfaces */
--codebg: #101915;   /* code blocks */
--line: #223028;     /* borders, hairlines */
--ink: #f2f5f3;      /* primary text */
--mute: #9db3a8;     /* secondary text */
--amber: #f5b301;    /* THE action color: buy buttons, badges, key accents */
--on-amber: #161006; /* text on amber */
--violet: #a855f7;   /* game-mode identity only */
--teal: #2dd4bf;     /* game-mode identity only */
```

## Type
- Display: Space Grotesk 700, hero `clamp(2rem, 5vw, 3rem)`, tight tracking.
- Body: Inter 400/600/700. Section titles 24px bold.
- One `h1` per page. Sections get `h2`.

## Components
- CTA: amber fill, on-amber text, bold, `rounded-lg`, full pill only for
  mode badges. Exactly one primary CTA per viewport (Buy).
- Cards: `--card` fill, 1px `--line` border, `rounded-xl`.
- Mode badges: transparent fill, 2px identity-color border + text.
- Code: `--codebg` fill, `--line` border, horizontal scroll.

## Rules
- Amber never decorates: actions and key accents only.
- Violet/teal never act: identity only.
- Muted text keeps 4.5:1 against canvas (body) — decorative only below that.
- Visible `:focus-visible` outline on every link, button, summary.
- Section rhythm 3.5rem desktop, tighter on mobile. No dividers between bands.
- Touch targets: CTAs ≥ 44px height; inline nav links exempt.

## Responsive
- `lg:` two-column (content + sticky rail) → single column below.
- Hero scales by clamp, never fixed steps. Grids collapse 2-up → 1-up.
- Sticky rail becomes static flow on mobile.

## Reward rarity bands (Minecraft language, CSS-only)
- Common: `#5f5` green, rewards under 500 (mockup `+250.0` → `.rar-common`).
- Rare: `#fa0` gold, rewards 500–999 (checkout `Launch tier` note → `.launch-tier`).
- Epic: `#a855f7` violet, rewards 1000+ (mockup `+1500.0` → `.rar-epic`).
- Mockup chat lines keep game-chat voice; only the reward amount carries the tier color.
- No asset changes for tiers — text color classes only.
