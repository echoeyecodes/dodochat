import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    {
        variants: {
            variant: {
                default: "bg-(--color-accent) text-(--color-bg) hover:bg-(--color-accent-hover)",
                destructive: "bg-red-500 text-white hover:bg-red-600",
                outline:
                    "border border-(--color-border) bg-transparent hover:bg-(--color-bg-muted) text-(--color-text-primary)",
                secondary:
                    "bg-(--color-bg-muted) text-(--color-text-secondary) hover:bg-(--color-border)",
                ghost: "hover:bg-(--color-bg-muted) text-(--color-text-secondary) hover:text-(--color-text-primary)",
                link: "text-(--color-accent) underline-offset-4 hover:underline",
            },
            size: {
                default: "h-10 px-4 py-2",
                sm: "h-9 rounded-md px-3",
                lg: "h-11 rounded-md px-8",
                icon: "h-10 w-10",
            },
            roundness: {
                default: "rounded-md",
                full: "rounded-full",
                lg: "rounded-lg",
                xl: "rounded-xl",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
            roundness: "lg",
        },
    },
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, roundness, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button";
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, roundness, className }))}
                ref={ref}
                {...props}
            />
        );
    },
);
Button.displayName = "Button";

export { Button, buttonVariants };
