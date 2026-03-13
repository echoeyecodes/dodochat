import { createFileRoute, useNavigate, useRouter } from '@tanstack/react-router'
import { useEffect } from 'react'
import { authApi } from '@/features/auth/api'
import { LucideLoader2 } from 'lucide-react'
import { deleteAccessToken } from '@/features/auth/helpers'

import { auth } from '@/lib/firebase'

export const Route = createFileRoute('/logout')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()
  const router = useRouter()
  const queryClient = router.options.context.queryClient

  useEffect(() => {
    let isMounted = true

    const doLogout = async () => {
      try {
        await Promise.all([
          authApi.logout(),
          auth.signOut()
        ])
      } catch (error) {
        console.error('Failed to log out remotely', error)
      } finally {
        if (isMounted) {
          await deleteAccessToken()
          queryClient.clear()
          await router.invalidate()
          navigate({ to: '/login', replace: true })
        }
      }
    }

    doLogout()

    return () => {
      isMounted = false
    }
  }, [navigate, queryClient])

  return (
    <div className="flex h-screen w-full items-center justify-center bg-(--color-bg)">
      <div className="flex flex-col items-center gap-4">
        <LucideLoader2 className="h-8 w-8 animate-spin text-(--color-text-tertiary)" />
        <p className="text-sm font-medium text-(--color-text-secondary)">Logging out...</p>
      </div>
    </div>
  )
}
