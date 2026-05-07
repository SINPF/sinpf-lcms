---
name: UI contrast and design feedback
description: User expects high-contrast, visually rich UI — not flat/monotone designs
type: feedback
---

Avoid flat, monotone UI. When replacing existing components, maintain or improve visual richness.

**Why:** User rejected an update where stat cards went from colorful dark cards to plain bordered boxes, and auth cards used near-transparent backgrounds (bg-white/5) that killed contrast.

**How to apply:**
- Auth pages: use solid `bg-white` cards on dark backgrounds, never semi-transparent ones
- Stat/metric cards: use colored top accent bars or icon tinting — not plain white boxes
- Dark sidebar: inactive nav text should be at least `text-slate-300` for readability
- Always verify that replaced components maintain or exceed the contrast and visual interest of the original
- Never make the UI look "flatter" than what the user had before
