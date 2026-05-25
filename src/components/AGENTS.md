# src/components - Global Component Library

**Parent**: [AGENTS.md](../../../AGENTS.md)

## OVERVIEW
Reusable UI components organized as a global library (not feature-colocated).

## STRUCTURE
```
components/
├── ui/                 # Reusable UI primitives (16 files)
│                       # Buttons, inputs, cards, modals, etc.
├── layout/             # Layout shells (3 files)
│                       # admin-layout.tsx, etc.
├── providers/          # Context providers
│                       # theme-provider.tsx, session-provider.tsx
├── dashboard/          # Dashboard widgets
└── charts/             # Chart components
```

## CONVENTIONS
- UI primitives in `ui/` - shadcn/ui or custom
- Layout components wrap page content
- Providers use React context for theme/session state
- Components NOT colocated with features - global library pattern

## ANTI-PATTERNS
- Global library pattern means components are decoupled from the features that use them
- No feature-specific component directories
- May lead to unused component accumulation
