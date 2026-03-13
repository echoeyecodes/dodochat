import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-(--color-bg-elevated) group-[.toaster]:text-(--color-text-primary) group-[.toaster]:border-(--color-border) group-[.toaster]:shadow-(--shadow-editorial) group-[.toaster]:rounded-xl font-body p-4 gap-3",
          description: "group-[.toast]:text-(--color-text-secondary) text-[13px] mt-1",
          actionButton:
            "group-[.toast]:bg-(--color-accent) group-[.toast]:text-(--color-bg) font-medium rounded-lg",
          cancelButton:
            "group-[.toast]:bg-(--color-bg-muted) group-[.toast]:text-(--color-text-secondary) font-medium rounded-lg",
          closeButton: 
            "group-[.toast]:bg-(--color-bg-elevated) group-[.toast]:border-(--color-border) group-[.toast]:text-(--color-text-tertiary) hover:group-[.toast]:text-(--color-text-primary) transition-colors",
          success: "group-[.toast]:border-(--color-success-bg)",
          error: "group-[.toast]:border-(--color-error-bg)",
        },
      }}
      icons={{
        success: (
            <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: 'var(--color-success-bg)', color: 'var(--color-success)' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
            </div>
        ),
        error: (
            <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: 'var(--color-error-bg)', color: 'var(--color-error)' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </div>
        ),
      }}
      closeButton
      {...props}
    />
  )
}

export { Toaster }
