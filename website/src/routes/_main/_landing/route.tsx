import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_main/_landing")({
    component: LandingLayout,
    loader({ context }) {
        return context.user;
    },
});

function LandingLayout() {
    const isLoggedIn = !!Route.useLoaderData();

    return (
        <div className="min-h-screen bg-(--color-bg) flex flex-col selection:bg-(--color-accent-subtle) selection:text-(--color-text-primary) grain">
            {/* ─── Simple Navigation ─── */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-(--color-bg)/80 backdrop-blur-md border-b border-(--color-border-subtle)">
                <div className="max-w-[700px] mx-auto px-6 h-16 flex items-center justify-between">
                    <Link
                        to="/"
                        className="text-[14px] font-bold tracking-tight text-(--color-text-primary)"
                    >
                        DodoChat
                    </Link>
                    <div className="flex items-center gap-6">
                        <Button
                            asChild
                            variant="ghost"
                            size="sm"
                            className="h-8 px-4 text-[12px] font-medium transition-all"
                        >
                            <Link to={isLoggedIn ? "/conversations" : "/login"}>
                                {isLoggedIn ? "Open App" : "Try it"}
                            </Link>
                        </Button>
                    </div>
                </div>
            </header>

            <main className="flex-1 pt-16">
                <Outlet />
            </main>

            <footer className="py-20 px-6 border-t border-(--color-border-subtle)">
                <div className="max-w-[700px] mx-auto flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <p className="text-[12px] text-(--color-text-tertiary)">
                            Built by Oluwafemi Obajuluwa.
                        </p>
                        <div className="flex gap-6 text-[12px] font-medium text-(--color-text-quaternary)">
                            <a
                                href="https://github.com/echoeyecodes/dodochat"
                                target="_blank"
                                rel="noreferrer"
                                className="hover:text-(--color-text-primary)"
                            >
                                GitHub
                            </a>
                            <Link to="/privacy" className="hover:text-(--color-text-primary)">
                                Privacy
                            </Link>
                            <Link to="/terms" className="hover:text-(--color-text-primary)">
                                Terms
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
