---
description: Project coding conventions and style rules
---

# Coding Conventions

## TypeScript

- **Always use `type` over `interface`** unless `interface` is explicitly required (e.g. extending a class or library type like Mongoose `Document`).
  ```ts
  // ✅ Correct
  type User = {
    id: string;
    name: string;
  };

  // ❌ Avoid
  interface User {
    id: string;
    name: string;
  }
  ```

- **Always use `export const` for components and functions**, never `export function` or `export default function`.
  ```tsx
  // ✅ Correct
  export const MyComponent = () => { ... };

  // ❌ Avoid
  export function MyComponent() { ... }
  export default function MyComponent() { ... }
  ```

- **Use `snake_case` for all field/property names** in types, API responses, and database schemas.
  ```ts
  // ✅ Correct
  type User = {
    first_name: string;
    created_at: Date;
  };

  // ❌ Avoid
  type User = {
    firstName: string;
    createdAt: Date;
  };
  ```

- **Never use barrel imports/exports.** Import directly from the file that defines the export.
  ```ts
  // ✅ Correct
  import { useConversation } from '../hooks/useConversation'
  import { useConversations } from '../hooks/useConversations'

  // ❌ Avoid — barrel index.ts re-exporting everything
  import { useConversation, useConversations } from '../hooks'
  ```

## Folder Structure (Feature-Based)

Both **frontend (`src/`)** and **backend (`server/src/`)** follow a strict feature-based structure:

```
src/                          # Frontend
├── features/
│   └── chat/
│       ├── components/       # React components
│       ├── hooks/            # React Query hooks (one per file)
│       ├── api/              # API service functions
│       ├── types/            # Type definitions
│       └── constants/        # Constants
├── lib/                      # Shared utilities (cn, env, etc.)
└── routes/                   # TanStack Router file-based routing

server/                       # Backend
├── src/
│   ├── features/
│   │   ├── common/
│   │   │   └── middlewares/  # Shared middlewares (validate, etc.)
│   │   └── conversation/
│   │       ├── api/
│   │       │   ├── index.ts      # Express router with routes
│   │       │   ├── actions.ts    # Request handlers (controllers)
│   │       │   └── req-schema.ts # Zod request validation schemas
│   │       ├── models/       # Mongoose models
│   │       ├── repository/   # Data access layer (one function per file)
│   │       └── types/        # Type definitions
│   └── lib/                  # Shared utilities (db connection, etc.)
└── server.ts                 # Express entry point (mounts routers)
```

- Types for a feature go in `features/<feature>/types/index.ts`
- Models go in `features/<feature>/models/<ModelName>.ts`
- Components go in `features/<feature>/components/<ComponentName>.tsx`
- **Repositories** go in `features/<feature>/repository/index.ts`
- Shared utilities go in `lib/`

### Repository Pattern

All database queries live in a repository, never directly in route handlers. Each function gets its **own file**, and `index.ts` re-exports them as a single const object:

```
server/src/features/conversation/repository/
├── index.ts                    # Re-exports as conversationRepository object
├── listConversations.ts
├── getConversationById.ts
├── createConversation.ts
├── deleteConversation.ts
├── findOrCreateConversation.ts
├── appendMessages.ts
└── autoTitle.ts
```

```ts
// ✅ Correct — index.ts
export const conversationRepository = {
    getConversationById,
    listConversations,
    createConversation,
};

// ❌ Avoid — all functions in one file
// ❌ Avoid — queries directly in route handlers
```

## Data Fetching (Frontend)

- **Always use React Query** (`@tanstack/react-query`) — never use raw `useEffect` + `fetch` for data fetching.
- **Never use raw `fetch`** — always use the internal `request` utility from `lib/request`.
- API service functions go in `features/<feature>/api/index.ts`
- Query hooks go in `features/<feature>/hooks/` — **one hook per file**.
- Define query keys in a `keys` object for consistent cache management.
- **Query hooks should accept an options object** to delegate parameters like `enabled` and `stale_time` to the caller. Use `snake_case` for these property names.
  ```ts
  // ✅ Correct
  export const useItems = ({ enabled, stale_time }: UseItemsOptions = {}) => {
    return useQuery({
      queryKey: ['items'],
      queryFn: fetchItems,
      enabled,
      staleTime: stale_time,
    });
  };
  ```

```ts
// ✅ Correct
import { request } from '../../../lib/request'
const fetchConversations = async () => {
    const { data } = await request({ path: 'conversations', method: 'GET' })
    return data
}

// ❌ Avoid
const fetchConversations = async () => {
    const res = await fetch('/api/conversations')
    return res.json()
}
```

## Styling

- **Use Tailwind CSS v4** — no inline style objects.
- **Use design system CSS variables** (e.g. `--color-bg`, `--color-accent`) instead of raw Tailwind colors.
- Design tokens are defined in `src/styles.css` under `:root`.

## Dialogs / Modals

- **Always use imperative ref pattern** with `forwardRef` + `useImperativeHandle` to control dialogs. Never use prop-based `isOpen` state from parent.
- Expose `open(options)` and `close()` via the ref.
- `open()` accepts an options object with `data` (initial state) and callback functions (e.g. `onConfirm`, `onCancel`).
- Store callbacks in `useRef` or `useState` to avoid stale closures.
- Reset state in a `useEffect` when `isOpen` becomes `false`.
- Use Radix `Dialog` primitives from `@/components/ui/dialog`.
- Use Zod + React Hook Form for any form inputs inside dialogs.

```tsx
// ✅ Correct — imperative ref pattern
type MyDialogOptions = {
    data: { title: string }
    onConfirm?: (value: string) => void
}

export type MyDialogRef = {
    open: (options: MyDialogOptions) => void
    close: () => void
}

export const MyDialog = forwardRef<MyDialogRef>((_, ref) => {
    const [isOpen, setIsOpen] = useState(false)

    useImperativeHandle(ref, () => ({
        open: (options) => { /* set state, setIsOpen(true) */ },
        close: () => { setIsOpen(false) },
    }))

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent>...</DialogContent>
        </Dialog>
    )
})

// Usage:
const dialogRef = useRef<MyDialogRef>(null)
dialogRef.current?.open({ data: { title: 'Hello' }, onConfirm: (val) => {} })
```

```tsx
// ❌ Avoid — prop-based open state
<MyDialog isOpen={showDialog} onClose={() => setShowDialog(false)} />
```

## Package Manager

- **Use `bun`** for all package management and running scripts.
