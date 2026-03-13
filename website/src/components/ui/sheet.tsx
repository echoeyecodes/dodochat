import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { LucideX } from "lucide-react"
import { cn } from "@/lib/utils"

const Sheet = DialogPrimitive.Root

const SheetTrigger = DialogPrimitive.Trigger

const SheetClose = DialogPrimitive.Close

const SheetPortal = DialogPrimitive.Portal

const SheetOverlay = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Overlay>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
    <DialogPrimitive.Overlay
        className={cn(
            "fixed inset-0 z-50 bg-black/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            className
        )}
        {...props}
        ref={ref}
    />
))
SheetOverlay.displayName = DialogPrimitive.Overlay.displayName

const SheetContent = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & { side?: "top" | "bottom" | "left" | "right" }
>(({ side = "left", className, children, ...props }, ref) => (
    <SheetPortal>
        <SheetOverlay />
        <DialogPrimitive.Content
            ref={ref}
            className={cn(
                "fixed z-50 gap-4 bg-(--color-bg-elevated) shadow-2xl transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
                side === "left" && "inset-y-0 left-0 h-full w-3/4 border-r border-(--color-border) data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
                side === "right" && "inset-y-0 right-0 h-full w-3/4 border-l border-(--color-border) data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
                className
            )}
            {...props}
        >
            {children}
            <DialogPrimitive.Close className="absolute right-4 top-4 rounded-full opacity-70 border border-(--color-border) bg-(--color-bg-subtle) transition-all hover:opacity-100 hover:bg-(--color-bg-muted) p-2 focus:outline-none focus:ring-2 focus:ring-(--color-accent) disabled:pointer-events-none">
                <LucideX className="h-4 w-4 text-(--color-text-primary)" />
                <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
        </DialogPrimitive.Content>
    </SheetPortal>
))
SheetContent.displayName = DialogPrimitive.Content.displayName

export {
    Sheet,
    SheetTrigger,
    SheetClose,
    SheetContent,
}
