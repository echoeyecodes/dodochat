import { Link } from "@tanstack/react-router"
import { Button } from "@/components/ui/button"

export const NotFound = () => {
    return (
        <div className="h-dvh w-full flex flex-col items-center justify-center bg-(--color-bg) px-6">
            <div className="w-full max-w-[440px] flex flex-col items-center text-center">

                <div>
                    <img
                        src="/logo.png"
                        alt="DodoChat"
                        className="size-32 object-contain"
                    />
                </div>

                <div className="space-y-4 mb-10">
                    <h1 className="text-[120px] font-bold leading-none tracking-tighter text-(--color-text-primary) opacity-[0.03] select-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10">
                        404
                    </h1>
                    <h2 className="text-[32px] font-bold tracking-tight text-(--color-text-primary)">
                        Page not found
                    </h2>
                    <p className="text-base text-(--color-text-secondary) leading-relaxed">
                        The page you're looking for doesn't exist or has been moved.
                        Let's get you back to the workbench.
                    </p>
                </div>

                <div className="w-full">
                    <Button
                        asChild
                        variant="default"
                        size="lg"
                        roundness="xl"
                        className="w-full h-12 font-semibold shadow-sm shadow-orange-500/10 active:scale-[0.98] transition-all"
                    >
                        <Link to="/">
                            Return to Home
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}
