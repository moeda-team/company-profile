# Nodeworks website design system

This document set describes the visual language and interface patterns used by the Nodeworks company profile website. It records the current implementation so that future edits stay consistent across sections and screen sizes.

## Documents

- [Foundations](docs/design-system/foundations.md): color, typography, layout, and spacing.
- [Components and page patterns](docs/design-system/components.md): site sections, reusable components, and responsive behavior.
- [Interaction and accessibility](docs/design-system/interaction-accessibility.md): motion, navigation, forms, keyboard use, and reduced motion.

## Source of truth

The live implementation is in `src/style.css` and `src/main.ts`. The page shell and global font loading are in `index.html`. If this documentation and the code differ, update the documentation to match intentional code changes.

## Design principles

1. **Make complex work feel clear.** Use direct language, strong hierarchy, and a small number of purposeful visual accents.
2. **Connect the system.** Treat strategy, design, technology, data, and operations as related parts of one digital product.
3. **Balance precision with warmth.** Pair structured layouts and technical imagery with soft blue light, rounded details, and human copy.
4. **Keep actions legible.** Primary actions use filled blue controls; secondary actions use text or outlined treatments.

## Page map

The single-page experience is ordered as: hero and navigation, selected work, services, approach, insights, contact, and footer. Section anchors are `#top`, `#work`, `#services`, `#about`, `#insights`, and `#contact`.
