# Foundations

## Color

The main site palette is bright blue, deep navy, and cool pale blue. Use blue for actions and emphasis, navy for strong reading contrast, and pale blue surfaces to support the 3D studio imagery.

| Role | Value | Use |
| --- | --- | --- |
| Primary blue | `#0847f7` | Main links, buttons, progress indicator, and emphasis |
| Deep blue | `#073bdd` | Darker primary interaction states |
| Navy | `#071344` | Main headings and high contrast text |
| Muted blue | `#566b9e` | Supporting text on light surfaces |
| Ice | `#edf4ff` | Light blue surface foundation |
| White | `#ffffff` | Content surfaces and reversed text |
| Approach surface | `#f5f8fe` | Alternating section background |
| Footer surface | `#f1f3f8` | Footer background |

The contact area has its own darker palette to distinguish the conversion section. These values are defined as `--contact-*` properties in `src/style.css`: `#2542b0` (background/action), `#1b3191` (hover), `#1b2a6b` (form ink), `#5d668f` (form muted text), `#d6d6d6` (main type), `#98a6d6` (accent), `#e6e8f0` (form card), and `#d5d9e6` (form borders). Keep the contact palette scoped to the contact components.

## Typography

Two Google Fonts are loaded in `index.html`:

- **DM Sans** is the body and interface face. Use it for paragraphs, labels, navigation copy, and form fields.
- **Barlow Condensed** is the display face (`--condensed`). Use uppercase styling for section headings, eyebrows, button labels, and compact metadata.

Fallbacks are system sans-serif for body text and Impact / Arial Narrow for display text. Headings use tight line-height and restrained tracking; body text favors comfortable line-height around 1.5.

## Layout and spacing

- Standard content uses `.container`: up to `1356px` wide with fluid side margins.
- The header uses a slightly wider `1420px` maximum width.
- The contact layout uses a `1240px` maximum width and a two-column composition, with a `520px` form card.
- Favor generous vertical section padding and clear separation between headings and content.
- Use grid for major page layouts and cards; use flex for aligned controls and compact groups.
- Corners are generally modest on cards and controls. The hero and contact sections may use a larger corner radius as a distinctive silhouette.

## Shape, depth, and imagery

The visual language combines clean surfaces, fine borders, soft shadows, and circular orbit motifs. Keep decorative effects low contrast so they do not compete with content. The hero's interactive 3D studio is the main visual centerpiece; project previews are static images under `public/images/work/`.

## Global implementation tokens

Current global custom properties in `src/style.css`:

```css
--blue: #0847f7;
--blue-deep: #073bdd;
--navy: #071344;
--muted: #566b9e;
--ice: #edf4ff;
--contact-blue: #2542b0;
--contact-blue-hover: #1b3191;
--contact-ink: #1b2a6b;
--contact-muted: #5d668f;
--contact-accent: #98a6d6;
--contact-heading: #d6d6d6;
--contact-paper: #e6e8f0;
--contact-paper-border: #d5d9e6;
--condensed: 'Barlow Condensed', Impact, 'Arial Narrow', sans-serif;
```

Prefer these properties for new components. The services section uses the shared `--navy` value so the dark blue foundation stays consistent across the site.
