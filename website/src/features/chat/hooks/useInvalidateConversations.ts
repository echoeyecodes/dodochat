import { useQueryClient } from '@tanstack/react-query'
import { conversationKeys } from '../constants/query-keys'

export const useInvalidateConversations = () => {
  const queryClient = useQueryClient()
  return () => queryClient.invalidateQueries({ queryKey: conversationKeys.all })
}
