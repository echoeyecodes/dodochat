import { Layout } from '@/features/common/components/Layout'
import { AuthUserProvider } from '@/features/user/components/AuthUserProvider'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/_auth')({
  component: AuthLayout,
  beforeLoad: ({ context }) => {
    if (!context.user) throw redirect({ to: '/login' })
    return { user: context.user }
  },
  loader({ context }) {
    return context.user
  },
})

function AuthLayout() {
  const user = Route.useLoaderData()

  return (
    <AuthUserProvider user={user}>
      <Layout>
        <Outlet />
      </Layout>
    </AuthUserProvider>
  )
}
