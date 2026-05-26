# src/components/ui - Reusable UI Primitives

**Parent**: [AGENTS.md](../../../../AGENTS.md)

## OVERVIEW
16 reusable UI primitives built with Radix UI + Tailwind CSS. Non-feature-specific — global library pattern.

## FILES
| File | Base Library | Purpose |
|------|-------------|---------|
| `blog-posts.tsx` | Custom | Story/article card grid with ratings, views, background images |
| `glass-blog-card-shadcnui.tsx` | Framer Motion | Glassmorphism blog card with Avatar, Badge, hover overlay |
| `button.tsx` | Custom | Primary/secondary/outline button variants |
| `card.tsx` | Custom | Content containers with header/footer |
| `dialog.tsx` | Radix Dialog | Modal dialogs with overlay |
| `dropdown-menu.tsx` | Radix Dropdown | Menu dropdowns |
| `select.tsx` | Radix Select | Styled select inputs |
| `tabs.tsx` | Radix Tabs | Tabbed content panels |
| `switch.tsx` | Radix Switch | Toggle controls |
| `checkbox.tsx` | Radix Checkbox | Checkbox inputs |
| `input.tsx` | Custom | Text input fields |
| `textarea.tsx` | Custom | Multi-line text input |
| `label.tsx` | Custom | Form labels |
| `badge.tsx` | Custom | Status/label badges |
| `avatar.tsx` | Custom | User/team avatars |
| `spotlight.tsx` | Custom | Spotlight highlight effect |
| `hero-highlight.tsx` | Custom | Hero section highlight |
| `spline.tsx` | Custom | 3D spline viewer |

## CONVENTIONS
- Use `forwardRef` + typed props for all primitives
- Extend native HTML attributes via `React.InputHTMLAttributes` etc.
- Tailwind classes directly on components (no CSS modules)
- Components use `cn()` utility from `clsx`/`tailwind-merge`
- Radix UI primitives for accessible unstyled behavior

## ANTI-PATTERNS
- No feature-specific logic in UI primitives (pure presentation)
- No business logic — keep as stateless as possible
- Avoid adding page-specific styling overrides
