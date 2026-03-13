import { createFileRoute, Link, Outlet } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { LucideArrowRight } from 'lucide-react'

export const Route = createFileRoute('/_main/_landing')({
  component: LandingLayout,
  loader({ context }) {
    return context.user
  },
})

function LandingLayout() {
  const isLoggedIn = !!Route.useLoaderData()

  return (
    <div className="min-h-screen bg-(--color-bg) flex flex-col selection:bg-orange-100 selection:text-orange-900">
      {/* ─── Navigation ─── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-(--color-bg)/80 backdrop-blur-md border-b border-(--color-border-subtle)">
        <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-(--color-accent) flex items-center justify-center text-white font-bold text-lg shadow-lg rotate-3">D</div>
            <span className="text-[18px] font-bold tracking-tight text-(--color-text-primary)">DodoChat</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-[14px] font-medium text-(--color-text-secondary)">
            <a href="/#how-it-works" className="hover:text-(--color-accent) transition-colors">How it works</a>
            <a href="/#features" className="hover:text-(--color-accent) transition-colors">Features</a>
            {!isLoggedIn && <Link to="/login" className="hover:text-(--color-accent) transition-colors">Sign In</Link>}
          </nav>
          <Button asChild roundness="full" size="sm">
            <Link to={isLoggedIn ? '/conversations' : '/login'}>
              {isLoggedIn ? 'Open App' : 'Get Started'}
              <LucideArrowRight className="w-3.5 h-3.5" />
            </Link>
          </Button>
        </div>
      </header>

      <main className="flex-1 pt-18">
        <Outlet />
      </main>

      <footer className="py-12 px-6 border-t border-(--color-border) bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2 grayscale brightness-50 opacity-50">
            <div className="w-6 h-6 rounded bg-black flex items-center justify-center text-white font-bold text-xs uppercase">D</div>
            <span className="text-[14px] font-bold tracking-tight">DodoChat</span>
          </div>
          <p className="text-[13px] text-(--color-text-tertiary)">© 2026 DodoChat. All rights reserved. Built with ❤️ for your productivity.</p>
          <div className="flex gap-6 text-[13px] text-(--color-text-secondary) font-medium">
            <Link to="/privacy" className="hover:text-(--color-accent)">Privacy</Link>
            <Link to="/terms" className="hover:text-(--color-accent)">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
