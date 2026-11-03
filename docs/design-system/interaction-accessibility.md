# Interaction and accessibility

## Navigation and scrolling

- All page navigation uses in-page anchors so the site remains understandable as a single-page profile.
- The mobile menu exposes its state with `aria-expanded`, closes when a link is selected, and closes on Escape.
- Lenis provides smooth scrolling and GSAP ScrollTrigger updates scroll-linked effects. Anchor navigation also updates the URL hash.
- A thin fixed progress bar indicates page scroll position.

## Motion

- Reveal animations are used for major content groups as they enter view; keep them short and restrained.
- Hover transitions should clarify affordance, such as a small lift or color change, rather than shift layout.
- The stylesheet disables transitions for `prefers-reduced-motion: reduce`; the entrance animations are also skipped when reduced motion is requested.
- Preserve usable controls if animation or WebGL is unavailable.

## Keyboard and focus

- Use semantic links for navigation and buttons for actions.
- Maintain a clearly visible `:focus-visible` outline. Do not remove it without an equally visible replacement.
- The contact tabs support Left and Right Arrow keys and maintain `aria-selected`, `tabIndex`, and panel relationships.
- Calendar dates and time slots are real buttons with accessible labels and pressed state.
- Form fields have visible labels; validation errors use alert regions and the booking summary is announced politely.
- Decorative imagery and CSS artwork should remain hidden from assistive technology when it adds no content.

## Forms and content behavior

- Preserve native input types, `required` constraints, autocomplete hints, and fieldset/legend groupings.
- Keep validation messages direct and near the form that needs attention.
- Confirmation messages should summarize the user's selected action without implying a backend action that has not occurred.
- The current contact forms are prototypes. Connect them to scheduling and delivery services before treating submissions as real bookings or received briefs.

## Contrast and touch

- Keep text readable against its surface; the contact card's dark ink and muted labels are designed for its light background, while the outer contact copy uses pale text on deep blue.
- Interactive targets should remain comfortably tappable on touch layouts. The scene exposes larger controls for coarse pointers.
- Do not rely on color alone for selected or disabled form states; retain pressed, disabled, and focus semantics.
