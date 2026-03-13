import { Outlet, createRootRouteWithContext, HeadContent, Scripts, useRouter } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from '@/components/ui/toaster'
import '../styles.css'

export type RouterContext = {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<RouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1.0',
      },
      {
        title: 'DodoChat',
      },
      {
        name: 'description',
        content: 'Your versatile AI assistant for every task.',
      },
    ],
  }),
  component: RootComponent,
})

function RootComponent() {
  const router = useRouter()
  const queryClient = router.options.context.queryClient

  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <Outlet />
          <Toaster position="top-center" />
        </QueryClientProvider>
        <Scripts />
      </body>
    </html>
  )
}
