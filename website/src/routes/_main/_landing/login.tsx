import { createFileRoute } from '@tanstack/react-router'
import { LoginDetail } from '@/features/auth/components/LoginDetail'

export const Route = createFileRoute('/_main/_landing/login')({
  component: LoginDetail,
})
