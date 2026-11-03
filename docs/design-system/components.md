# Components and page patterns

The page is rendered from the template in `src/main.ts`; styling lives in `src/style.css`. Keep section-specific styles scoped by their existing class names.

## Header and navigation

- Use the Nodeworks mark and wordmark at left, centered section links on wide layouts, and an outlined “Let’s talk” action at right.
- At narrower widths the section links collapse into a circular menu control and a full-width mobile navigation panel.
- The current section receives a blue label and short underline.

## Hero

- Use a pale radial blue field and centered introductory copy.
- Keep the main statement concise and use blue emphasis for the key phrase.
- The interactive 3D studio is the dominant visual. Place its controls close to the canvas and retain the “drag to explore” affordance on pointer layouts.
- Provide a filled primary action and a quieter secondary action beneath the scene.

## Section headings

Section titles are unnumbered. Display headings use Barlow Condensed and uppercase treatment; short supporting copy stays in DM Sans. Numbering inside individual service stages, approach steps, and project cards remains part of those component patterns.

## Selected work cards

Use a three-column project grid on wide screens. Each card combines a large image, ordinal number, status label, category, title, and short case-study status. The current project cards are previews marked “Coming soon”; do not imply completed case studies until their content is ready.

## Service cards

The services section uses three equal cards for Discover, Design, and Build. Each card has a simple decorative symbol, a stage label, a short title, one concise explanation, and a compact list of capabilities.

## Approach section

Pair a sticky introductory column with a sequence of three steps and a decorative blueprint motif. The copy should explain how the studio works in practical terms. Keep decorative shapes hidden from assistive technology.

## Insight cards

Use a two-column set of editorial cards. Each card combines a small index, abstract CSS artwork, a principle-led heading, and a short explanation.

## Contact form card

The contact panel sits beside the large invitation copy on desktop and stacks below it on compact screens. It has two accessible tabs:

- **Book a call:** calendar date selection, available time slots, name, email, and a topic choice.
- **Send a brief:** name, email, company, need categories, budget, timeline, and project details.

The card uses a cool gray surface, segmented tabs, rounded controls, and a full-width blue submit action. Confirmation replaces the forms while preserving the card layout.

The current calendar and form confirmations are front-end demo behavior in `src/main.ts`. There is no availability API, email delivery, or booking integration connected yet.

## Footer

The footer is a compact link area on a pale gray background. It contains the brand summary, service links, studio links, connect links, copyright, and a back-to-top link. The former large footer call-to-action is intentionally absent.

## Responsive behavior

The stylesheet uses several breakpoints because sections have different layout needs:

| Width | Typical behavior |
| --- | --- |
| `1180px` | Tighten wide layouts and grids |
| `1040px` | Contact switches to a stacked layout |
| `900px` | Header/navigation and multi-column sections adapt for tablet |
| `600px` | Compact mobile spacing and card arrangements |
| `520px` | Contact card fields stack; time slots use three columns |
| `375px` | Small-phone refinements |

When adding a new breakpoint, first check whether the existing layout can adapt with fluid sizing, wrapping, or grid behavior.
