import { createServerFn } from '@tanstack/react-start'
import { getRequestHeaders } from '@tanstack/react-start/server'

export const getHeaders = createServerFn({ method: "GET" }).handler(() => {
  const data: Record<string, string> = {}
  const headers = getRequestHeaders()
  headers.forEach((value: string, key: string) => {
    data[key] = value
  })
  return data
})
