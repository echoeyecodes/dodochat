# Groupchat Project - Agent Rules

This document outlines the strict rules and guidelines that AI agents must follow when modifying or adding code to this project. 

## 1. File & Component Structure
- **Feature-Based Architecture**: Strictly follow a feature-based folder structure. 
  - Place domain-specific components, hooks, and utils into their respective feature folders (e.g., `src/features/chat/components/ConversationList.tsx`).
- **Export Syntax**: Components must be defined using explicitly typed const arrow functions instead of classic function declarations:
  - **Do:** `export const Component = () => { ... }`
  - **Don't:** `export function Component() { ... }`

## 2. Design System & Styling
- **EchoEye Portfolio Aesthetics**: Strictly adhere to the foundational design system defined in `src/styles.css` (warm neutral, light-mode only aesthetic, crisp borders).
- **Tailwind v4 Strictness**:
  - Always use Tailwind v4 CSS variable wrapper syntax (e.g., `bg-(--color-bg-elevated)` instead of `bg-[var(--color-bg-elevated)]`).
  - **NO inline objects**: Avoid React `style={{ ... }}` objects unless absolutely required for dynamic inline values (like dynamic height/width percentages). CSS styling MUST be written as Tailwind utility classes.
- **Dynamic Classes**: Always use the `cn` utility from `@/lib/utils` to merge dynamic class names instead of raw string ternaries (e.g., ``className={cn("base", condition && "active")}``).

## 3. Tech Stack
- **Framework**: Built with React, Vite, and TanStack Router. Ensure all generated code correctly imports from `@tanstack/react-router` where applicable.

## 4. Housekeeping
- **No Redundancy**: Always be on the lookout and proactively delete any unused, unreferenced, or redundant components, features, or boilerplate documentation inherited from templates. Keep the repository as lean as possible.
